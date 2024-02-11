import { productSelector } from './selectors';
import { AppState } from '../models/appState.interface';

describe('Product Selector', () => {
  it('should select products from the state', () => {
    const initialState: AppState = {
      basket: {
        products: [
          { Id: 1, Name: 'Test Product 1', ImageUrl: 'testUrl1', Quantity: 1 },
          { Id: 2, Name: 'Test Product 2', ImageUrl: 'testUrl2', Quantity: 2 }
        ]
      }
    };

    const selectedProducts = productSelector(initialState);
    expect(selectedProducts).toEqual([
      { Id: 1, Name: 'Test Product 1', ImageUrl: 'testUrl1', Quantity: 1 },
      { Id: 2, Name: 'Test Product 2', ImageUrl: 'testUrl2', Quantity: 2 }
    ]);
  });
});
