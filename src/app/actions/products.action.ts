import { createAction, props } from '@ngrx/store';
import { Product } from '../products/product';

export const toggelProductCode = createAction('[Product] Toggle Product Code'
);
export const setCurrentProduct = createAction('[Product] Set Current Product',
    props<{ currentProductId: number | null }>()
);

export const clearCrrentProduct = createAction('[Product] Clear Current Product');

export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

export const loadProducts = createAction('[Product] Load Products');

export const loadProductSuccess = createAction('[Product] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductFail = createAction('[Product] Load fail',
    props<{ error: string }>()
);

export const updateProduct = createAction('[Product] Update Product',
    props<{ product: Product }>()
);

export const updateProductSuccess = createAction('[Product] Update Product Success',
    props<{ product: Product }>()
);

export const updateProductFailure = createAction('[Product] Update Product Error',
    props<{ error: string }>()
);

