import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgBusyModule } from 'ng-busy';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgBusyModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    NgBusyModule
  ]
})
export class SharedModule { }
