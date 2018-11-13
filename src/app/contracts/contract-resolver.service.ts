import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IContract } from './contract';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ContractService } from './contract.service';

@Injectable({
    providedIn: 'root'
})
export class ContractResolver implements Resolve<IContract> {

    constructor(private contractService: ContractService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContract> {
        const id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Contract id was not a number: ${id}`);
            this.router.navigate(['/contracts']);
            return of(null);
        }
        return this.contractService.getContract(+id)
            .pipe(
                map(contract => {
                    if (contract) {
                        return contract;
                    }
                    console.log(`Contract was not found: ${id}`);
                    this.router.navigate(['/contracts']);
                    return null;
                }),
                catchError(error => {
                    console.log(`Retrieval error: ${error}`);
                    this.router.navigate(['/contracts']);
                    return of(null);
                }));
    }
}
