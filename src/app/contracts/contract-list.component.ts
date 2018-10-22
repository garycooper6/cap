import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cap-contracts',
    templateUrl: './contract-list.component.html'
})

export class ContractListComponent {
    pageTitle = 'Contract List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    listFilter = 'station';
    contracts: any[] = [
        {
            'contractId': 1,
            'contractNumber': 790,
            'details': 'Moorgate Tunnel cleaning',
            'status': 0,
            'tenderValue': 175819.51,
            'startDate': '09/02/2015',
            'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/158773/Boton-correcto.png'
        },
        {
            'contractId': 2,
            'contractNumber': 802,
            'details': 'Manningtree Station',
            'status': 0,
            'tenderValue': 1748529.80,
            'startDate': '04/08/2015',
            'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
        }
    ];

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}
