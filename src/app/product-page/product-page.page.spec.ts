import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPagePage } from './product-page.page';

describe('ProductPagePage', () => {
  let component: ProductPagePage;
  let fixture: ComponentFixture<ProductPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
