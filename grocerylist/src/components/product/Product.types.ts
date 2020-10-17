import IProduct from '../../models/product';
export interface ProductProps{
    onChange?: (property: string, value: any) => void;
    product: IProduct;
    edit?: boolean;
}