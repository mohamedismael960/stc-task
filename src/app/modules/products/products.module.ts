import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';

import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsAddComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSortModule, 
    MatPaginatorModule,
    TextFieldModule
  ]
})
export class ProductsModule { }
