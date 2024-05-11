import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CuisineRoutingModule } from './cuisine-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CuisineRoutingModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class CuisineModule { }