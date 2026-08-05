export type DriverStatus = "Available" | "Busy" | "Offline";

export interface IDeliveryDriver {
  id?: string;
  driverCode: string;
  name: string;
  phone: string;
  vehicle: string;
  currentOrders: number;
  status: DriverStatus;
  currentLocation?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAssignDriverInput {
  orderId: string;
  driverId: string;
}
