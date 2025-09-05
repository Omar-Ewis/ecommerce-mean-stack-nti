import { IProduct } from './product.model';
export interface ICartItem {
  _id: string;
  name: string;
  price: number;
  imageURL: string;
  slug: string;
  quantity: number;
}

export interface ICart {
  _id?: string;
  userId?: string;
  items: ICartItem[];
  updatedAt?: Date;
}
