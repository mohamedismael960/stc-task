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

  addProducts(product:IProduct):Observable<IProduct>{
    const stringObject = JSON.stringify(product);
    return this.http.post<IProduct>(this.baseUrl + 'products' , stringObject);
  }


  //put request make an error so i will use post method as testing
  updateProducts(product:IProduct):Observable<IProduct>{
    const stringObject = JSON.stringify(product);
    return this.http.post<IProduct>(this.baseUrl + 'products' , stringObject);
  }
  
  deleteProducts(id:number | null):Observable<IProduct>{
    return this.http.delete<IProduct>(this.baseUrl + 'products/' + id);
  }
}
