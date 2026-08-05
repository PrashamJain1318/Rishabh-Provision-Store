import { SupplierModel, ISupplierDocument } from "./supplier.model";
import { ISupplier } from "./supplier.types";

const mockSuppliers: ISupplier[] = [
  {
    id: "SUP-001",
    companyName: "ITC Grocery Wholesalers Ltd",
    gst: "27AAACI1234A1Z5",
    email: "supply@itcgrocery.com",
    phone: "+919820011223",
    address: "Plot 42, MIDC Industrial Area",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    outstandingBalance: 45000,
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "SUP-002",
    companyName: "Adani Wilmar Edible Oils Supply",
    gst: "24AAACA5678B1Z2",
    email: "orders@adaniwilmar.in",
    phone: "+919879988776",
    address: "Adani House, Navrangpura",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380009",
    outstandingBalance: 125000,
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "SUP-003",
    companyName: "Amul Anand Dairy Union Co",
    gst: "24AAAAA9999C1Z9",
    email: "distributor@amul.coop",
    phone: "+919825098250",
    address: "Dairy Road, Anand",
    city: "Anand",
    state: "Gujarat",
    pincode: "388001",
    outstandingBalance: 18400,
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class SupplierRepository {
  async findAll(search?: string, status?: string): Promise<ISupplier[]> {
    try {
      const query: any = { isDeleted: false };
      if (search) {
        query.$or = [
          { companyName: { $regex: search, $options: "i" } },
          { gst: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
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
        (sp) =>
          sp.companyName.toLowerCase().includes(s) ||
          (sp.gst && sp.gst.toLowerCase().includes(s)) ||
          (sp.city && sp.city.toLowerCase().includes(s))
      );
    }
    if (status) {
      filtered = filtered.filter((sp) => sp.status === status);
    }
    return filtered;
  }

  async findById(id: string): Promise<ISupplier | null> {
    try {
      const dbSupplier = await SupplierModel.findById(id);
      if (dbSupplier) return dbSupplier;
    } catch {}
    return mockSuppliers.find((sp) => sp.id === id) || null;
  }

  async create(data: Partial<ISupplier>): Promise<ISupplier> {
    try {
      const newSupplier = new SupplierModel(data);
      return await newSupplier.save();
    } catch {
      const mockNew: ISupplier = {
        id: `SUP-00${mockSuppliers.length + 1}`,
        companyName: data.companyName!,
        gst: data.gst,
        email: data.email!,
        phone: data.phone!,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        outstandingBalance: data.outstandingBalance || 0,
        status: data.status || "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    const index = mockSuppliers.findIndex((sp) => sp.id === id);
    if (index !== -1) {
      mockSuppliers[index] = { ...mockSuppliers[index], ...updates, updatedAt: new Date() };
      return mockSuppliers[index];
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await SupplierModel.findByIdAndUpdate(id, { isDeleted: true });
    } catch {}
    const index = mockSuppliers.findIndex((sp) => sp.id === id);
    if (index !== -1) {
      mockSuppliers.splice(index, 1);
    }
    return true;
  }
}

export const supplierRepository = new SupplierRepository();
