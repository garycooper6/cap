import { Component, OnInit } from '@angular/core';
import { IContract } from './contract';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  pageTitle = 'Contract Details';
  contract: IContract;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.contract = {
      'contractId': id,
      'contractNumber': 802,
      'details': 'Manningtree Station',
      'status': '0',
      'tenderValue': 1748529.80,
      'startDate': '04/08/2015',
      'starRating': 1.6,
      'imageUrl': 'https://openclipart.org/download/158779/Boton-mal.svg'
    };
  }

  onBack(): void {
    this.router.navigate(['/contracts']);
  }
}
