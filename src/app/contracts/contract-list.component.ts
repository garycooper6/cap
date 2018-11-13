import { Component, OnInit } from '@angular/core';
import { IContract } from './contract';
import { ContractService } from './contract.service';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private contractService: ContractService, private route: ActivatedRoute) {
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
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.showImage = this.route.snapshot.queryParams['showImage'] === 'true';

        this.contractService.getContracts()
            .subscribe(contracts => {
                this.contracts = contracts,
                this.filteredContracts = this.performFilter(this.listFilter);
            },
                error => this.errorMessage = <any>error
            );
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Contract List: ' + message;
    }
}
