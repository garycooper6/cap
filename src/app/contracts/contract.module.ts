import { NgModule } from '@angular/core';
import { ContractListComponent } from './contract-list.component';
import { ContractDetailComponent } from './contract-detail.component';
import { StatusConverterPipe } from '../shared/status-converter.pipe';
import { RouterModule } from '@angular/router';
import { ContractDetailGuard } from './contract-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'contracts', component: ContractListComponent },
      {
        path: 'contracts/:id',
        canActivate: [ContractDetailGuard],
        component: ContractDetailComponent
      },
    ]),
    SharedModule
  ],
  declarations: [
    ContractListComponent,
    ContractDetailComponent,
    StatusConverterPipe
  ]
})
export class ContractModule { }
