import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = 'api/categories';

  constructor(
    private http: HttpClient
  ) {  }

  getAll():  Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handlerErro),
      map(this.jsonDataToCatergories)
    );
  }

  getById(id: number): Observable<Category> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handlerErro),
      map(this.jsonDataToCatergory)
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handlerErro),
      map(this.jsonDataToCatergory)
    );
  }

  update(category: Category): Observable<Category> {
    return this.http.put(this.apiPath, category).pipe(
      catchError(this.handlerErro),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handlerErro),
      map(() => null)
    );
  }

  // Metods Privados

  private jsonDataToCatergories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  private jsonDataToCatergory(jsonData: any): Category {
    return jsonData as Category;
  }

  private handlerErro(error: any): Observable<any>  {
    console.log('ERROR NA REQUISIÇÃO =>', error);
    return throwError(error);
  }
}
