import { OnInit, Component, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IContract } from './contract';
import { ActivatedRoute } from '@angular/router';
import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    templateUrl: './contract-edit-info.component.html'
})
export class ContractEditInfoComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle = 'Contract Edit';
    errorMessage: string;
    contractForm: FormGroup;

    contract: IContract;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {

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
            starRating: ['', NumberValidators.range(1, 5)]
        });

        // Read the contract Id from the route parameter
        this.route.parent.data.subscribe(data => {
            this.displayContract(data['contract']);
        });
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
    }
}
