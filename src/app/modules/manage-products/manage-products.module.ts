import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductsComponent } from './manage-products.component';
import { ManageProductsRoutingModule } from './manage-products-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';

import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { ManageProductsListComponent } from './products-list/manage-products-list.component';
import { ManageProductsAddComponent } from './manage-products-add/manage-products-add.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { SearchTextComponent } from 'src/app/core/shared/search-text/search-text.component';

@NgModule({
  declarations: [
    ManageProductsComponent,
    ManageProductsListComponent,
    ManageProductsAddComponent,
  ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule,
    SharedModule,
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSortModule, 
    MatPaginatorModule,
    TextFieldModule,
    SearchTextComponent
  ]
})
export class ManageProductsModule { }
