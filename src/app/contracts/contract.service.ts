import { Injectable } from '@angular/core';
import { IContract } from './contract';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private contractUrl = 'api/contracts/contracts.json';

    constructor(private http: HttpClient) { }

    getContracts(): Observable<IContract[]> {
        return this.http.get<IContract[]>(this.contractUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getContract(id: number): Observable<IContract | undefined> {
        return this.getContracts().pipe(
            map((products: IContract[]) => products.find(p => p.contractId === id))
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
