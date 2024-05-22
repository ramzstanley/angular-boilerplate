import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Tradition } from '@app/_models';

const baseUrl = `${environment.apiUrl}/traditions`;

@Injectable({ providedIn: 'root' })
export class TraditionService {
    private traditionSubject: BehaviorSubject<Tradition>;
    public tradition: Observable<Tradition>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.traditionSubject = new BehaviorSubject<Tradition>(null);
        this.tradition = this.traditionSubject.asObservable();
    }

    public get traditionValue(): Tradition {
        return this.traditionSubject.value;
    }

    getAll(): Observable<Tradition[]> {
        return this.http.get<Tradition[]>(baseUrl);
    }

    getById(id: string): Observable<Tradition> {
        return this.http.get<Tradition>(`${baseUrl}/${id}`);
    }

    getTraditionTitle(title: string): Observable<Tradition> {
        return this.http.get<Tradition>(`${baseUrl}/tradition/${title}`);
    }

    ccreate(tradition: Tradition): Observable<Tradition> {
        console.log('Creating Tradition:', tradition); // Corrected parameter name
        return this.http.post<Tradition>(baseUrl, tradition)
            .pipe(
                tap(response => console.log('Create response:', response)), // Log the response
                catchError(error => {
                    console.error('Error in create request:', error); // Log any errors
                    return throwError(error);
                })
            );
    }
    
    
    addTradition(title: string, description: string, picture: string): Observable<any> {
        const url = 'http://localhost:4000/traditions';
        const body = { title, description, picture };
    
        return this.http.post(url, body, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
    }
      

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${baseUrl}/${id}`);
    }

    update(id: number, params: any): Observable<Tradition> {
        console.log('Updating tradition with id:', id);
        console.log('New parameters:', params);
        return this.http.put<Tradition>(`${baseUrl}/${id}`, params)
            .pipe(
                tap(() => console.log('Update successful')),
                catchError(error => {
                    console.log('Error updating tradition:', error);
                    return throwError(error);
                })
            );
    }
}
