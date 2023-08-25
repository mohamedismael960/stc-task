import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../models/manage-products.model';
import { Subscription, tap } from 'rxjs';
import { ManageProductsService } from '../services/manage-products.service';
import { MatDialog } from '@angular/material/dialog';
import { ManageProductsAddComponent } from '../manage-products-add/manage-products-add.component';

@Component({
  selector: 'app-manage-products-list',
  templateUrl: './manage-products-list.component.html',
  styleUrls: ['./manage-products-list.component.scss']
})
export class ManageProductsListComponent implements OnInit , OnDestroy {

  displayedColumns: string[] = ['id', 'title', 'image' ,  'price', 'description' , 'category'  , 'rate' , 'count' , 'actions'];
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subscription:Subscription = new Subscription();

  constructor(private manageProductsService:ManageProductsService,private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    const sub = this.manageProductsService.getAll()
    .pipe(
      tap((products:IProduct[]) =>{
        this._assignDataSource(products);
        this._applyPagination();
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
        this._addProduct(product);
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
        this._editProduct(product);
      }
    });
  }

  deleteProduct(productId:number){
    const sub = this.manageProductsService.delete(productId)
    .pipe(
      tap((product)=>{
        this.removeIndex(productId);
      })
    )
    .subscribe();
    this.subscription.add(sub);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _addProduct(product:IProduct){
    this.dataSource.data.push(product);
    this._assignDataSource([product , ...this.dataSource.data]);
    this._applyPagination();
  }

  private _editProduct(product:IProduct){
    const ref = this.dataSource.data.map(x => {
      if(x.id == product.id) return product;
      else return x;
    });
    this._assignDataSource(ref);
    this._applyPagination();
  }

  private removeIndex(productId:number){
    this._assignDataSource(this.dataSource.data.filter(x => x.id != productId));
    this._applyPagination();
  }

  private _assignDataSource(products:IProduct[]){
    this.dataSource = new MatTableDataSource(products);
  }

  private _applyPagination(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}