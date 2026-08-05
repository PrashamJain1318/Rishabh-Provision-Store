import { Request, Response } from "express";
import { customerService } from "./customer.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getCustomers = asyncHandler(async (req: Request, res: Response) => {
  const customers = await customerService.getAllCustomers(req.query);
  return sendSuccess({
    res,
    message: "Customers fetched successfully",
    data: customers,
  });
});

export const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.getCustomerById(req.params.id as string);
  if (!customer) return sendError({ res, statusCode: 404, message: "Customer profile not found" });
  return sendSuccess({
    res,
    message: "Customer retrieved successfully",
    data: customer,
  });
});

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.createCustomer(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Customer profile registered successfully",
    data: customer,
  });
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.updateCustomer(req.params.id as string, req.body);
  if (!customer) return sendError({ res, statusCode: 404, message: "Customer profile not found" });
  return sendSuccess({
    res,
    message: "Customer updated successfully",
    data: customer,
  });
});

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const success = await customerService.deleteCustomer(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Customer profile not found" });
  return sendSuccess({
    res,
    message: "Customer deleted successfully",
    data: null,
  });
});
