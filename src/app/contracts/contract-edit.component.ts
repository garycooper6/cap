import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { IContract } from './contract';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from './contract.service';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './contract-edit.component.html'
})
export class ContractEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Contract Edit';
  errorMessage: string;
  contractForm: FormGroup;

  contract: IContract;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.contractForm.get('tags');
  }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      contractNumber: {
        required: 'Contract number is required.'
      },
      details: {
        required: 'Contract details is required.',
        minlength: 'Contract details must be at least three characters.',
        maxlength: 'Contract details cannot exceed 50 characters.'
      },
      starRating: {
        range: 'Rate the contract between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.contractForm = this.fb.group({
      contractNumber: ['', Validators.required],
      details: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
    });

    // Read the contract Id from the route parameter
    this.route.data.subscribe(data => {
      this.displayContract(data['contract']);
    });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.contractForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.contractForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getContract(id: number): void {
    this.contractService.getContract(id)
      .subscribe(
        (contract: IContract) => this.displayContract(contract),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayContract(contract: IContract): void {
    if (this.contractForm) {
      this.contractForm.reset();
    }
    this.contract = contract;

    if (this.contract.id === 0) {
      this.pageTitle = 'Add Contract';
    } else {
      this.pageTitle = `Edit Contract: ${this.contract.contractNumber}`;
    }

    // Update the data on the form
    this.contractForm.patchValue({
      contractNumber: this.contract.contractNumber,
      details: this.contract.details,
      starRating: this.contract.starRating
    });
    this.contractForm.setControl('tags', this.fb.array(this.contract.tags || []));
  }

  deleteContract(): void {
    if (this.contract.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the contract: ${this.contract.contractNumber}?`)) {
        this.contractService.deleteContract(this.contract.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveContract(): void {
    if (this.contractForm.valid) {
      if (this.contractForm.dirty) {
        const c = { ...this.contract, ...this.contractForm.value };

        if (c.id === 0) {
          this.contractService.createContract(c)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.contractService.updateContract(c)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.contractForm.reset();
    this.router.navigate(['/contracts']);
  }
}
