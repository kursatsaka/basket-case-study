import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.interface';


export const getProducts = createAction('[Products] Get Products');
export const addProduct = createAction("[Products] Add Product", props<{ product: Product }>());
export const removeProduct = createAction("[Products] Remove Product", props<{ product: Product }>());
