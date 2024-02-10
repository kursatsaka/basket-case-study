import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ProductInBasket } from './models/product.interface';
import { productSelector } from './store/selectors';
import { AppState } from './models/appState.interface';
import { AppComponent } from './app.component';
import { RouterTestingModule } from "@angular/router/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  const mockProducts: ProductInBasket[] = [
    { Id: 1, Name: 'Product 1', ImageUrl: 'image1.jpg', Quantity: 1 },
    { Id: 2, Name: 'Product 2', ImageUrl: 'image2.jpg', Quantity: 2 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatBadgeModule,
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        provideMockStore({ initialState: { products: [] } }),
        { provide: productSelector, useValue: jasmine.createSpy() }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    spyOn(store, 'pipe').and.returnValue(of(mockProducts));

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'basket-case-study' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('basket-case-study');
  });

  it('should have 2 products', waitForAsync(() => {
    fixture.whenStable().then(() => {
        component.products$.subscribe(data => {
          expect(data.length).toBe(2);
        });
    });
  }));
});
