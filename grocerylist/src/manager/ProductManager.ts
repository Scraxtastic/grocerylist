import Product from "../components/product/Product"
import {
  Product as ProductInterface,
  ProductProperty,
  ProductUpdate,
  SimpleProductProperty,
} from "../models/product"
import {Products} from "../views"
import cloneDeep from "lodash/cloneDeep"

/*TODO improve filtering 
(cannot filter, without manipulating the value for every class, that uses this class)
Should maybe be build nonstatic*/

export default class ProductManager {
  private static products: ProductInterface[] = [
    {id: 1, name: "Apple"},
    {id: 2, name: "Pipe"},
    {id: 3, name: "Anananas"},
    {id: 4, name: "Kaugummi"},
  ]

  private static filteredProducts: ProductInterface[] = cloneDeep(
    ProductManager.products
  )

  private static setProducts(products: ProductInterface[]) {
    ProductManager.products = products
  }
  private static setFilteredProducts(filteredProducts: ProductInterface[]) {
    ProductManager.filteredProducts = filteredProducts
  }
  static getProducts() {
    return ProductManager.filteredProducts
  }

  static updateProductProperty(id: number, productUpdate: ProductUpdate) {
    ProductManager.products.forEach((product) => {
      if (product.id === id) {
        product[productUpdate.property] = productUpdate.value
      }
    })
  }
  static cleanProducts() {
    const newProducts = ProductManager.products.filter((product) => {
      if (product.name.length == 0) {
        return false
      }

      return true
    })
    this.setProducts(newProducts)
  }
  static addProduct(newProduct: ProductInterface) {
    const newProductId = ProductManager.products.reduce(
      (highestId, currrentProduct) => {
        if (currrentProduct.id > highestId) return currrentProduct.id
        return highestId
      },
      -1
    )
    newProduct.id = newProductId + 1
    ProductManager.products.push(newProduct)
  }
  static sortBy(
    property: SimpleProductProperty,
    ascending: boolean
  ): ProductInterface[] {
    let productSort: (
      product1: ProductInterface,
      product2: ProductInterface
    ) => number
    const products = ProductManager.products
    if (products.length == 0) {
      return []
    }
    const propertyType = typeof products[0][property]
    switch (propertyType) {
      //TODO Add other Options e.g. number
      case "string":
        productSort = this.sortByProductName
        break
    }
    const sortedProducts = ProductManager.products.sort(
      (product1: ProductInterface, product2: ProductInterface) => {
        return productSort(product1, product2)
      }
    )
    return ascending ? sortedProducts : sortedProducts.reverse()
  }
  //TODO Search
  private static sortByProductName(
    product1: ProductInterface,
    product2: ProductInterface
  ): number {
    // +(string > string) can only result true/false (1/0), for that reason a "-1" is needed
    return +(product1.name.toLowerCase() > product2.name.toLowerCase()) - 1
  }

  static filterProduts(searchText: string) {
    const searchTextLowerCase = searchText.toLowerCase()
    const currentFilteredProducts = cloneDeep(
      ProductManager.products.filter((product: ProductInterface) => {
        return ProductManager.doesProductIncludeText(
          product,
          searchTextLowerCase
        )
      })
    )

    ProductManager.setFilteredProducts(currentFilteredProducts)
    return ProductManager.filteredProducts
  }

  static doesProductIncludeText(
    product: ProductInterface,
    textLowerCase: string
  ) {
    if (product.name.toLowerCase().includes(textLowerCase)) return true
    return false
  }
}
