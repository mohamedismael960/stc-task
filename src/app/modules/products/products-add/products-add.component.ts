import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { IProduct, Product } from '../models/products.model';
import { Observable, Subscription, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit {

  loader:boolean = false;

  productForm:UntypedFormGroup = this._fb.group({
    id:[''],
    title:['',[Validators.required]],
    price:['',[Validators.required]],
    description:['',[Validators.required]],
    category:['',[Validators.required]],
    rate:['',[Validators.required]],
    count:['',[Validators.required]],
  });

  subscription:Subscription = new Subscription();
  constructor(
    private _fb:FormBuilder,
    public dialogRef: MatDialogRef<ProductsAddComponent>,
    private productsService:ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      if(data?.product){
        this.updateForm(data.product);
      }
  }

  ngOnInit(): void {
    
  }

  save(){
    if(this.productForm.invalid) return;
    this.loader = true;
    const product = this.createFromForm();
    if(product.id){
      this.subscribeToSaveResponse(this.productsService.updateProducts(product));
    }else{
      this.subscribeToSaveResponse(this.productsService.addProducts(product));
    }
  }


  protected subscribeToSaveResponse(result: Observable<IProduct>): void {
    const sub = result.pipe(
      tap(()=>{
        const pro = this.createFromForm();
        if(!pro.id){
          pro.id = Math.floor(Math.random() * 100);
        }
        this.dialogRef.close(pro);
      }),
      finalize(() => this.onSaveFinalize())
      ).subscribe();
    this.subscription.add(sub);
  }

  protected onSaveFinalize(): void {
    this.loader = false;
  }

  protected createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.productForm.get(['id'])!.value,
      title: this.productForm.get(['title'])!.value,
      price: this.productForm.get(['price'])!.value,
      description: this.productForm.get(['description'])!.value,
      category: this.productForm.get(['category'])!.value,
      image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        count : this.productForm.get(['count'])!.value,
        rate : this.productForm.get(['rate'])!.value,
      }
    };
  }

  protected updateForm(product: IProduct): void {
    this.productForm.patchValue({
      id: product.id,
      title:product.title,
      price:product.price,
      description:product.description,
      category:product.category,
      rate:product?.rating?.rate,
      count:product?.rating?.count,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
