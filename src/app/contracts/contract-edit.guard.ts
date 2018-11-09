import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ContractEditComponent } from './contract-edit.component';

@Injectable({
    providedIn: 'root'
})
export class ContractEditGuard implements CanDeactivate<ContractEditComponent> {
    canDeactivate(component: ContractEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.contractForm.dirty) {
            const contractNumber = component.contractForm.get('contractNumber').value || 'New Contract';
            return confirm(`Navigate away and lose all changes to ${contractNumber}?`);
        }
        return true;
    }
}
