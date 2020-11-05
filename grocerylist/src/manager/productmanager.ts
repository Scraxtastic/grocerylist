import Product from "../components/product/Product"
import {
  Product as ProductInterface,
  ProductProperty,
  ProductUpdate,
  SimpleProductProperty,
} from "../models/product"
import {Products} from "../views"
import cloneDeep from "lodash/cloneDeep"
import DatabaseManager from "./databasemanager";


  //TODO Search
export default class ProductManager {
  private products: ProductInterface[] = DatabaseManager.getProducts();
  // [
  //   {id: 1, name: "Apple"},
  //   {id: 2, name: "Pipe"},
  //   {id: 3, name: "Anananas"},
  //   {id: 4, name: "Kaugummi"},
  // ]

  private filteredProducts: ProductInterface[] = cloneDeep(this.products);

  private setFilteredProducts(filteredProducts: ProductInterface[]) {
    this.filteredProducts = filteredProducts;
  }
  getProducts() {
    return this.filteredProducts;
  }

  updateProductProperty(id: number, productUpdate: ProductUpdate) {
    this.products.forEach((product) => {
      if (product.id === id) {
        product[productUpdate.property] = productUpdate.value;
      }
    });
    DatabaseManager.saveProducts(this.products);
  }
  deleteProduct(product: ProductInterface) {
    this.products = this.products.filter((tProduct) => {
      if (product.id === tProduct.id) return false;
      return true;
    });
    DatabaseManager.saveProducts(this.products);
  }
  addProduct(newProduct: ProductInterface) {
    const newProductId = this.products.reduce((highestId, currrentProduct) => {
      if (currrentProduct.id > highestId) return currrentProduct.id;
      return highestId;
    }, -1);
    newProduct.id = newProductId + 1;
    this.products.push(newProduct);
    this.sortByName();
    DatabaseManager.saveProducts(this.products);
  }
  sortById() {
    console.log("Sorting", this.products);
    this.products = this.products.sort(
      (a: ProductInterface, b: ProductInterface) => {
        return a.id - b.id;
      }
    );
    console.log("Sorted", this.products);
  }
  sortBy(property: SimpleProductProperty, ascending: boolean): boolean {
    let productSort: (ascending?: boolean) => void = (ascending) => {};
    const products = this.products;
    if (products.length == 0) {
      return false;
    }
    const propertyType = typeof products[0][property];
    switch (propertyType) {
      //TODO Add other Options e.g. number
      case "string":
        productSort = this.sortByName;
        break;
    }
    productSort();
    return true;
  }
  private sortByName(): void {
    // +(string > string) can only result true/false (1/0), for that reason a "-1" is needed
    this.products = this.products.sort((product1, product2) => {
      return +(product1.name.toLowerCase() > product2.name.toLowerCase()) - 1;
    });
    DatabaseManager.saveProducts(this.products);
  }

  filterProduts(searchText: string) {
    const searchTextLowerCase = searchText.toLowerCase();
    const currentFilteredProducts = cloneDeep(
      this.products.filter((product: ProductInterface) => {
        return this.doesProductIncludeText(product, searchTextLowerCase);
      })
    );

    this.setFilteredProducts(currentFilteredProducts);
    return this.filteredProducts;
  }

  doesProductIncludeText(product: ProductInterface, textLowerCase: string) {
    if (product.name.toLowerCase().includes(textLowerCase)) return true;
    return false;
  }
}
