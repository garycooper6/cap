import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'login', component: LoginComponent }
        ])
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService
    ]
})


export class UserModule { }
