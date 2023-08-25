import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsAddComponent } from './manage-products-add.component';

describe('ProductsAddComponent', () => {
  let component: ManageProductsAddComponent;
  let fixture: ComponentFixture<ManageProductsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductsAddComponent]
    });
    fixture = TestBed.createComponent(ManageProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
