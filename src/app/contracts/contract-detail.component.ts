import { Component, OnInit } from '@angular/core';
import { IContract } from './contract';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from './contract.service';

@Component({
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {
  pageTitle = 'Contract Details';
  errorMessage = '';
  contract: IContract | undefined;

  constructor(private route: ActivatedRoute, private router: Router,
    private contractService: ContractService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getContract(id);
    }
  }

  getContract(id: number) {
    this.contractService.getContract(id).subscribe(
      contract => this.contract = contract,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/contracts']);
  }
}
