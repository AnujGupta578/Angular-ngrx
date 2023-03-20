import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, concatMap } from 'rxjs/operators';

import * as ProductActions from '../actions/products.action';
import { ProductService } from '../products/product.service';

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductSuccess({ products })),
                catchError(error => of(ProductActions.loadProductFail({ error })))
            ))
        );
    });

    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            concatMap(action => this.productService.updateProduct(action.product).pipe(
                map(product => ProductActions.updateProductSuccess({ product })),
                catchError(error => of(ProductActions.updateProductFailure({ error })))
            ))
        );
    });
}
