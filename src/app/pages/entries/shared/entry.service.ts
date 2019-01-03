import { Injectable, Injector } from '@angular/core';

import { flatMap, catchError } from 'rxjs/operators';

import { BaseResourceService } from 'src/app/shared/services/base-resouce.service';
import { CategoryService } from './../../categories/shared/category.service';

import { Entry } from './entry.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
   }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndToServer(entry, super.update.bind(this));
  }

  private setCategoryAndToServer(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handlerErro)
    );
  }
}
