import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IContract } from './contract';

export class ContractData implements InMemoryDbService {

    createDb() {
        const contracts: IContract[] = [
            {
                'id': 1,
                'contractNumber': 790,
                'details': 'Moorgate Tunnel cleaning',
                'status': '0',
                'tenderValue': 175819.51,
                'startDate': '09/02/2015',
                'starRating': 2.8,
                'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/158773/Boton-correcto.png',
                'tags': ['rake', 'leaf', 'yard', 'home']
            },
            {
                'id': 2,
                'contractNumber': 802,
                'details': 'Manningtree Station',
                'status': '0',
                'tenderValue': 1748529.80,
                'startDate': '04/08/2015',
                'starRating': 1.6,
                'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
            },
            {
                'id': 3,
                'contractNumber': 850,
                'details': 'Velmore Bishopstoke 33kv UTX',
                'status': '0',
                'tenderValue': 1239095.23,
                'startDate': '08/07/2017',
                'starRating': 4.2,
                'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
            },
            {
                'id': 4,
                'contractNumber': 852,
                'details': 'Royal Mint Gardens Survey Works',
                'status': '0',
                'tenderValue': 44929.60,
                'startDate': '9/10/2017',
                'starRating': 1,
                'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/158773/Boton-correcto.png'
            },
            {
                'id': 5,
                'contractNumber': 853,
                'details': 'Winter Preparedness',
                'status': '0',
                'tenderValue': 60000.60,
                'startDate': '01/11/2017',
                'starRating': 2.5,
                'imageUrl': 'https://openclipart.org/image/800px/svg_to_png/158773/Boton-correcto.png'
            }
        ];
        return { contracts };
    }
}
