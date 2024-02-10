import * as ProductsActions from './../../store/actions';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../models/appState.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Product, ProductInBasket } from '../../models/product.interface';
import { productSelector } from '../../store/selectors';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  products$: Observable<ProductInBasket[]>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.pipe(select(productSelector));
  }

  ngOnInit(): void {
  }

  removeFromBasket(product: ProductInBasket) {
    this.store.dispatch(ProductsActions.removeProduct({ product: product }))
  }

  increaseQuantity(product: Product) {
    this.store.dispatch(ProductsActions.addProduct({ product:  { ...product, Quantity: 1 } }))
  }

  decreaseQuantity(product: ProductInBasket) {
    this.store.dispatch(ProductsActions.decreaseQuantity({ product:product }))
  }
}
