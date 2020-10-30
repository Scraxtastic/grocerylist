import {Product} from "../../models/product"
export default interface ModalHandlerProps {
  edit: boolean
  open: boolean
  onAdd: (product: Product) => void
  onClose: () => void
}
