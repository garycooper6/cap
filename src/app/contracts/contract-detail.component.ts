import { Component, OnInit } from '@angular/core';
import { IContract } from './contract';

@Component({
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  pageTitle = 'Contract Details';
  contract: IContract;

  constructor() { }

  ngOnInit() {
  }

}
