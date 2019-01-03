import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor (
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn:  (jsonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll():  Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handlerErro)
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handlerErro)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handlerErro)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handlerErro)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handlerErro)
    );
  }

   // Protected Methods

   protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handlerErro(error: any): Observable<any>  {
    console.log('ERROR NA REQUISIÇÃO =>', error);
    return throwError(error);
  }

}
