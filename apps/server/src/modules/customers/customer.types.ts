export type MembershipLevel = "Bronze" | "Silver" | "Gold" | "Platinum";
export type CustomerStatus = "Active" | "Inactive" | "Blocked";

export interface ICustomer {
  id?: string;
  customerCode: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  avatar?: string;
  dob?: Date | string;
  gender?: "Male" | "Female" | "Other";
  gstNumber?: string;
  walletBalance: number;
  loyaltyPoints: number;
  membershipLevel: MembershipLevel;
  status: CustomerStatus;
  lastPurchase?: Date | string;
  totalOrders: number;
  totalSpent: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateCustomerInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  dob?: string;
  gender?: "Male" | "Female" | "Other";
  gstNumber?: string;
  membershipLevel?: MembershipLevel;
}

export interface IUpdateCustomerInput extends Partial<ICreateCustomerInput> {
  status?: CustomerStatus;
  walletBalance?: number;
  loyaltyPoints?: number;
}
