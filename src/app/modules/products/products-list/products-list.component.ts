import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from '../../manage-products/models/manage-products.model';
import { ManageProductsService } from '../../manage-products/services/manage-products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit , OnDestroy {


  subscription:Subscription = new Subscription();

  constructor(private productsService:ManageProductsService,private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    const sub = this.productsService.getAll()
    .pipe(
      tap((products:IProduct[]) =>{
        console.log(products);
      })
    ).subscribe();
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}