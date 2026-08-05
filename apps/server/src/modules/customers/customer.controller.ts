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

// SPRINT 9B - CUSTOMER ADDRESSES ENDPOINTS
export const getCustomerAddresses = asyncHandler(async (req: Request, res: Response) => {
  const mockAddresses = [
    {
      id: "ADDR-001",
      customer: req.params.id,
      type: "Home",
      house: "Flat 402, Sunshine Heights",
      street: "MIDC Central Road, Andheri East",
      landmark: "Opp. SBI Bank",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400093",
      latitude: 19.1136,
      longitude: 72.8697,
      isDefault: true,
    },
    {
      id: "ADDR-002",
      customer: req.params.id,
      type: "Office",
      house: "Unit 12, Technopark IT Hub",
      street: "SEEPZ Zone, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400096",
      isDefault: false,
    },
  ];

  return sendSuccess({
    res,
    message: "Customer addresses retrieved successfully",
    data: mockAddresses,
  });
});

export const addCustomerAddress = asyncHandler(async (req: Request, res: Response) => {
  const newAddress = {
    id: `ADDR-00${Math.floor(Math.random() * 100)}`,
    customer: req.params.id,
    type: req.body.type || "Home",
    house: req.body.house || "House #12",
    street: req.body.street || "Main Street",
    landmark: req.body.landmark,
    city: req.body.city || "Mumbai",
    state: req.body.state || "Maharashtra",
    country: req.body.country || "India",
    pincode: req.body.pincode || "400093",
    latitude: req.body.latitude || 19.1136,
    longitude: req.body.longitude || 72.8697,
    isDefault: req.body.isDefault || false,
  };

  return sendSuccess({
    res,
    statusCode: 201,
    message: "Address added successfully",
    data: newAddress,
  });
});
