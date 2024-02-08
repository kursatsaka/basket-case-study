import { createReducer, on } from '@ngrx/store';
import { Basket } from '../models/appState.interface';
import * as PostsActions from './actions';

export const initialState: Basket = {
  products: []
};

export const productsReducer = createReducer(initialState,
  on(PostsActions.addProduct, (state, action) => {
    state = {
      ...state,
      products: [...state.products, action.product]
    }
    return state;
  }),
  on(PostsActions.removeProduct, (state, action) => {
    const products = [...state.products];
    const index = products.findIndex(x => x.Id === action.product.Id);
    products.splice(index, 1);

    state = {
      ...state,
      products: products
    }

    return state;
  })
);
