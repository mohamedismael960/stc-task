import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../models/products.model';
import { Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsAddComponent } from '../products-add/products-add.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit , OnDestroy {

  displayedColumns: string[] = ['id', 'title', 'image' ,  'price', 'description' , 'category'  , 'rate' , 'count' , 'actions'];
  dataSource!: MatTableDataSource<IProduct>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subscription:Subscription = new Subscription();

  constructor(private productsService:ProductsService,private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    const sub = this.productsService.getAll()
    .pipe(
      tap((products:IProduct[]) =>{
        this._assignDataSource(products);
        this._applyPagination();
      })
    ).subscribe();
    this.subscription.add(sub);
  }

  openModalAddProduct(){
    const dialogRef = this.dialog.open(ProductsAddComponent, {
      panelClass:['customDialog']
    });
    dialogRef.afterClosed().subscribe((product:IProduct | null) => {
      if(product){
        this._addProduct(product);
      }
    });
  }

  openModalEditProduct(product:IProduct){
    const dialogRef = this.dialog.open(ProductsAddComponent, {
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
    const sub = this.productsService.delete(productId)
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