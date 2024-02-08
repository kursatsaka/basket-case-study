import { Routes } from '@angular/router';
import { BasketComponent } from './components/basket/basket.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'basket', component: BasketComponent },
];
