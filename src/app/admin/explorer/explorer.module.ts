import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ExplorerRoutingModule,
        FormsModule
    ],
    declarations: [
        ListComponent,
    ]
})
export class ExplorerModule { }