import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FoodService } from '@app/_services';
import { Food } from '@app/_models';

@Component({
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    title: string;
    foods: Food[] = [];
    newFood: Food = { id: 0, picture: '', title: '', description: '', editing: false, editTitle: '', editDescription: '' };
    showAdd: boolean = false;
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
                },
                error => {
                    this.errorMessage = 'Error fetching foods';
                }
            );
    }

    showAddForm() {
        this.showAdd = true;
    }

    cancelAdd() {
        this.showAdd = false;
        this.newFood = { id: 0, picture: '', title: '', description: '', editing: false, editTitle: '', editDescription: '' };
    }

    addFood() {
        const { picture, title, description } = this.newFood;

        if (!picture || !title || !description) {
            console.error('Please fill in all fields');
            return;
        }

        this.foodService.addFood(title, description, picture).subscribe(
            (response) => {
                console.log('Food added successfully:', response);
                this.loadAllFoods(); // Reload the list of foods after adding a new one
                this.cancelAdd(); // Clear the form after adding
            },
            (error) => {
                console.error('Error adding food:', error);
            }
        );
    }

    editFood(food: Food) {
        this.foods = this.foods.map(f => f.id === food.id ? { ...f, editing: true } : f);
    }

    saveFood(food: Food) {
        const { editTitle, editDescription } = food;
        if (!editTitle || !editDescription) {
            console.error('Please fill in all fields');
            return;
        }

        this.foodService.update(food.id, { title: editTitle, description: editDescription }).subscribe(
            (response) => {
                console.log('Food updated successfully:', response);
                this.loadAllFoods(); // Reload the list of foods after updating
            },
            (error) => {
                console.error('Error updating food:', error);
            }
        );

        food.editing = false; // Set editing back to false after saving
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
