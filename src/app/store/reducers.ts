import { createReducer, on } from '@ngrx/store';
import { Basket } from '../models/appState.interface';
import * as ProductsActions from './actions';

export const initialState: Basket = {
  products: []
};

export const productsReducer = createReducer(initialState,
  on(ProductsActions.addProduct, (state, action) => {
    let existingProduct = state.products.find(e => e.Id === action.product.Id);
    if(existingProduct){
      const updatedProducts = state.products.map((item) =>
        item.Id === action.product.Id
          ? { ...item, Quantity: item.Quantity + 1 }
          : item
      );
      return {
        ...state,
        products: updatedProducts,
      };
    }
    else{
      return {
        ...state,
        products: [...state.products, action.product],
      };
    }
  }),
  on(ProductsActions.removeProduct, (state, action) => {
    const products = [...state.products];
    const index = products.findIndex(x => x.Id === action.product.Id);
    products.splice(index, 1);

    state = {
      ...state,
      products: products
    }

    return state;
  }),
  on(ProductsActions.decreaseQuantity, (state, action) => {
      const updatedProducts = state.products.map((item) =>
        item.Id === action.product.Id
          ? { ...item, Quantity: item.Quantity - 1 }
          : item
      );
      return {
        ...state,
        products: updatedProducts,
      };
  }),
);
