import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {NgBusyModule} from 'ng-busy';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    NgBusyModule
  ]
})
export class CategoriesModule { }
