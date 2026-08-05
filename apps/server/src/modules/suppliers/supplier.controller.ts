import { Request, Response } from "express";
import { supplierService } from "./supplier.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const getSuppliers = asyncHandler(async (req: Request, res: Response) => {
  const { search, status } = req.query as { search?: string; status?: string };
  const suppliers = await supplierService.getAllSuppliers(search, status);
  return sendSuccess({
    res,
    message: "Wholesale suppliers list retrieved successfully",
    data: suppliers,
  });
});

export const getSupplierById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const supplier = await supplierService.getSupplierById(id);
  if (!supplier) {
    return sendError({ res, statusCode: 404, message: "Supplier profile not found" });
  }
  return sendSuccess({ res, message: "Supplier profile retrieved successfully", data: supplier });
});

export const createSupplier = asyncHandler(async (req: Request, res: Response) => {
  const supplier = await supplierService.createSupplier(req.body);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Supplier registered successfully",
    data: supplier,
  });
});

export const updateSupplier = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await supplierService.updateSupplier(id, req.body);
  if (!updated) {
    return sendError({ res, statusCode: 404, message: "Supplier not found for update" });
  }
  return sendSuccess({ res, message: "Supplier updated successfully", data: updated });
});

export const deleteSupplier = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await supplierService.deleteSupplier(id);
  return sendSuccess({ res, message: "Supplier deleted successfully", data: {} });
});
