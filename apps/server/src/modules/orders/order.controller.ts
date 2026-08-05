import { Request, Response } from "express";
import { orderService } from "./order.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders(req.query);
  return sendSuccess({
    res,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(req.params.id as string);
  if (!order) return sendError({ res, statusCode: 404, message: "Order not found" });
  return sendSuccess({
    res,
    message: "Order retrieved successfully",
    data: order,
  });
});

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Order created successfully",
    data: order,
  });
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.updateOrderStatus(req.params.id as string, req.body);
  if (!order) return sendError({ res, statusCode: 404, message: "Order not found" });
  return sendSuccess({
    res,
    message: "Order status updated successfully",
    data: order,
  });
});

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const success = await orderService.deleteOrder(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Order not found" });
  return sendSuccess({
    res,
    message: "Order cancelled and deleted successfully",
    data: null,
  });
});
