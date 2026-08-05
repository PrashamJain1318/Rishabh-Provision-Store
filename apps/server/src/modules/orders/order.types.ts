export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Ready"
  | "Out For Delivery"
  | "Delivered"
  | "Cancelled"
  | "Returned"
  | "Refunded";

export interface IOrderItem {
  product: string;
  productName: string;
  sku?: string;
  image?: string;
  quantity: number;
  price: number;
  discount: number;
  gst: number;
  lineTotal: number;
}

export interface IOrderPayment {
  method: "Cash" | "UPI" | "Credit Card" | "Debit Card" | "Net Banking" | "Wallet" | "Split Payment";
  status: "Pending" | "Completed" | "Failed" | "Refunded";
  transactionId?: string;
  amount: number;
}

export interface IOrderDelivery {
  address: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  deliverySlot?: string;
  driverName?: string;
  driverPhone?: string;
}

export interface IOrderTimelineEvent {
  status: OrderStatus;
  timestamp: Date | string;
  performedBy?: string;
  note?: string;
}

export interface IOrder {
  id?: string;
  orderNumber: string;
  customer: string;
  customerName?: string;
  customerPhone?: string;
  items: IOrderItem[];
  payment: IOrderPayment;
  delivery: IOrderDelivery;
  status: OrderStatus;
  invoiceNumber?: string;
  timeline: IOrderTimelineEvent[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateOrderInput {
  customer: string;
  items: IOrderItem[];
  payment: IOrderPayment;
  delivery: IOrderDelivery;
  notes?: string;
}

export interface IUpdateOrderStatusInput {
  status: OrderStatus;
  performedBy?: string;
  note?: string;
}
