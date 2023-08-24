import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../models/products.model';
import { Subscription, tap } from 'rxjs';
import { ProductsService } from '../services/products.service';

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

  constructor(private productsService:ProductsService) {
    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    const sub = this.productsService.getProducts()
    .pipe(
      tap((products:IProduct[]) =>{
        this._assignDataSource(products);
        this._applyPagination();
      })
    ).subscribe();
    this.subscription.add(sub);
  }

  openModalAddProduct(){
    
  }

  deleteProduct(product:IProduct){
    const sub = this.productsService.deleteProducts(product.id)
    .pipe(
      tap((product)=>{
        this.removeIndex(product);
      })
    )
    .subscribe();
    this.subscription.add(sub);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private removeIndex(product:IProduct){
    this._assignDataSource(this.dataSource.data.filter(x => x.id != product.id));
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