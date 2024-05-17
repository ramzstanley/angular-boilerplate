import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FoodService } from '@app/_services';
import { Food } from '@app/_models';

@Component({
    templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {
    title: string;
    foods: Food[];
    errorMessage: string;

    constructor(private foodService: FoodService) { }

    ngOnInit() {
        this.loadAllFoods();
    }

    loadAllFoods() {
        this.foodService.getAll()
            .pipe(first())
            .subscribe(
                foods => {
                    this.foods = foods;
                    console.log('Foods:', this.foods);
                },
                error => {
                    console.log('Error fetching foods:', error);
                    this.errorMessage = 'Error fetching foods';
                }
            );
    }

    searchFood() {
        if (!this.title) {
            this.loadAllFoods();
            return;
        }

        this.foodService.getFoodTitle(this.title)
            .subscribe(
                (data: Food) => {
                    console.log('Response from API:', data);
                    this.foods = data ? [data] : [];
                },
                error => {
                    console.log('Error fetching food by title:', error);
                    this.errorMessage = 'Error fetching food by title';
                }
            );
    }
}
