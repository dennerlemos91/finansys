import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './components/navbar/navbar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule
  ],
  exports: [
    NavbarModule
  ]
})
export class CoreModule { }
