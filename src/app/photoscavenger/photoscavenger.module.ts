import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PhotoScavengerModule  } from './photoscavenger-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PhotoScavengerModule ,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class PhotoModule { }