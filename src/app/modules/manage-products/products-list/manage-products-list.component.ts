import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, finalize, takeUntil, tap } from 'rxjs';
import { ManageProductsService } from '../../../core/services/manage-products.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageProductsAddComponent } from '../manage-products-add/manage-products-add.component';
import { BaseEntityComponent } from 'src/app/core/base/base-entity.component';
import { IProduct } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-manage-products-list',
  templateUrl: './manage-products-list.component.html',
  styleUrls: ['./manage-products-list.component.scss']
})
export class ManageProductsListComponent extends BaseEntityComponent<IProduct> implements OnInit , OnDestroy {

  override displayedColumns: string[] = ['id', 'title', 'image' ,  'price', 'description' , 'category'  , 'rate' , 'count' , 'actions'];

  private readonly destroy$ = new Subject<void>();

  loader:boolean = false;

  constructor(private manageProductsService:ManageProductsService,private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.loader = true;
    this.manageProductsService.getAll()
    .pipe(
      takeUntil(this.destroy$),
      tap((products:IProduct[]) =>{
        this.assignDataSource(products);
      }),
      finalize(()=>{
        this.loader = false;
      })
    ).subscribe();
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
    this.loader = true;
    this.manageProductsService.delete(productId)
    .pipe(
      takeUntil(this.destroy$),
      tap(()=>{
        this.removeIndex(productId);
      }),
      finalize(()=>{
        this.loader = false;
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}