import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { Product } from '../../models/product.interface';
import { AppState } from '../../models/appState.interface';
import { Store } from '@ngrx/store';
import * as PostsActions from './../../store/actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  constructor(private productsService: ProductsService,private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  addToBasket(product: Product) {
    this.store.dispatch(PostsActions.addProduct({product: product}))
  }
}
