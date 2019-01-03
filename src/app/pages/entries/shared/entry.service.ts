import { CategoryService } from './../../categories/shared/category.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = 'api/entries';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {  }

  getAll():  Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToEntries),
      catchError(this.handlerErro)
    );
  }

  getById(id: number): Observable<Entry> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      map(this.jsonDataToEntry),
      catchError(this.handlerErro)
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.post(this.apiPath, entry).pipe(
          map(this.jsonDataToEntry),
          catchError(this.handlerErro)
        );
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.put(this.apiPath, entry).pipe(
          map(() => entry),
          catchError(this.handlerErro)
        );
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      map(() => null),
      catchError(this.handlerErro)
    );
  }

  // Metods Privados

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(Object.assign(new Entry(), element)));
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  private handlerErro(error: any): Observable<any>  {
    console.log('ERROR NA REQUISIÇÃO =>', error);
    return throwError(error);
  }
}
