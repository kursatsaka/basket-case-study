import { Product, ProductInBasket } from "./product.interface";

export interface AppState{
  products: Basket;
}

export interface Basket {
  products: ProductInBasket[]
}
