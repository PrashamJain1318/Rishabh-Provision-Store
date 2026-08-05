import { orderRepository } from "./order.repository";
import { IOrder, ICreateOrderInput, IUpdateOrderStatusInput } from "./order.types";

export class OrderService {
  async getAllOrders(queryObj: any): Promise<IOrder[]> {
    return await orderRepository.findAll(queryObj);
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    return await orderRepository.findById(id);
  }

  async createOrder(input: ICreateOrderInput): Promise<IOrder> {
    return await orderRepository.create(input);
  }

  async updateOrderStatus(id: string, input: IUpdateOrderStatusInput): Promise<IOrder | null> {
    return await orderRepository.updateStatus(id, input);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return await orderRepository.delete(id);
  }
}

export const orderService = new OrderService();
