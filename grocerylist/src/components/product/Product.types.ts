import {
  Product as ProductInterface,
  ProductUpdate,
} from "../../models/product"
export interface ProductProps {
  onChange?: (productUpdate: ProductUpdate) => void
  onDelete?: () => void
  product: ProductInterface
  edit?: boolean
}
