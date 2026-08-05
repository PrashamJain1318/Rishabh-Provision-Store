import { ProductModel, IProductDocument } from "./product.model";
import { IProduct } from "./product.types";

const mockProducts: IProduct[] = [
  {
    id: "PROD-001",
    name: "Aashirvaad Shudh Chakki Whole Wheat Atta 5kg",
    slug: "aashirvaad-shudh-chakki-whole-wheat-atta-5kg",
    sku: "ATT-AASH-5KG",
    barcode: "8901058000123",
    brand: "Aashirvaad",
    category: "Atta & Flours",
    subcategory: "Chakki Fresh Atta",
    supplier: "ITC Grocery Wholesalers Ltd",
    unit: "kg",
    description: "100% pure whole wheat flour milled from selected golden grains",
    purchasePrice: 210,
    sellingPrice: 245,
    mrp: 275,
    discount: 10.9,
    gst: 0,
    stock: 145,
    minimumStock: 20,
    maximumStock: 500,
    expiryDate: new Date("2026-11-30"),
    batchNumber: "BAT-ATT-2026A",
    images: ["https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=400"],
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "PROD-002",
    name: "Fortune Kachi Ghani Pure Mustard Oil 1L Pouch",
    slug: "fortune-kachi-ghani-pure-mustard-oil-1l-pouch",
    sku: "OIL-FORT-1L",
    barcode: "8906007280054",
    brand: "Fortune",
    category: "Edible Oils & Ghee",
    subcategory: "Mustard Oil",
    supplier: "Adani Wilmar Edible Oils Supply",
    unit: "L",
    description: "Traditional cold-pressed mustard oil with pungent aroma",
    purchasePrice: 128,
    sellingPrice: 142,
    mrp: 165,
    discount: 13.9,
    gst: 5,
    stock: 82,
    minimumStock: 15,
    maximumStock: 300,
    expiryDate: new Date("2027-02-28"),
    batchNumber: "BAT-OIL-2026B",
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"],
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "PROD-003",
    name: "Amul Pasteurised Pure Cow Butter 500g Pack",
    slug: "amul-pasteurised-pure-cow-butter-500g-pack",
    sku: "BUT-AMUL-500G",
    barcode: "8901262010052",
    brand: "Amul",
    category: "Dairy & Chilled",
    subcategory: "Butter & Cheese Blocks",
    supplier: "Amul Anand Dairy Union Co",
    unit: "pkt",
    description: "Utterly butterly delicious fresh pasteurised butter",
    purchasePrice: 240,
    sellingPrice: 275,
    mrp: 280,
    discount: 1.8,
    gst: 12,
    stock: 48,
    minimumStock: 10,
    maximumStock: 200,
    expiryDate: new Date("2026-09-15"),
    batchNumber: "BAT-AMUL-2026C",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"],
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "PROD-004",
    name: "Tata Salt Vacuum Evaporated Iodized Salt 1kg",
    slug: "tata-salt-vacuum-evaporated-iodized-salt-1kg",
    sku: "SLT-TATA-1KG",
    barcode: "8901058852310",
    brand: "Tata Consumer",
    category: "Masala & Spices",
    subcategory: "Powdered Ground Spices",
    supplier: "ITC Grocery Wholesalers Ltd",
    unit: "kg",
    description: "Desh ka namak - high purity iodized vacuum salt",
    purchasePrice: 22,
    sellingPrice: 27,
    mrp: 28,
    discount: 3.5,
    gst: 0,
    stock: 320,
    minimumStock: 50,
    maximumStock: 1000,
    expiryDate: new Date("2028-05-31"),
    batchNumber: "BAT-SLT-2026D",
    images: ["https://images.unsplash.com/photo-1563822249510-04678c78fa85?w=400"],
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class ProductRepository {
  async findAll(queryObj: any = {}): Promise<IProduct[]> {
    try {
      const dbProducts = await ProductModel.find().populate("category brand supplier");
      if (dbProducts.length > 0) return dbProducts;
    } catch {}

    let filtered = mockProducts;
    if (queryObj.search) {
      const s = queryObj.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.sku.toLowerCase().includes(s) ||
          (p.barcode && p.barcode.toLowerCase().includes(s))
      );
    }
    if (queryObj.category) {
      filtered = filtered.filter((p) => p.category === queryObj.category);
    }
    if (queryObj.brand) {
      filtered = filtered.filter((p) => p.brand === queryObj.brand);
    }
    if (queryObj.supplier) {
      filtered = filtered.filter((p) => p.supplier === queryObj.supplier);
    }
    if (queryObj.status) {
      filtered = filtered.filter((p) => p.status === queryObj.status);
    }
    return filtered;
  }

  async findById(id: string): Promise<IProduct | null> {
    try {
      const dbProduct = await ProductModel.findById(id).populate("category brand supplier");
      if (dbProduct) return dbProduct;
    } catch {}
    return mockProducts.find((p) => p.id === id || p.sku === id || p.barcode === id) || null;
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const slug = data.slug || data.name!.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    try {
      const newProduct = new ProductModel({ ...data, slug });
      return await newProduct.save();
    } catch {
      const mockNew: IProduct = {
        id: `PROD-00${mockProducts.length + 1}`,
        name: data.name!,
        slug,
        sku: data.sku!,
        barcode: data.barcode,
        brand: data.brand,
        category: data.category!,
        subcategory: data.subcategory,
        supplier: data.supplier,
        unit: data.unit!,
        description: data.description,
        purchasePrice: data.purchasePrice!,
        sellingPrice: data.sellingPrice!,
        mrp: data.mrp!,
        discount: data.discount || 0,
        gst: data.gst || 0,
        stock: data.stock || 0,
        minimumStock: data.minimumStock || 5,
        maximumStock: data.maximumStock || 500,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
        batchNumber: data.batchNumber,
        images: data.images && data.images.length > 0 ? data.images : ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"],
        status: data.status || "Active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockProducts.unshift(mockNew);
      return mockNew;
    }
  }

  async update(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    try {
      const dbProduct = await ProductModel.findByIdAndUpdate(id, updates, { new: true });
      if (dbProduct) return dbProduct;
    } catch {}
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...updates, updatedAt: new Date() };
      return mockProducts[index];
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await ProductModel.findByIdAndDelete(id);
    } catch {}
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
    return true;
  }
}

export const productRepository = new ProductRepository();
