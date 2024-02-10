import { createAction, props } from '@ngrx/store';
import { ProductInBasket } from '../models/product.interface';


export const getProducts = createAction('[Products] Get Products');
export const addProduct = createAction("[Products] Add Product", props<{ product: ProductInBasket }>());
export const removeProduct = createAction("[Products] Remove Product", props<{ product: ProductInBasket }>());
export const decreaseQuantity = createAction("[Products] Decrease Quantity", props<{ product: ProductInBasket }>());
