import { CategoryModel, ICategoryDocument } from "./category.model";
import { ICategory } from "./category.types";

const mockCategories: ICategory[] = [
  {
    id: "CAT-001",
    name: "Atta & Flours",
    slug: "atta",
    image: "https://images.unsplash.com/photo-1574323758207-f60101053e2c?w=150",
    icon: "wheat",
    description: "Chakki fresh wheat atta, maida, besan, and grain flours",
    status: "Active",
    itemsCount: 42,
    subcategories: [
      { id: "SUB-101", name: "Chakki Fresh Whole Wheat Atta", slug: "chakki-atta", itemsCount: 18 },
      { id: "SUB-102", name: "Multigrain Atta", slug: "multigrain-atta", itemsCount: 10 },
      { id: "SUB-103", name: "Maida & Fine Wheat Flour", slug: "maida", itemsCount: 8 },
      { id: "SUB-104", name: "Besan & Gram Flour", slug: "besan", itemsCount: 6 },
    ],
  },
  {
    id: "CAT-002",
    name: "Rice & Grains",
    slug: "rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150",
    icon: "grain",
    description: "Basmati rice, boiled rice, poha, and organic grains",
    status: "Active",
    itemsCount: 38,
    subcategories: [
      { id: "SUB-201", name: "Basmati Premium Rice", slug: "basmati-rice", itemsCount: 15 },
      { id: "SUB-202", name: "Brown Rice", slug: "brown-rice", itemsCount: 5 },
      { id: "SUB-203", name: "Sona Masoori Rice", slug: "sona-masoori", itemsCount: 10 },
      { id: "SUB-204", name: "Kolam Rice", slug: "kolam-rice", itemsCount: 4 },
      { id: "SUB-205", name: "Boiled Rice", slug: "boiled-rice", itemsCount: 4 },
    ],
  },
  {
    id: "CAT-003",
    name: "Edible Oils & Ghee",
    slug: "oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150",
    icon: "droplet",
    description: "Sunflower oil, mustard oil, cow ghee, and vanaspati",
    status: "Active",
    itemsCount: 29,
    subcategories: [
      { id: "SUB-301", name: "Mustard Oil (Kachi Ghani)", slug: "mustard-oil", itemsCount: 8 },
      { id: "SUB-302", name: "Sunflower Oil (Refined)", slug: "sunflower-oil", itemsCount: 9 },
      { id: "SUB-303", name: "Olive Oil (Extra Virgin)", slug: "olive-oil", itemsCount: 5 },
      { id: "SUB-304", name: "Groundnut Oil", slug: "groundnut-oil", itemsCount: 7 },
    ],
  },
  {
    id: "CAT-004",
    name: "Masala & Spices",
    slug: "masala",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150",
    icon: "flame",
    description: "Turmeric, chili powder, coriander, and blended spices",
    status: "Active",
    itemsCount: 75,
    subcategories: [
      { id: "SUB-401", name: "Whole Spices (Khada Masala)", slug: "whole-spices", itemsCount: 25 },
      { id: "SUB-402", name: "Powdered Ground Spices", slug: "powdered-spices", itemsCount: 30 },
      { id: "SUB-403", name: "Blended Garam & Biryani Masala", slug: "blended-masala", itemsCount: 20 },
    ],
  },
  {
    id: "CAT-005",
    name: "Dairy & Chilled",
    slug: "dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150",
    icon: "milk",
    description: "Fresh pouch milk, butter, paneer, and curd",
    status: "Active",
    itemsCount: 22,
    subcategories: [
      { id: "SUB-501", name: "Fresh Pouch Milk", slug: "fresh-milk", itemsCount: 6 },
      { id: "SUB-502", name: "Butter & Cheese Blocks", slug: "butter-cheese", itemsCount: 8 },
      { id: "SUB-503", name: "Fresh Paneer & Curd", slug: "paneer-curd", itemsCount: 8 },
    ],
  },
  {
    id: "CAT-006",
    name: "Fresh Vegetables",
    slug: "vegetables",
    image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=150",
    icon: "smile",
    description: "Farm-fresh onions, potatoes, tomatoes, and green leafy vegetables",
    status: "Active",
    itemsCount: 35,
    subcategories: [
      { id: "SUB-601", name: "Daily Vegetables (Onion/Potato)", slug: "daily-veggies", itemsCount: 15 },
      { id: "SUB-602", name: "Green Leafy Vegetables", slug: "leafy-veggies", itemsCount: 10 },
      { id: "SUB-603", name: "Exotic Vegetables", slug: "exotic-veggies", itemsCount: 10 },
    ],
  },
  {
    id: "CAT-007",
    name: "Fresh Fruits",
    slug: "fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=150",
    icon: "smile",
    description: "Fresh apples, bananas, oranges, and seasonal fruits",
    status: "Active",
    itemsCount: 28,
    subcategories: [
      { id: "SUB-701", name: "Seasonal Fruits", slug: "seasonal-fruits", itemsCount: 12 },
      { id: "SUB-702", name: "Imported Fruits", slug: "imported-fruits", itemsCount: 8 },
      { id: "SUB-703", name: "Citrus Fruits", slug: "citrus-fruits", itemsCount: 8 },
    ],
  },
  {
    id: "CAT-008",
    name: "Snacks & Biscuits",
    slug: "snacks",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=150",
    icon: "cookie",
    description: "Namkeen, potato chips, cream biscuits, and dry fruits",
    status: "Active",
    itemsCount: 88,
    subcategories: [
      { id: "SUB-801", name: "Namkeen & Bhujia Mixtures", slug: "namkeen", itemsCount: 35 },
      { id: "SUB-802", name: "Biscuits & Cookies", slug: "biscuits", itemsCount: 30 },
      { id: "SUB-803", name: "Potato Chips & Wafers", slug: "chips", itemsCount: 23 },
    ],
  },
  {
    id: "CAT-009",
    name: "Soft Drinks & Beverages",
    slug: "soft-drinks",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150",
    icon: "coffee",
    description: "Cold drinks, fruit juices, mineral water, and energy drinks",
    status: "Active",
    itemsCount: 45,
    subcategories: [
      { id: "SUB-901", name: "Carbonated Soft Drinks", slug: "cold-drinks", itemsCount: 20 },
      { id: "SUB-902", name: "Packaged Juices", slug: "juices", itemsCount: 15 },
      { id: "SUB-903", name: "Energy Drinks & Water", slug: "energy-water", itemsCount: 10 },
    ],
  },
  {
    id: "CAT-010",
    name: "Personal Care",
    slug: "personal-care",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150",
    icon: "sparkles",
    description: "Bathing soaps, shampoos, toothpastes, and skin care",
    status: "Active",
    itemsCount: 62,
    subcategories: [
      { id: "SUB-1001", name: "Soaps & Body Wash", slug: "soaps", itemsCount: 25 },
      { id: "SUB-1002", name: "Hair Care & Shampoos", slug: "shampoos", itemsCount: 20 },
      { id: "SUB-1003", name: "Oral Care & Toothpaste", slug: "oral-care", itemsCount: 17 },
    ],
  },
  {
    id: "CAT-011",
    name: "Cleaning & Household",
    slug: "cleaning",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=150",
    icon: "sparkles",
    description: "Detergent powders, dishwash bars, floor cleaners, and mops",
    status: "Active",
    itemsCount: 50,
    subcategories: [
      { id: "SUB-1101", name: "Detergent Powders & Liquids", slug: "detergent", itemsCount: 20 },
      { id: "SUB-1102", name: "Dishwash Bars & Liquids", slug: "dishwash", itemsCount: 15 },
      { id: "SUB-1103", name: "Floor & Toilet Cleaners", slug: "cleaners", itemsCount: 15 },
    ],
  },
  {
    id: "CAT-012",
    name: "Bakery & Bread",
    slug: "bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150",
    icon: "cookie",
    description: "Fresh brown bread, pav, buns, and packaged cakes",
    status: "Active",
    itemsCount: 19,
    subcategories: [
      { id: "SUB-1201", name: "Fresh Bread & Buns", slug: "bread-buns", itemsCount: 10 },
      { id: "SUB-1202", name: "Cakes & Muffins", slug: "cakes-muffins", itemsCount: 9 },
    ],
  },
  {
    id: "CAT-013",
    name: "Frozen Foods",
    slug: "frozen-foods",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150",
    icon: "sparkles",
    description: "Frozen green peas, french fries, veggie patties, and ice creams",
    status: "Active",
    itemsCount: 16,
    subcategories: [
      { id: "SUB-1301", name: "Frozen Veggies & Peas", slug: "frozen-veggies", itemsCount: 8 },
      { id: "SUB-1302", name: "Ready-to-Fry Snacks", slug: "ready-to-fry", itemsCount: 8 },
    ],
  },
];

export class CategoryRepository {
  async findAll(search?: string, status?: string): Promise<ICategory[]> {
    try {
      const query: any = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      if (status) {
        query.status = status;
      }
      const dbCategories = await CategoryModel.find(query);
      if (dbCategories.length > 0) return dbCategories;
    } catch {}

    let filtered = mockCategories;
    if (search) {
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (status) {
      filtered = filtered.filter((c) => c.status === status);
    }
    return filtered;
  }

  async findById(id: string): Promise<ICategory | null> {
    try {
      const dbCategory = await CategoryModel.findById(id);
      if (dbCategory) return dbCategory;
    } catch {}
    return mockCategories.find((c) => c.id === id || c.slug === id) || null;
  }

  async create(data: Partial<ICategory>): Promise<ICategory> {
    const slug = data.slug || data.name!.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    try {
      const newCategory = new CategoryModel({ ...data, slug });
      return await newCategory.save();
    } catch {
      const mockNew: ICategory = {
        id: `CAT-0${mockCategories.length + 1}`,
        name: data.name!,
        slug,
        image: data.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150",
        icon: data.icon || "layers",
        description: data.description,
        subcategories: data.subcategories || [],
        status: data.status || "Active",
        itemsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockCategories.unshift(mockNew);
      return mockNew;
    }
  }

  async update(id: string, updates: Partial<ICategory>): Promise<ICategory | null> {
    try {
      const dbCategory = await CategoryModel.findByIdAndUpdate(id, updates, { new: true });
      if (dbCategory) return dbCategory;
    } catch {}
    const index = mockCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockCategories[index] = { ...mockCategories[index], ...updates, updatedAt: new Date() };
      return mockCategories[index];
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await CategoryModel.findByIdAndDelete(id);
    } catch {}
    const index = mockCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockCategories.splice(index, 1);
    }
    return true;
  }
}

export const categoryRepository = new CategoryRepository();
