import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEntityService } from '../base/base-entity.service';
import { ICategory } from '../models/categories';
@Injectable({
  providedIn: 'root'
})
export class ManageCategoriesService extends BaseEntityService<ICategory>{

  constructor(protected override http:HttpClient) { 
    super(http,'products/categories');
  }
  
}
