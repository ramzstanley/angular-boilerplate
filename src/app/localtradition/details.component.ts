import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { TraditionService } from '@app/_services';
import { Tradition } from '@app/_models';

@Component({
    templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {
    title: string;
    traditions: Tradition[];
    errorMessage: string;

    constructor(private traditionService: TraditionService) { }

    ngOnInit() {
        this.loadAllTraditions(); // Correct method name here
    }

    loadAllTraditions() { // Corrected method name
        this.traditionService.getAll()
            .pipe(first())
            .subscribe(
                traditions => {
                    this.traditions = traditions;
                    console.log('Traditions:', this.traditions);
                },
                error => {
                    console.log('Error fetching traditions:', error);
                    this.errorMessage = 'Error fetching traditions';
                }
            );
    }

    searchTradition() {
        if (!this.title) {
            this.loadAllTraditions();
            return;
        }

        this.traditionService.getTraditionTitle(this.title)
            .subscribe(
                (data: Tradition) => {
                    console.log('Response from API:', data);
                    this.traditions = data ? [data] : [];
                },
                error => {
                    console.log('Error fetching tradition by title:', error);
                    this.errorMessage = 'Error fetching tradition by title';
                }
            );
    }
}
