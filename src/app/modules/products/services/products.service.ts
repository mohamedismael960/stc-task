import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/products.model';
import { BaseEntityService } from '../../base/base-entity.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseEntityService<IProduct>{

  constructor(protected override http:HttpClient) { 
    super(http,'products');
  }

}
