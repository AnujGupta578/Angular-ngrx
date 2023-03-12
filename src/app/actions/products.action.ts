import { createAction, props } from '@ngrx/store';
import { Product } from '../products/product';

export const toggelProductCode = createAction('[Product] Toggle Product Code'
);
export const setCurrentProduct = createAction('[Product] Set Current Product',
    props<{ product: Product }>());
export const clearCrrentProduct = createAction('[Product] Clear Current Product');
export const initializeCurrentProduct = createAction('[Product] Initialize Current Product');

export const loadProductSuccess = createAction('[Product] Load Success',
    props<{ products: Product[] }>());

export const loadProductFail = createAction('[Product] Load fail',
    props<{ error: string }>());

