import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/manage-products.model';
import { BaseEntityService } from '../../../core/base/base-entity.service';
@Injectable({
  providedIn: 'root'
})
export class ManageProductsService extends BaseEntityService<IProduct>{

  constructor(protected override http:HttpClient) { 
    super(http,'products');
  }

}
