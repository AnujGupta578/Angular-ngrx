import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../state/product.reducer';

export const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowproductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,

    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                description: '',
                id: 0,
                productCode: 'New',
                productName: '',
                starRating: 0

            };
        } else {
            return currentProductId ? state.products.find(e => e.id === currentProductId) : null;
        }
    }
);

export const getproducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

