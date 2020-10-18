import {
  Product as ProductInterface,
  ProductUpdate,
} from "../../models/product"
export interface ProductProps {
  onChange?: (productUpdate: ProductUpdate) => void
  product: ProductInterface
  edit?: boolean
}
