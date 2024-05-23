import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { TraditionService } from '@app/_services';
import { Tradition } from '@app/_models';

@Component({
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    title: string;
    traditions: Tradition[] = [];
    newTradition: Tradition = { 
        id: 0, 
        picture: '', 
        title: '', 
        description: '', 
        date: new Date(2024, 4, 23), 
        editing: false, 
        editTitle: '', 
        editDescription: '', 
        editDate: new Date(2024, 4, 23) 
    };
    showAdd: boolean = false;
    errorMessage: string;

    constructor(private traditionService: TraditionService) { }

    ngOnInit() {
        this.loadAllTraditions();
    }

    loadAllTraditions() {
        this.traditionService.getAll()
            .pipe(first())
            .subscribe(
                traditions => {
                    this.traditions = traditions.map(tradition => ({ 
                        ...tradition, 
                        editing: false, 
                        editTitle: tradition.title, 
                        editDescription: tradition.description, 
                        editDate: new Date(tradition.date) 
                    }));
                },
                error => {
                    this.errorMessage = 'Error fetching traditions';
                }
            );
    }

    showAddForm() {
        this.showAdd = true;
    }

    cancelAdd() {
        this.showAdd = false;
        this.newTradition = { 
            id: 0, 
            picture: '', 
            title: '', 
            description: '', 
            date: new Date(), 
            editing: false, 
            editTitle: '', 
            editDescription: '', 
            editDate: new Date() 
        };
    }

    addTradition() {
        const { picture, title, description, date } = this.newTradition;
    
        if (!picture || !title || !description || !date) {
            console.error('Please fill in all fields');
            return;
        }
    
        this.traditionService.addTradition(title, description, picture, date).subscribe(
            (response) => {
                console.log('Tradition added successfully:', response);
                this.loadAllTraditions(); // Reload the list of traditions after adding a new one
                this.cancelAdd(); // Clear the form after adding
            },
            (error) => {
                console.error('Error adding tradition:', error);
                this.errorMessage = 'Error adding tradition';
            }
        );
    }

    editTradition(tradition: Tradition) {
        this.traditions = this.traditions.map(t => t.id === tradition.id ? { ...t, editing: true } : t);
    }

    saveTradition(tradition: Tradition) {
        const { editTitle, editDescription, editDate } = tradition;
        if (!editTitle || !editDescription || !editDate) {
            console.error('Please fill in all fields');
            return;
        }
    
        // Create an object with the updated tradition data
        const updatedTradition = {
            title: editTitle,
            description: editDescription,
            date: editDate
        };
    
        console.log('Updating tradition with data:', updatedTradition);
    
        this.traditionService.update(tradition.id, updatedTradition).subscribe(
            (response) => {
                console.log('Tradition updated successfully:', response);
                this.loadAllTraditions(); // Reload the list of traditions after updating
            },
            (error) => {
                console.error('Error updating tradition:', error);
            }
        );
    
        tradition.editing = false; // Set editing back to false after saving
    }

    cancelEdit(tradition: Tradition) {
        this.traditions = this.traditions.map(t => t.id === tradition.id ? { ...t, editing: false, editTitle: t.title, editDescription: t.description, editDate: new Date(t.date) } : t);
    }

    deleteTradition(tradition: Tradition) {
        if (confirm(`Are you sure you want to delete ${tradition.title}?`)) {
            this.traditionService.delete(tradition.id)
                .pipe(first())
                .subscribe(
                    () => {
                        this.traditions = this.traditions.filter(t => t.id !== tradition.id);
                        console.log(`${tradition.title} has been deleted.`);
                    },
                    error => {
                        console.log('Error deleting tradition:', error);
                        this.errorMessage = 'Error deleting tradition';
                    }
                );
        }
    }

    
    updateTradition(tradition: Tradition) {
        this.traditionService.update(tradition.id, tradition)
            .subscribe(
                () => {
                    console.log('Tradition updated successfully');
                    // Reload the list of traditions after updating
                    this.loadAllTraditions();
                },
                (error) => {
                    console.error('Error updating tradition:', error);
                    // Handle the error as needed
                }
            );
    }
}
