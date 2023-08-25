import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutComponent,
    children:[
      {
        path : 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path : 'admin',
        children:[
          {
            path:'products',
            loadChildren: () => import('../modules/manage-products/manage-products.module').then(m => m.ManageProductsModule)
          }
        ]
      },
      {
        path : 'products',
        loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path : '**',
        redirectTo : 'dashboard'
      }
    ]
  },
  {
    path : '**',
    redirectTo : ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
