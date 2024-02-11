import { AppState, Basket } from './../../models/appState.interface';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BasketComponent } from './basket.component';
import { Store, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { productSelector } from '../../store/selectors';
import * as ProductsActions from './../../store/actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductInBasket } from '../../models/product.interface';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BasketComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({ initialState: { products: [] } }),
        { provide: productSelector, useValue: jasmine.createSpy() }
      ]
    });

    store = TestBed.inject(Store) as MockStore<AppState>;
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to remove product from basket', () => {
    const product: ProductInBasket = { Id: 1, Name: 'testProduct',ImageUrl: "testUrl", Quantity: 1 };
    const action = ProductsActions.removeProduct({ product });

    component.removeFromBasket(product);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an action to increase product quantity', () => {
    const product: ProductInBasket = { Id: 1, Name: 'testProduct',ImageUrl: "testUrl", Quantity: 1 };
    const action = ProductsActions.addProduct({ product: { ...product, Quantity: 1 } });

    component.increaseQuantity(product);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an action to decrease product quantity', () => {
    const product: ProductInBasket = { Id: 1, Name: 'testProduct',ImageUrl: "testUrl", Quantity: 1 };
    const action = ProductsActions.decreaseQuantity({ product });

    component.decreaseQuantity(product);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display a list of items after the data is loaded', () => {
    const product: ProductInBasket = { Id: 1, Name: 'testProduct',ImageUrl: "testUrl", Quantity: 1 };
    store.setState({basket: {
      products: [product]
    }});

    component.products$.subscribe(data => {
      expect(data.length).toBe(1);
    });
  });

});
