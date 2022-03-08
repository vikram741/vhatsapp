
import { throwError as observableThrowError, Observable, of, throwError } from 'rxjs';
import { map, catchError, retry, retryWhen, mergeMap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    constructor(
        private httpClient: HttpClient,
    ) { }



    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.httpClient.get<any>(
            path,
            { params }
        ).pipe(
            // this.retryOnFail(),
        );
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.put<any>(
            path,
            JSON.stringify(body),
        ).pipe(
            // this.retryOnFail(),
        );
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.httpClient.post<any>(
            path,
            body,
        );
    }

}
