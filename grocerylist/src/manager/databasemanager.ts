import { Product } from "../models/product";
import Cookies from "universal-cookie";

export default class DatabaseManager {
  static getProducts(): Product[] {
    const cookies = new Cookies();
    const products = cookies.get("products");
    return products;
  }
  static saveProducts(products: Product[]): void {
    const cookies = new Cookies();
    const productsJson = JSON.stringify(products);
    cookies.set("products", productsJson);
  }
}
