import { SupplierModel, ISupplierDocument } from "./supplier.model";
import { ISupplier } from "./supplier.types";

const mockSuppliers: ISupplier[] = [
  {
    id: "SUP-001",
    companyName: "ITC Grocery Wholesalers Ltd",
    ownerName: "Sanjiv Puri",
    gst: "27AAACI1681G1ZM",
    pan: "AAACI1681G",
    phone: "+91 98201 12345",
    email: "wholesale.orders@itc.in",
    address: "ITC Centre, 4th Floor, MIDC Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    outstandingBalance: 42000,
    creditLimit: 500000,
    status: "Active",
    totalPurchases: 850000,
    pendingPaymentsCount: 2,
    createdAt: new Date(),
  },
  {
    id: "SUP-002",
    companyName: "Adani Wilmar Edible Oils Supply",
    ownerName: "Angshu Mallick",
    gst: "24AABCA2238D1Z2",
    pan: "AABCA2238D",
    phone: "+91 98980 54321",
    email: "supply.fortune@adaniwilmar.com",
    address: "Adani Corporate House, SG Highway",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "382421",
    outstandingBalance: 18500,
    creditLimit: 300000,
    status: "Active",
    totalPurchases: 420000,
    pendingPaymentsCount: 1,
    createdAt: new Date(),
  },
  {
    id: "SUP-003",
    companyName: "Amul Anand Dairy Union Co",
    ownerName: "RS Sodhi",
    gst: "24AAAAA0000A1Z5",
    pan: "AAAAA0000A",
    phone: "+91 98250 99887",
    email: "dairy.orders@amul.coop",
    address: "Amul Dairy Road, Anand District",
    city: "Anand",
    state: "Gujarat",
    pincode: "388001",
    outstandingBalance: 7200,
    creditLimit: 200000,
    status: "Active",
    totalPurchases: 215000,
    pendingPaymentsCount: 1,
    createdAt: new Date(),
  },
];

export class SupplierRepository {
  async findAll(search?: string, status?: string): Promise<ISupplier[]> {
    try {
      const query: any = {};
      if (search) {
        query.$or = [
          { companyName: { $regex: search, $options: "i" } },
          { ownerName: { $regex: search, $options: "i" } },
          { gst: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ];
      }
      if (status) {
        query.status = status;
      }
      const dbSuppliers = await SupplierModel.find(query);
      if (dbSuppliers.length > 0) return dbSuppliers;
    } catch {}

    let filtered = mockSuppliers;
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (sup) =>
          sup.companyName.toLowerCase().includes(s) ||
          (sup.ownerName && sup.ownerName.toLowerCase().includes(s)) ||
          (sup.gst && sup.gst.toLowerCase().includes(s)) ||
          sup.phone.toLowerCase().includes(s)
      );
    }
    if (status) {
      filtered = filtered.filter((sup) => sup.status === status);
    }
    return filtered;
  }

  async findById(id: string): Promise<ISupplier | null> {
    try {
      const dbSupplier = await SupplierModel.findById(id);
      if (dbSupplier) return dbSupplier;
    } catch {}
    return mockSuppliers.find((s) => s.id === id) || null;
  }

  async create(data: Partial<ISupplier>, createdBy?: string): Promise<ISupplier> {
    try {
      const newSupplier = new SupplierModel({ ...data, createdBy });
      return await newSupplier.save();
    } catch {
      const mockNew: ISupplier = {
        id: `SUP-00${mockSuppliers.length + 1}`,
        companyName: data.companyName!,
        ownerName: data.ownerName,
        gst: data.gst,
        pan: data.pan,
        phone: data.phone!,
        email: data.email,
        address: data.address,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        outstandingBalance: data.outstandingBalance || 0,
        creditLimit: data.creditLimit || 500000,
        status: data.status || "Active",
        totalPurchases: 0,
        pendingPaymentsCount: 0,
        createdAt: new Date(),
      };
      mockSuppliers.unshift(mockNew);
      return mockNew;
    }
  }

  async update(id: string, updates: Partial<ISupplier>): Promise<ISupplier | null> {
    try {
      const dbSupplier = await SupplierModel.findByIdAndUpdate(id, updates, { new: true });
      if (dbSupplier) return dbSupplier;
    } catch {}
    const index = mockSuppliers.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockSuppliers[index] = { ...mockSuppliers[index], ...updates, updatedAt: new Date() };
      return mockSuppliers[index];
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await SupplierModel.findByIdAndDelete(id);
    } catch {}
    const index = mockSuppliers.findIndex((s) => s.id === id);
    if (index !== -1) {
      mockSuppliers.splice(index, 1);
    }
    return true;
  }
}

export const supplierRepository = new SupplierRepository();
