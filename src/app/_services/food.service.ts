import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Food } from '@app/_models';

const baseUrl = `${environment.apiUrl}/foods`;

@Injectable({ providedIn: 'root' })
export class FoodService {
    private foodSubject: BehaviorSubject<Food>;
    public food: Observable<Food>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.foodSubject = new BehaviorSubject<Food>(null);
        this.food = this.foodSubject.asObservable();
    }

    public get foodValue(): Food {
        return this.foodSubject.value;
    }

    getAll(): Observable<Food[]> {
        return this.http.get<Food[]>(baseUrl);
    }

    getById(id: string): Observable<Food> {
        return this.http.get<Food>(`${baseUrl}/${id}`);
    }
    
    getFoodTitle(title: string): Observable<Food> {
        return this.http.get<Food>(`${baseUrl}/food/${title}`)
    }
}