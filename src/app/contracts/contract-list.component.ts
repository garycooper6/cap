import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cap-contracts',
    templateUrl: './contract-list.component.html'
})

export class ContractListComponent {
    pageTitle = 'Contract List';
    contracts: any[] = [
        {
            'contractId': 1,
            'contractNumber': 790,
            'details': 'Moorgate Tunnel cleaning',
            'status': 0,
            'tenderValue': 175819.51,
            'startDate': '09/02/2015'
        },
        {
            'contractId': 2,
            'contractNumber': 802,
            'details': 'Manningtree Station',
            'status': 0,
            'tenderValue': 1748529.80,
            'startDate': '04/08/2015'
        }
    ];
}
