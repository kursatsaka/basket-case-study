import * as fromReducer from './reducers';
import { Action } from "@ngrx/store";
import * as ProductsActions from "./actions";
import { ProductInBasket } from '../models/product.interface';
import { Basket } from '../models/appState.interface';

describe('Product Reducer', () => {
  const { initialState, productsReducer } = fromReducer;
  const sampleProduct: ProductInBasket = { Id: 1, Name: 'testName', ImageUrl: 'testUrl', Quantity: 1 }
  const sample2Product: ProductInBasket = { Id: 2, Name: 'testName2', ImageUrl: 'testUrl2', Quantity: 1 }
  it('should return initial state if the action is unknown', () => {
    const action: Action = { type: 'Unknown' };
    const state = productsReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should have 1 product in basket after adding 1 product', () => {
    const action = ProductsActions.addProduct({ product: sampleProduct });
    const state = productsReducer(initialState, action);
    expect(state.products.length).toEqual(1);
    expect(state.products[0]).toBe(sampleProduct);
  });

  it('should have 2 product in basket after adding diffrent two product', () => {
    const action = ProductsActions.addProduct({ product: sampleProduct });
    const action2 = ProductsActions.addProduct({ product: sample2Product });
    let state = productsReducer(initialState, action);
    state = productsReducer(state, action2);
    expect(state.products.length).toEqual(2);
  });

  it('should have 1 product in basket after adding same product multiple times', () => {
    const action = ProductsActions.addProduct({ product: sampleProduct });
    const action2 = ProductsActions.addProduct({ product: sampleProduct });
    let state = productsReducer(initialState, action);
    state = productsReducer(state, action2);
    expect(state.products.length).toEqual(1);
  });

  it('should remove a product from the basket', () => {
    const initialStateWithProduct: Basket = {
      products: [{ Id: 1, Name: 'Test Product', ImageUrl: 'testUrl', Quantity: 1 }]
    };
    const action = ProductsActions.removeProduct({ product: { Id: 1, Name: 'Test Product', ImageUrl: 'testUrl', Quantity: 1 } });
    const newState = productsReducer(initialStateWithProduct, action);
    expect(newState.products.length).toBe(0);
  });

  it('should decrease quantity of a product in the basket', () => {
    const initialStateWithProduct: Basket = {
      products: [{ Id: 1, Name: 'Test Product', ImageUrl: 'testUrl', Quantity: 2 }]
    };
    const action = ProductsActions.decreaseQuantity({ product: { Id: 1, Name: 'Test Product', ImageUrl: 'testUrl', Quantity: 1 } });
    const newState = productsReducer(initialStateWithProduct, action);

    expect(newState.products.length).toBe(1);
    expect(newState.products[0].Quantity).toBe(1);
  });
});
