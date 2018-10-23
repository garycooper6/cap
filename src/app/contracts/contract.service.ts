import { Injectable } from '@angular/core';
import { IContract } from './contract';

@Injectable({
    providedIn: 'root'
})
export class ContractService {

    getContracts(): IContract[] {
        return [
            {
                'contractId': 1,
                'contractNumber': 790,
                'details': 'Moorgate Tunnel cleaning',
                'status': '0',
                'tenderValue': 175819.51,
                'startDate': '09/02/2015',
                'starRating': 2.8,
                'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/158773/Boton-correcto.png'
            },
            {
                'contractId': 2,
                'contractNumber': 802,
                'details': 'Manningtree Station',
                'status': '0',
                'tenderValue': 1748529.80,
                'startDate': '04/08/2015',
                'starRating': 1.6,
                'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
            }
            ,
            {
                'contractId': 3,
                'contractNumber': 850,
                'details': 'Velmore Bishopstoke 33kv UTX',
                'status': '0',
                'tenderValue': 1239095.23,
                'startDate': '08/07/2017',
                'starRating': 4.2,
                'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
            }
        ];
    }
}
