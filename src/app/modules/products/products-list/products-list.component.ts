import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Observable, Subscription, finalize, tap } from 'rxjs';
import { ManageProductsService } from '../../../core/services/manage-products.service';
import { IProduct } from 'src/app/core/models/products.model';
import { ManageCategoriesService } from 'src/app/core/services/manage-categories.service copy';
import { ICategory } from 'src/app/core/models/categories';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit , OnDestroy {


  subscription:Subscription = new Subscription();
  
  categories!:Observable<ICategory[]>;

  products!:Observable<IProduct[]>;

  selectedCategory!:ICategory;

  loader:boolean = false;

  constructor(
    private manageProductsService:ManageProductsService,
    private manageCategoriesService:ManageCategoriesService
    ) {
    
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categories = this.manageCategoriesService.getAll();
  }

  getProduct(){
    this.loader = true;
    this.products = this.manageProductsService.getProductsInASpecificCategory(this.selectedCategory)
    .pipe(
      finalize(()=>{
        this.loader = false;
      })
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}