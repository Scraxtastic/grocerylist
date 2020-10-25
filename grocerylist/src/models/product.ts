export interface Product {
  id: number
  name: string
  // amount?: number;
  // amountDescription?: string;
  // stores:
}

export type ProductUpdate = {property: "name"; value: string}
export type ProductProperty = SimpleProductProperty
export type SimpleProductProperty = "name" | "id"
