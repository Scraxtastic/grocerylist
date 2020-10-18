import { Product as ProductInterface, ProductUpdate } from "../models/product"


export default class ProductManager {
  static products: ProductInterface[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Pipe" },
    { id: 3, name: "Anananas" },
    { id: 4, name: "Kaugummi" },
  ]
  static getProducts() {
    return ProductManager.products
  }

  static updateProductProperty(id: number, productUpdate: ProductUpdate) {
    ProductManager.products.forEach((product) => {
      if (product.id === id) {
        product[productUpdate.property] = productUpdate.value
      }
    })
  }
}
