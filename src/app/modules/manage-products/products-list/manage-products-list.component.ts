import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../models/manage-products.model';
import { Subscription, tap } from 'rxjs';
import { ManageProductsService } from '../services/manage-products.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageProductsAddComponent } from '../manage-products-add/manage-products-add.component';
import { BaseEntityComponent } from 'src/app/core/base/base-entity.component';

@Component({
  selector: 'app-manage-products-list',
  templateUrl: './manage-products-list.component.html',
  styleUrls: ['./manage-products-list.component.scss']
})
export class ManageProductsListComponent extends BaseEntityComponent<IProduct> implements OnInit , OnDestroy {

  override displayedColumns: string[] = ['id', 'title', 'image' ,  'price', 'description' , 'category'  , 'rate' , 'count' , 'actions'];

  subscription:Subscription = new Subscription();

  constructor(private manageProductsService:ManageProductsService,private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    const sub = this.manageProductsService.getAll()
    .pipe(
      tap((products:IProduct[]) =>{
        this.assignDataSource(products);
        this.applyPagination();
      })
    ).subscribe();
    this.subscription.add(sub);
  }

  openModalAddProduct(){
    const dialogRef = this.dialog.open(ManageProductsAddComponent, {
      panelClass:['customDialog']
    });
    dialogRef.afterClosed().subscribe((product:IProduct | null) => {
      if(product){
        this.addItem(product);
      }
    });
  }

  openModalEditProduct(product:IProduct){
    const dialogRef = this.dialog.open(ManageProductsAddComponent, {
      panelClass:['customDialog'],
      data:{
        product:product
      }
    });
    dialogRef.afterClosed().subscribe((product:IProduct | null) => {
      if(product){
        this.editItem(product);
      }
    });
  }

  deleteProduct(productId:number){
    const sub = this.manageProductsService.delete(productId)
    .pipe(
      tap(()=>{
        this.removeIndex(productId);
      })
    )
    .subscribe();
    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}