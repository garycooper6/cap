import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContract } from './contract';
import { FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './contract-edit-tags.component.html'
})
export class ContractEditTagsComponent implements OnInit {
    errorMessage: string;
    contract: IContract;
    contractForm: FormGroup;

    get tags(): FormArray {
        return <FormArray>this.contractForm.get('tags');
    }

    constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.contractForm = this.fb.group({
            tags: this.fb.array([]),
        });

        // Read the contract Id from the route parameter
        this.route.parent.data.subscribe(data => {
            this.displayContract(data['contract']);
        });
    }

    displayContract(contract: IContract): void {
        this.contract = contract;

        this.contractForm.setControl('tags', this.fb.array(this.contract.tags || []));
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }

    deleteTag(index: number): void {
        this.tags.removeAt(index);
        this.tags.markAsDirty();
    }
}
