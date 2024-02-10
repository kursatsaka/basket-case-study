export interface Product {
  Id: number,
  Name: string,
  ImageUrl: string
}

export interface ProductInBasket extends Product {
  Quantity: number
}
