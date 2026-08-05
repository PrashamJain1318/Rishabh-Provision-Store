import { OrderModel, IOrderDocument } from "./order.model";
import { IOrder, ICreateOrderInput, IUpdateOrderStatusInput } from "./order.types";

const mockOrders: IOrder[] = [
  {
    id: "ORD-001",
    orderNumber: "ORD-2026-9821",
    customer: "CUST-001",
    customerName: "Ramesh Kumar",
    customerPhone: "+91 98201 11223",
    items: [
      {
        product: "PROD-001",
        productName: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
        sku: "ATT-AASH-5KG",
        quantity: 2,
        price: 245,
        discount: 0,
        gst: 0,
        lineTotal: 490,
      },
    ],
    payment: {
      method: "UPI",
      status: "Completed",
      transactionId: "TXN-9821-UPI",
      amount: 490,
    },
    delivery: {
      address: "Flat 402, Sunshine Heights, MIDC Andheri East, Mumbai",
      pincode: "400093",
      deliverySlot: "Express 10-Min Quick Commerce",
      driverName: "Vikram Singh",
      driverPhone: "+91 98980 12345",
    },
    status: "Out For Delivery",
    invoiceNumber: "INV-2026-9821",
    timeline: [
      { status: "Pending", timestamp: new Date("2026-08-06T00:00:00Z"), note: "Order placed via Web Storefront" },
      { status: "Confirmed", timestamp: new Date("2026-08-06T00:02:00Z"), note: "Merchant confirmed order" },
      { status: "Packed", timestamp: new Date("2026-08-06T00:05:00Z"), note: "Packed at Store Hub #1" },
      { status: "Out For Delivery", timestamp: new Date("2026-08-06T00:10:00Z"), note: "Dispatched with rider Vikram" },
    ],
    notes: "Leave package at front security desk if unavailable",
    createdAt: new Date("2026-08-06T00:00:00Z"),
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-2026-4412",
    customer: "CUST-002",
    customerName: "Sita Sharma",
    customerPhone: "+91 98980 44556",
    items: [
      {
        product: "PROD-003",
        productName: "Amul Pasteurised Cow Butter 500g Pack",
        sku: "BUT-AMUL-500G",
        quantity: 1,
        price: 275,
        discount: 0,
        gst: 12,
        lineTotal: 275,
      },
    ],
    payment: {
      method: "Cash",
      status: "Completed",
      amount: 275,
    },
    delivery: {
      address: "Store POS Counter Billing #1",
      pincode: "400093",
    },
    status: "Delivered",
    invoiceNumber: "INV-2026-4412",
    timeline: [
      { status: "Pending", timestamp: new Date("2026-08-05T18:00:00Z") },
      { status: "Delivered", timestamp: new Date("2026-08-05T18:01:00Z"), note: "POS Counter Checkout" },
    ],
    createdAt: new Date("2026-08-05T18:00:00Z"),
  },
];

export class OrderRepository {
  async findAll(queryObj: any = {}): Promise<IOrder[]> {
    try {
      const filter: any = {};
      if (queryObj.status) filter.status = queryObj.status;
      if (queryObj.customer) filter.customer = queryObj.customer;

      const dbOrders = await OrderModel.find(filter).sort({ createdAt: -1 });
      if (dbOrders.length > 0) return dbOrders;
    } catch {}

    let filtered = mockOrders;
    if (queryObj.status) {
      filtered = filtered.filter((o) => o.status === queryObj.status);
    }
    if (queryObj.customer) {
      filtered = filtered.filter((o) => o.customer === queryObj.customer);
    }
    if (queryObj.search) {
      const s = queryObj.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(s) ||
          (o.customerName && o.customerName.toLowerCase().includes(s)) ||
          (o.invoiceNumber && o.invoiceNumber.toLowerCase().includes(s))
      );
    }
    return filtered;
  }

  async findById(id: string): Promise<IOrder | null> {
    try {
      const dbOrder = await OrderModel.findById(id);
      if (dbOrder) return dbOrder;
    } catch {}

    return mockOrders.find((o) => o.id === id || o.orderNumber === id) || null;
  }

  async create(input: ICreateOrderInput): Promise<IOrder> {
    const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const invoiceNumber = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const newOrder = new OrderModel({
        ...input,
        orderNumber,
        invoiceNumber,
        status: "Pending",
        timeline: [{ status: "Pending", timestamp: new Date(), note: "Order placed" }],
      });
      return await newOrder.save();
    } catch {
      const created: IOrder = {
        id: `ORD-00${mockOrders.length + 1}`,
        orderNumber,
        invoiceNumber,
        customer: input.customer,
        customerName: "Ramesh Kumar",
        items: input.items,
        payment: input.payment,
        delivery: input.delivery,
        status: "Pending",
        timeline: [{ status: "Pending", timestamp: new Date().toISOString(), note: "Order placed" }],
        notes: input.notes,
        createdAt: new Date(),
      };
      mockOrders.unshift(created);
      return created;
    }
  }

  async updateStatus(id: string, input: IUpdateOrderStatusInput): Promise<IOrder | null> {
    try {
      const order = await OrderModel.findById(id);
      if (order) {
        order.status = input.status;
        order.timeline.push({
          status: input.status,
          timestamp: new Date(),
          note: input.note || `Status updated to ${input.status}`,
        } as any);
        return await order.save();
      }
    } catch {}

    const index = mockOrders.findIndex((o) => o.id === id || o.orderNumber === id);
    if (index === -1) return null;

    mockOrders[index].status = input.status;
    mockOrders[index].timeline.push({
      status: input.status,
      timestamp: new Date().toISOString(),
      note: input.note || `Status updated to ${input.status}`,
    });
    mockOrders[index].updatedAt = new Date();
    return mockOrders[index];
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleted = await OrderModel.findByIdAndDelete(id);
      if (deleted) return true;
    } catch {}

    const index = mockOrders.findIndex((o) => o.id === id || o.orderNumber === id);
    if (index === -1) return false;

    mockOrders.splice(index, 1);
    return true;
  }
}

export const orderRepository = new OrderRepository();
