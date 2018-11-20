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

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ContractData } from './contract-data';
import { ContractResolver } from './contract-resolver.service';
import { ContractEditInfoComponent } from './contract-edit-info.component';
import { ContractEditTagsComponent } from './contract-edit-tags.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ContractData, { delay: 1000 }),
    RouterModule.forChild([
      {
        path: 'contracts',
        children: [
          { path: '', component: ContractListComponent },
          {
            path: ':id',
            // canActivate: [ContractDetailGuard],
            component: ContractDetailComponent,
            resolve: { contract: ContractResolver }
          },
          {
            path: ':id/edit',
            // canDeactivate: [ContractEditGuard],
            component: ContractEditComponent,
            resolve: { contract: ContractResolver },
            children: [
              {
                path: '', redirectTo: 'info', pathMatch: 'full'
              },
              {
                path: 'info', component: ContractEditInfoComponent
              },
              {
                path: 'tags', component: ContractEditTagsComponent
              }
            ]
          }
        ]
      }
    ])
  ],
  declarations: [
    ContractListComponent,
    ContractDetailComponent,
    StatusConverterPipe,
    ContractEditComponent,
    ContractEditInfoComponent,
    ContractEditTagsComponent
  ]
})
export class ContractModule { }
