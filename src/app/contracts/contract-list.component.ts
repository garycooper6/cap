import { Component, OnInit } from '@angular/core';
import { IContract } from './contract';
import { ContractService } from './contract.service';

@Component({
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css']
})

export class ContractListComponent implements OnInit {
    pageTitle = 'Contract List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredContracts = this.listFilter ? this.performFilter(this.listFilter) : this.contracts;
    }

    filteredContracts: IContract[];
    contracts: IContract[] = [];

    constructor(private contractService: ContractService) {
    }

    performFilter(filterBy: string): IContract[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.contracts.filter((contract: IContract) =>
            contract.details.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.contractService.getContracts().subscribe(
            contracts => {
                this.contracts = contracts;
                this.filteredContracts = this.contracts;
            },
            error => this.errorMessage = <any>error
        );
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Contract List: ' + message;
    }
}
