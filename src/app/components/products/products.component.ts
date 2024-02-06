import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../models/ProductInterface';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products$: Observable<ProductInterface[]> | undefined;

  constructor(private productsService: ProductsService){}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }
}
