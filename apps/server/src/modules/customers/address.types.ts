export type AddressType = "Home" | "Office" | "Other";

export interface ICustomerAddress {
  id?: string;
  customer: string;
  type: AddressType;
  house: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateAddressInput {
  customer: string;
  type: AddressType;
  house: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  country?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}
