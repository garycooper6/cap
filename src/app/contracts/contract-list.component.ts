import { Component, OnInit } from '@angular/core';
import { IContract } from './contract';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cap-contracts',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css']
})

export class ContractListComponent implements OnInit {
    pageTitle = 'Contract List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredContracts = this.listFilter ? this.performFilter(this.listFilter) : this.contracts;
    }

    filteredContracts: IContract[];
    contracts: IContract[] = [
        {
            'contractId': 1,
            'contractNumber': 790,
            'details': 'Moorgate Tunnel cleaning',
            'status': '0',
            'tenderValue': 175819.51,
            'startDate': '09/02/2015',
            'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/158773/Boton-correcto.png'
        },
        {
            'contractId': 2,
            'contractNumber': 802,
            'details': 'Manningtree Station',
            'status': '0',
            'tenderValue': 1748529.80,
            'startDate': '04/08/2015',
            'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
        }
    ];

    constructor() {
        this.filteredContracts = this.contracts;
        this.listFilter = 'station';
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
        console.log('In OnInit');
    }
}
