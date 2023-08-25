import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntity } from './base-entity.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseEntityService<T extends IEntity> {
  protected baseUrl:string  = environment.apiUrl + '/';;
  protected resourceUrl!:string;
  constructor(protected http: HttpClient, @Inject(String) protected url: string) {
	  this.resourceUrl = url;
  }


  getAll():Observable<T[]>{
    return this.http.get<T[]>(this.baseUrl + this.resourceUrl);
  }

  add(obj:T):Observable<T>{
    const stringObject = JSON.stringify(obj);
    return this.http.post<T>(this.baseUrl + this.resourceUrl , stringObject);
  }


  //put request make an error so i will use post method as testing
  update(product:T):Observable<T>{
    const stringObject = JSON.stringify(product);
    return this.http.post<T>(this.baseUrl + this.resourceUrl , stringObject);
  }
  
  delete(id:number | null):Observable<T>{
    return this.http.delete<T>(this.baseUrl + this.resourceUrl + '/' + id);
  }

}
