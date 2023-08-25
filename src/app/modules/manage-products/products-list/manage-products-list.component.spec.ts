import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsListComponent } from './manage-products-list.component';

describe('ProductsListComponent', () => {
  let component: ManageProductsListComponent;
  let fixture: ComponentFixture<ManageProductsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductsListComponent]
    });
    fixture = TestBed.createComponent(ManageProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
