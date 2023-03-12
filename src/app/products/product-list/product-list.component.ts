import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as ProductActions from '../../actions/products.action';
import { getCurrentProduct, getShowproductCode } from '../../selector/product.selector';
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
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    this.store.select(getCurrentProduct).subscribe(currentProduct => {
      this.selectedProduct = currentProduct;
    });

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // Unsubscribe suscription
    // 1st way
    // this.store.select('products').subscribe(products => {
    //   this.displayCode = products.showProductCode;
    // });

    // 2nd way

    this.store.select(getShowproductCode).subscribe(showProductCode => {
      this.displayCode = showProductCode;
    });




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

    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
    // this.productService.changeSelectedProduct(product);
  }

}
