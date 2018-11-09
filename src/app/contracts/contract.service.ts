import { Injectable } from '@angular/core';
import { IContract } from './contract';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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

    getContract(id: number): Observable<IContract> {
        if (id === 0) {
            return of(this.initializeContract());
        }
        return this.getContracts().pipe(
            map((contracts: IContract[]) => contracts.find(p => p.id === id))
        );
    }

    // getContract(id: number): Observable<IContract> {
    //     if (id === 0) {
    //         return of(this.initializeContract());
    //     }
    //     const url = `${this.contractUrl}/${id}`;
    //     return this.http.get<IContract>(url)
    //         .pipe(
    //             tap(data => console.log('getContract: ' + JSON.stringify(data))),
    //             catchError(this.handleError)
    //         );
    // }

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

    private initializeContract(): IContract {
        // Return an initialized object
        return {
            id: 0,
            contractNumber: null,
            details: null,
            status: null,
            tenderValue: null,
            startDate: null,
            starRating: null,
            imageUrl: null,
            tags: ['']
        };
    }
}
