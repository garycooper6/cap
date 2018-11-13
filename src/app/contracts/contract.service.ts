import { Injectable } from '@angular/core';
import { IContract } from './contract';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private contractUrl = 'api/contracts';

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
        const url = `${this.contractUrl}/${id}`;
        return this.http.get<IContract>(url)
            .pipe(
                tap(data => console.log('getContract: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    createContract(contract: IContract): Observable<IContract> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        contract.id = null;
        return this.http.post<IContract>(this.contractUrl, contract, { headers: headers })
          .pipe(
            tap(data => console.log('createContract: ' + JSON.stringify(data))),
            catchError(this.handleError)
          );
      }

    updateContract(contract: IContract): Observable<IContract> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.contractUrl}/${contract.id}`;
        return this.http.put<IContract>(url, contract, { headers: headers })
          .pipe(
            tap(() => console.log('updateContract: ' + contract.id)),
            // Return the contract on an update
            map(() => contract),
            catchError(this.handleError)
          );
      }

      deleteContract(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.contractUrl}/${id}`;
        return this.http.delete<IContract>(url, { headers: headers })
          .pipe(
            tap(data => console.log('deleteContract: ' + id)),
            catchError(this.handleError)
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

    private initializeContract(): IContract {
        // Return an initialized object
        return {
            id: 0,
            contractNumber: null,
            details: null,
            status: '0',
            tenderValue: null,
            startDate: null,
            starRating: null,
            imageUrl: null,
            tags: ['']
        };
    }
}
