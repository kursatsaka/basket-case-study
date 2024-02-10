import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from './../../services/products.service';
import { Store, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { AppState, Basket } from '../../models/appState.interface';
import { Product } from '../../models/product.interface';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as ProductsActions from './../../store/actions';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  let store: MockStore<AppState>;
  const initialState: Basket = {
    products: []
  };

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    store = TestBed.inject(Store) as MockStore<AppState>;
    spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService.getProducts.and.returnValue(of([{ Id: 1, Name: 'testProduct', ImageUrl: "testUrl" } as Product]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to add product to basket', () => {
    const product: Product = { Id: 1, Name: 'testProduct', ImageUrl: "testUrl" };
    const action = ProductsActions.addProduct({ product: { ...product, Quantity: 1 } });

    component.addToBasket(product);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
