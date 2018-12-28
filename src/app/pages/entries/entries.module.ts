import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgBusyModule } from 'ng-busy';

@NgModule({
  declarations: [
    EntryListComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    NgBusyModule
  ]
})
export class EntriesModule { }
