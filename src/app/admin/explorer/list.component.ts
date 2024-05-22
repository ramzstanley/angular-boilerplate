import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FoodService } from '@app/_services';
import { Food } from '@app/_models';

@Component({
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
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
                    this.foods = foods.map(food => ({ ...food, editing: false, editTitle: food.title, editDescription: food.description }));
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

    editFood(food: Food) {
        this.foods = this.foods.map(f => f.id === food.id ? { ...f, editing: true } : f);
    }

    saveFood(food: Food) {
        const updatedFood = { title: food.editTitle, description: food.editDescription };
        console.log('Updated food object to send:', updatedFood); // Add this line
        this.foodService.update(food.id, updatedFood)
            .pipe(first())
            .subscribe(
                () => {
                    this.foods = this.foods.map(f => f.id === food.id ? { ...food, ...updatedFood, editing: false } : f);
                    console.log('Food updated successfully.');
                    console.log('Updated foods array:', this.foods);
                },
                error => {
                    console.log('Error updating food:', error);
                    this.errorMessage = 'Error updating food';
                }
            );
    }
    

    cancelEdit(food: Food) {
        this.foods = this.foods.map(f => f.id === food.id ? { ...f, editing: false, editTitle: f.title, editDescription: f.description } : f);
    }

    deleteFood(food: Food) {
        if (confirm(`Are you sure you want to delete ${food.title}?`)) {
            this.foodService.delete(food.id)
                .pipe(first())
                .subscribe(
                    () => {
                        this.foods = this.foods.filter(f => f.id !== food.id);
                        console.log(`${food.title} has been deleted.`);
                    },
                    error => {
                        console.log('Error deleting food:', error);
                        this.errorMessage = 'Error deleting food';
                    }
                );
        }
    }
}
