import { ProductInBasket } from "./product.interface";

export interface AppState{
  basket: Basket;
}

export interface Basket {
  products: ProductInBasket[]
}
