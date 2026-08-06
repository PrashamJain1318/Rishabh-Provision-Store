import { ProductModel, IProductDocument } from "./product.model";
import { IProduct } from "./product.types";

export class ProductRepository {
  async findAll(queryObj: any = {}): Promise<IProduct[]> {
    const filterQuery: any = {};

    if (queryObj.search) {
      const s = queryObj.search.trim();
      filterQuery.$or = [
        { name: { $regex: s, $options: "i" } },
        { sku: { $regex: s, $options: "i" } },
        { barcode: { $regex: s, $options: "i" } },
      ];
    }

    if (queryObj.category && queryObj.category !== "All") filterQuery.category = queryObj.category;
    if (queryObj.brand && queryObj.brand !== "All") filterQuery.brand = queryObj.brand;
    if (queryObj.supplier && queryObj.supplier !== "All") filterQuery.supplier = queryObj.supplier;
    if (queryObj.status && queryObj.status !== "All") filterQuery.status = queryObj.status;
    if (queryObj.gst && queryObj.gst !== "All") filterQuery.gst = parseInt(queryObj.gst);

    if (queryObj.minPrice || queryObj.maxPrice) {
      filterQuery.sellingPrice = {};
      if (queryObj.minPrice) filterQuery.sellingPrice.$gte = parseFloat(queryObj.minPrice);
      if (queryObj.maxPrice) filterQuery.sellingPrice.$lte = parseFloat(queryObj.maxPrice);
    }

    if (queryObj.stockStatus && queryObj.stockStatus !== "All") {
      if (queryObj.stockStatus === "in_stock") filterQuery.stock = { $gt: 10 };
      if (queryObj.stockStatus === "low_stock") filterQuery.stock = { $gt: 0, $lte: 10 };
      if (queryObj.stockStatus === "out_of_stock") filterQuery.stock = 0;
    }

    return await ProductModel.find(filterQuery);
  }

  async findById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id);
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const slug = data.slug || (data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `product-${Date.now()}`);
    const newProduct = new ProductModel({ ...data, slug });
    return await newProduct.save();
  }

  async update(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }
}

export const productRepository = new ProductRepository();
