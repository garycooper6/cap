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
    private contractService: ContractService) { }

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
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getContract(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
}
