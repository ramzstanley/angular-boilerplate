import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FoodService } from '@app/_services';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    title: string;
    foods: any[];

    constructor(private foodService: FoodService) { }

    ngOnInit() {
        this.loadAllFoods();
    }

    loadAllFoods() {
        this.foodService.getAll()
            .pipe(first())
            .subscribe(foods => this.foods = foods);
    }

    searchFood() {
        if (!this.title) {
            this.loadAllFoods();
            return;
        }

        this.foodService.getFoodTitle(this.title)
            .subscribe((data: any) => {
                console.log("Response from API: ", data);
                this.foods = data ? [data] : []; // Update foods array with search result or empty array if not found
            }, error => {
                console.log(error);
                this.foods = []; // Clear foods array on error
            });
    }
}