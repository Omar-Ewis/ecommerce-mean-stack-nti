export interface ICategoryRef {
  _id: string;
  name: string;
}
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: ICategoryRef;
  slug: string;
  imageURL: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
