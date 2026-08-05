import { Request, Response } from "express";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

const mockDrivers = [
  {
    id: "DRV-001",
    driverCode: "RIDER-101",
    name: "Vikram Singh",
    phone: "+91 98980 12345",
    vehicle: "TVS iQube EV (MH-02-CD-9821)",
    currentOrders: 1,
    status: "Busy",
    currentLocation: "MIDC Sector 3, Andheri East",
  },
  {
    id: "DRV-002",
    driverCode: "RIDER-102",
    name: "Rahul Verma",
    phone: "+91 98201 54321",
    vehicle: "Ather 450X EV (MH-02-EE-4412)",
    currentOrders: 0,
    status: "Available",
    currentLocation: "Store Hub #1",
  },
];

export const getDeliveryDrivers = asyncHandler(async (req: Request, res: Response) => {
  return sendSuccess({
    res,
    message: "Delivery drivers fetched successfully",
    data: mockDrivers,
  });
});

export const createDeliveryDriver = asyncHandler(async (req: Request, res: Response) => {
  const newDriver = {
    id: `DRV-00${mockDrivers.length + 1}`,
    driverCode: `RIDER-${Math.floor(100 + Math.random() * 900)}`,
    name: req.body.name || "New Rider",
    phone: req.body.phone || "+91 98000 00000",
    vehicle: req.body.vehicle || "Electric Scooter",
    currentOrders: 0,
    status: "Available",
    currentLocation: "Store Hub #1",
  };

  mockDrivers.push(newDriver);
  return sendSuccess({
    res,
    statusCode: 201,
    message: "Delivery driver registered successfully",
    data: newDriver,
  });
});

export const assignDriverToOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, driverId } = req.body;
  if (!orderId || !driverId) {
    return sendError({ res, statusCode: 400, message: "orderId and driverId are required" });
  }

  const driver = mockDrivers.find((d) => d.id === driverId || d.driverCode === driverId) || mockDrivers[0];

  return sendSuccess({
    res,
    message: `Driver ${driver.name} assigned to Order ${orderId}. Status updated to Out For Delivery.`,
    data: {
      orderId,
      driverName: driver.name,
      driverPhone: driver.phone,
      vehicle: driver.vehicle,
      status: "Out For Delivery",
      assignedAt: new Date().toISOString(),
    },
  });
});
