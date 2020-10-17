import IProduct from "../models/product"

interface ProductManagerProps {
  products: IProduct[]
}

export default class ProductManager {
  static products: IProduct[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Pipe" },
    { id: 3, name: "Anananas" },
    { id: 4, name: "Kaugummi" },
  ]
  static getProducts() {
    return ProductManager.products
  }

  static updateProductName(id: number, name: string) {
      console.log("before", ProductManager.products)
    ProductManager.products.forEach((product) => {
      if (product.id !== id) return
      product.name = name;
    })
      console.log("after", ProductManager.products)
  }
}
