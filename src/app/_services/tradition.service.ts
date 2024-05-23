import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Tradition } from '@app/_models';

const baseUrl = `${environment.apiUrl}/traditions`;

@Injectable({ providedIn: 'root' })
export class TraditionService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Tradition[]> {
        return this.http.get<Tradition[]>(baseUrl);
    }

    getById(id: string): Observable<Tradition> {
        return this.http.get<Tradition>(`${baseUrl}/${id}`);
    }

    getTraditionTitle(title: string): Observable<Tradition> {
        return this.http.get<Tradition>(`${baseUrl}/tradition/${title}`);
    }

    create(tradition: Tradition): Observable<Tradition> {
        console.log('Creating Tradition:', tradition);
        return this.http.post<Tradition>(baseUrl, tradition)
            .pipe(
                tap(response => console.log('Create response:', response)),
                catchError(error => {
                    console.error('Error in create request:', error);
                    return throwError(error);
                })
            );
    }

    addTradition(title: string, description: string, picture: string, date: Date): Observable<any> {
        const body = { title, description, picture, date };
        return this.http.post(baseUrl, body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${baseUrl}/${id}`);
    }

    update(id: number, params: any): Observable<Tradition> {
        return this.http.put<Tradition>(`${baseUrl}/${id}`, params)
            .pipe(
                tap(() => console.log('Update successful')),
                catchError(error => {
                    console.log('Error updating tradition:', error);
                    return throwError(error);
                })
            );
    }
    updateTradition(id: number, tradition: Tradition): Observable<any> {
        return this.http.put<any>(`${baseUrl}/${id}`, tradition, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
