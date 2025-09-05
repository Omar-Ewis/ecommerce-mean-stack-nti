export interface IOrder {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  orderItems: {
    productId: {
      _id: string;
      name: string;
      imageURL: string;
      price: number;
    };
    quantity: number;
  }[];
  shippingAddress: {
    governorate: string;
    city: string;
    street: string;
    building?: string;
    floor?: string;
    apartment?: string;
    landmark?: string;
    zip?: string;
    country?: string;
  };

  total: number;
  status: string;
  createdAt: string;
}
