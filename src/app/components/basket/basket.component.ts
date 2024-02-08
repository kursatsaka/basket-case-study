import * as ProductsActions from './../../store/actions';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../models/appState.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../../models/product.interface';
import { productSelector } from '../../store/selectors';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.pipe(select(productSelector));

  }

  ngOnInit(): void {
  }

  removeFromBasket(product: Product) {
    this.store.dispatch(ProductsActions.removeProduct({product: product}))
  }
}
