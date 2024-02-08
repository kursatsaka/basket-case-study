import { Product } from "./product.interface";

export interface AppState{
  products: Cart;
}

export interface Cart {
  products: Product[]
}
