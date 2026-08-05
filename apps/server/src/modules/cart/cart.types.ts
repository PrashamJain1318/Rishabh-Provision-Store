export interface ICartItem {
  product: string;
  productName?: string;
  sku?: string;
  image?: string;
  quantity: number;
  price: number;
  discount: number;
  gst: number;
  lineTotal: number;
}

export interface ICart {
  id?: string;
  customer?: string;
  sessionId?: string;
  items: ICartItem[];
  couponCode?: string;
  discountTotal: number;
  gstTotal: number;
  grandTotal: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddToCartInput {
  productId: string;
  quantity: number;
}

export interface IMergeCartInput {
  sessionId: string;
  customerId: string;
}
