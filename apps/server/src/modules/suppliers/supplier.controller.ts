import { Request, Response } from "express";
import { supplierService } from "./supplier.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getSuppliers = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query;
  const suppliers = await supplierService.getAllSuppliers(search as string, status as string);
  return sendSuccess({
    res,
    message: "Suppliers retrieved successfully",
    data: suppliers,
  });
});

export const getSupplierById = asyncHandler(async (req: Request, res: Response) => {
  const supplier = await supplierService.getSupplierById(req.params.id as string);
  if (!supplier) return sendError({ res, statusCode: 404, message: "Supplier not found" });
  return sendSuccess({
    res,
    message: "Supplier retrieved successfully",
    data: supplier,
  });
});

export const createSupplier = asyncHandler(async (req: Request, res: Response) => {
  const supplier = await supplierService.createSupplier(req.body, (req as any).user?.id);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Supplier registered successfully",
    data: supplier,
  });
});

export const updateSupplier = asyncHandler(async (req: Request, res: Response) => {
  const supplier = await supplierService.updateSupplier(req.params.id as string, req.body);
  if (!supplier) return sendError({ res, statusCode: 404, message: "Supplier not found" });
  return sendSuccess({
    res,
    message: "Supplier updated successfully",
    data: supplier,
  });
});

export const deleteSupplier = asyncHandler(async (req: Request, res: Response) => {
  const success = await supplierService.deleteSupplier(req.params.id as string);
  if (!success) return sendError({ res, statusCode: 404, message: "Supplier not found" });
  return sendSuccess({
    res,
    message: "Supplier deleted successfully",
    data: null,
  });
});
