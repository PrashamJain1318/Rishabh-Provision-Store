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
  },
  {
    id: "CAT-005",
    name: "Beverages & Tea",
    slug: "beverages",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150",
    icon: "coffee",
    description: "Assam tea bags, instant coffee, juices, and health drinks",
    status: "Active",
    itemsCount: 54,
  },
  {
    id: "CAT-006",
    name: "Snacks & Biscuits",
    slug: "snacks",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=150",
    icon: "cookie",
    description: "Namkeen, potato chips, cream biscuits, and dry fruits",
    status: "Active",
    itemsCount: 88,
  },
  {
    id: "CAT-007",
    name: "Dairy & Chilled",
    slug: "dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150",
    icon: "milk",
    description: "Fresh pouch milk, butter, paneer, and curd",
    status: "Active",
    itemsCount: 22,
  },
  {
    id: "CAT-008",
    name: "Personal Care",
    slug: "personal-care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150",
    icon: "smile",
    description: "Bathing soaps, shampoos, toothpaste, and skin creams",
    status: "Active",
    itemsCount: 63,
  },
  {
    id: "CAT-009",
    name: "Cleaning & Household",
    slug: "cleaning",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=150",
    icon: "sparkles",
    description: "Detergent powders, floor cleaners, and dishwash bars",
    status: "Active",
    itemsCount: 47,
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
