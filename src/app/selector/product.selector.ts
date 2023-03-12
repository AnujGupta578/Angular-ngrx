import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../state/product.reducer';

export const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowproductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getproducts = createSelector(
    getProductFeatureState,
    state => state.products
);
