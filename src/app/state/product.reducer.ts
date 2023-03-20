import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/products.action';
import { Product } from '../products/product';

import * as AppState from '../state/app.state';

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialProductState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: null
};

export const productReducer = createReducer<ProductState>(
    initialProductState,
    on(ProductActions.toggelProductCode, (state): ProductState => {
        return { ...state, showProductCode: !state.showProductCode };

    }),

    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return { ...state, currentProductId: action.currentProductId };

    }),

    on(ProductActions.clearCrrentProduct, (state): ProductState => {
        return { ...state, currentProductId: null };

    }),

    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state, currentProductId: 0
        };

    }),

    on(ProductActions.loadProductSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }

    }),

    on(ProductActions.loadProductFail, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }

    })
);
