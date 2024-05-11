import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocalTraditionModule  } from './localtradition-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LocalTraditionModule ,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        DetailsComponent,
    ]
})
export class TraditionModule { }