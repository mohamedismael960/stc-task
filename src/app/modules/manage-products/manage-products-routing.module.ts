import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageProductsComponent } from './manage-products.component';
import { ManageProductsListComponent } from './products-list/manage-products-list.component';

const routes: Routes = [
  {
    path : '',
    component : ManageProductsComponent,
    children:[
      {
        path:'',
        component:ManageProductsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductsRoutingModule { }
