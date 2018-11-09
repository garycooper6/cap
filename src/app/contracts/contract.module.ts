import { NgModule } from '@angular/core';
import { ContractListComponent } from './contract-list.component';
import { ContractDetailComponent } from './contract-detail.component';
import { StatusConverterPipe } from '../shared/status-converter.pipe';
import { RouterModule } from '@angular/router';
import { ContractDetailGuard } from './contract-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ContractEditComponent } from './contract-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContractEditGuard } from './contract-edit.guard';



@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'contracts', component: ContractListComponent },
      {
        path: 'contracts/:id',
        canActivate: [ContractDetailGuard],
        component: ContractDetailComponent
      },
      { path: 'contracts/:id/edit', canDeactivate: [ContractEditGuard], component: ContractEditComponent }
    ])
  ],
  declarations: [
    ContractListComponent,
    ContractDetailComponent,
    StatusConverterPipe,
    ContractEditComponent
  ]
})
export class ContractModule { }
