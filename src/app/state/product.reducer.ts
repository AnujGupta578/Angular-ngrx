import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/products.action';
import { Product } from '../products/product';

import * as AppState from '../state/app.state';

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialProductState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
};

export const productReducer = createReducer<ProductState>(
    initialProductState,
    on(ProductActions.toggelProductCode, (state): ProductState => {
        return { ...state, showProductCode: !state.showProductCode };

    }),

    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return { ...state, currentProduct: action.product };

    }),

    on(ProductActions.clearCrrentProduct, (state): ProductState => {
        return { ...state, currentProduct: null };

    }),

    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state, currentProduct: {
                description: '',
                id: 0,
                productCode: 'New',
                productName: '',
                starRating: 0

            }
        };

    }),
);
