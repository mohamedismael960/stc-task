import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEntityService } from '../base/base-entity.service';
import { IProduct } from '../models/products.model';
import { ICategory } from '../models/categories';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ManageProductsService extends BaseEntityService<IProduct>{

  constructor(protected override http:HttpClient) { 
    super(http,'products');
  }

  getProductsInASpecificCategory(category:ICategory):Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.baseUrl + this.resourceUrl + '/category/' + category);
  }

}
