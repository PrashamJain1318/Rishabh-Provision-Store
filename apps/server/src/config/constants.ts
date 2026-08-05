import { UserRoleEnum } from "../types/roles";

export const API_PREFIX = "/api/v1";

export const USER_ROLES = {
  OWNER: UserRoleEnum.OWNER,
  MANAGER: UserRoleEnum.MANAGER,
  CASHIER: UserRoleEnum.CASHIER,
  EMPLOYEE: UserRoleEnum.EMPLOYEE,
  DELIVERY: UserRoleEnum.DELIVERY,
  CUSTOMER: UserRoleEnum.CUSTOMER,
} as const;

export const PAYMENT_MODES = {
  CASH: "Cash",
  UPI: "UPI / QR",
  KHATA: "Khata Udhar Credit",
  CARD: "Debit / Credit Card",
} as const;

export const ORDER_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  DISPATCHED: "Dispatched",
  CANCELLED: "Cancelled",
} as const;
