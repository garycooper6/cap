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
    this.contract = this.route.snapshot.data['contract'];
  }

  onBack(): void {
    this.router.navigate(['/contracts'], { queryParamsHandling: 'preserve' });
  }
}
