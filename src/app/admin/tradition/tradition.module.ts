import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TraditionRoutingModule } from './tradition-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TraditionRoutingModule,
        FormsModule
    ],
    declarations: [
        ListComponent,
    ]
})
export class TraditionModule { }