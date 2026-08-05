import { CustomerModel, ICustomerDocument } from "./customer.model";
import { ICustomer, ICreateCustomerInput, IUpdateCustomerInput } from "./customer.types";

const mockCustomers: ICustomer[] = [
  {
    id: "CUST-001",
    customerCode: "CUST-2026-101",
    firstName: "Ramesh",
    lastName: "Kumar",
    email: "ramesh.kumar@gmail.com",
    phone: "+91 98201 11223",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    gstNumber: "27AAACI1681G1ZM",
    walletBalance: 450,
    loyaltyPoints: 1250,
    membershipLevel: "Gold",
    status: "Active",
    lastPurchase: new Date("2026-08-05T14:30:00Z"),
    totalOrders: 28,
    totalSpent: 42500,
    createdAt: new Date("2026-01-10T10:00:00Z"),
  },
  {
    id: "CUST-002",
    customerCode: "CUST-2026-102",
    firstName: "Sita",
    lastName: "Sharma",
    email: "sita.sharma@yahoo.com",
    phone: "+91 98980 44556",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    walletBalance: 120,
    loyaltyPoints: 340,
    membershipLevel: "Silver",
    status: "Active",
    lastPurchase: new Date("2026-08-04T11:15:00Z"),
    totalOrders: 12,
    totalSpent: 14800,
    createdAt: new Date("2026-02-14T10:00:00Z"),
  },
  {
    id: "CUST-003",
    customerCode: "CUST-2026-103",
    firstName: "Anjali",
    lastName: "Mehta",
    email: "anjali.m@outlook.com",
    phone: "+91 98765 43210",
    walletBalance: 0,
    loyaltyPoints: 45,
    membershipLevel: "Bronze",
    status: "Active",
    lastPurchase: new Date("2026-07-28T09:00:00Z"),
    totalOrders: 3,
    totalSpent: 2100,
    createdAt: new Date("2026-06-01T10:00:00Z"),
  },
];

export class CustomerRepository {
  async findAll(queryObj: any = {}): Promise<ICustomer[]> {
    try {
      const filter: any = {};
      if (queryObj.status) filter.status = queryObj.status;
      if (queryObj.membershipLevel) filter.membershipLevel = queryObj.membershipLevel;
      if (queryObj.search) {
        filter.$text = { $search: queryObj.search };
      }

      const dbCustomers = await CustomerModel.find(filter).sort({ createdAt: -1 });
      if (dbCustomers.length > 0) return dbCustomers;
    } catch {}

    let filtered = mockCustomers;
    if (queryObj.status) {
      filtered = filtered.filter((c) => c.status === queryObj.status);
    }
    if (queryObj.membershipLevel) {
      filtered = filtered.filter((c) => c.membershipLevel === queryObj.membershipLevel);
    }
    if (queryObj.search) {
      const s = queryObj.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.firstName.toLowerCase().includes(s) ||
          c.lastName.toLowerCase().includes(s) ||
          c.phone.includes(s) ||
          (c.email && c.email.toLowerCase().includes(s)) ||
          c.customerCode.toLowerCase().includes(s)
      );
    }
    return filtered;
  }

  async findById(id: string): Promise<ICustomer | null> {
    try {
      const dbCustomer = await CustomerModel.findById(id);
      if (dbCustomer) return dbCustomer;
    } catch {}

    return mockCustomers.find((c) => c.id === id || c.customerCode === id) || null;
  }

  async create(input: ICreateCustomerInput): Promise<ICustomer> {
    const customerCode = `CUST-2026-${Math.floor(100 + Math.random() * 900)}`;
    try {
      const newCustomer = new CustomerModel({
        ...input,
        customerCode,
        walletBalance: 0,
        loyaltyPoints: 0,
        totalOrders: 0,
        totalSpent: 0,
        status: "Active",
      });
      return await newCustomer.save();
    } catch {
      const created: ICustomer = {
        id: `CUST-00${mockCustomers.length + 1}`,
        customerCode,
        ...input,
        walletBalance: 0,
        loyaltyPoints: 0,
        membershipLevel: input.membershipLevel || "Bronze",
        status: "Active",
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date(),
      };
      mockCustomers.unshift(created);
      return created;
    }
  }

  async update(id: string, input: IUpdateCustomerInput): Promise<ICustomer | null> {
    try {
      const updated = await CustomerModel.findByIdAndUpdate(id, input, { new: true });
      if (updated) return updated;
    } catch {}

    const index = mockCustomers.findIndex((c) => c.id === id || c.customerCode === id);
    if (index === -1) return null;

    mockCustomers[index] = { ...mockCustomers[index], ...input, updatedAt: new Date() };
    return mockCustomers[index];
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleted = await CustomerModel.findByIdAndDelete(id);
      if (deleted) return true;
    } catch {}

    const index = mockCustomers.findIndex((c) => c.id === id || c.customerCode === id);
    if (index === -1) return false;

    mockCustomers.splice(index, 1);
    return true;
  }
}

export const customerRepository = new CustomerRepository();
