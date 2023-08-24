import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/products.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environment.apiUrl + '/';
  constructor(private http:HttpClient) { }

  getProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.baseUrl + 'products');
  }

  deleteProducts(id:number):Observable<IProduct>{
    return this.http.delete<IProduct>(this.baseUrl + 'products/' + id);
  }
}
