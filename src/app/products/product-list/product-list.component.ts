import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as ProductActions from '../../actions/products.action';
import { getCurrentProduct, getError, getproducts, getShowproductCode } from '../../selector/product.selector';
import { State } from '../../state/product.reducer';
import { Product } from '../product';
import { ProductService } from '../product.service';



@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  displayCode: boolean;

  products$: Observable<Product[]>;

  sub: Subscription;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;

  errorMessage$: Observable<string>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getproducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowproductCode);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggelProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {

    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
    // this.productService.changeSelectedProduct(product);
  }

}
