import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocalLegendsModule  } from './locallegends-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocalLegendsModule ,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class LocalModule { }