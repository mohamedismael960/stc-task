import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageProductsService } from '../../../core/services/manage-products.service';
import { Observable, Subject, finalize, takeUntil, tap } from 'rxjs';
import { IProduct, Product } from 'src/app/core/models/products.model';

@Component({
  selector: 'app-manage-products-add',
  templateUrl: './manage-products-add.component.html',
  styleUrls: ['./manage-products-add.component.scss']
})
export class ManageProductsAddComponent implements OnInit {

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

  
  private readonly destroy$ = new Subject<void>();

  constructor(
    private _fb:FormBuilder,
    public dialogRef: MatDialogRef<ManageProductsAddComponent>,
    private manageProductsService:ManageProductsService,
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
      this.subscribeToSaveResponse(this.manageProductsService.update(product));
    }else{
      this.subscribeToSaveResponse(this.manageProductsService.add(product));
    }
  }


  protected subscribeToSaveResponse(result: Observable<IProduct>): void {
    result.pipe(
      takeUntil(this.destroy$),
      tap(()=>{
        const pro = this.createFromForm();
        if(!pro.id){
          pro.id = Math.floor(Math.random() * 100);
        }
        this.dialogRef.close(pro);
      }),
      finalize(() => this.onSaveFinalize())
      ).subscribe();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
