export interface MockProduct {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  unit: string;
  rating: number;
  image: string;
  inStock: boolean;
}

export const mockProducts: MockProduct[] = [
  {
    id: "PROD-001",
    code: "890103001001",
    name: "Aashirvaad Shuddh Chakki Atta (5kg)",
    category: "Atta & Flours",
    price: 245,
    mrp: 275,
    stock: 45,
    unit: "bag",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
  {
    id: "PROD-002",
    code: "890103002002",
    name: "Fortune Sunlite Sunflower Oil (1L)",
    category: "Edible Oils",
    price: 135,
    mrp: 155,
    stock: 8,
    unit: "pouch",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
  {
    id: "PROD-003",
    code: "890103003003",
    name: "Amul Butter Pasteurized (500g)",
    category: "Dairy & Chilled",
    price: 275,
    mrp: 275,
    stock: 18,
    unit: "pack",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
  {
    id: "PROD-004",
    code: "890103004004",
    name: "Tata Salt Vacuum Evaporated (1kg)",
    category: "Salt & Sugar",
    price: 28,
    mrp: 28,
    stock: 120,
    unit: "pkt",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518110168401-f2877ee2c088?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
  {
    id: "PROD-005",
    code: "890103005005",
    name: "Surf Excel Easy Wash Powder (1kg)",
    category: "Detergents",
    price: 140,
    mrp: 155,
    stock: 3,
    unit: "pkt",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
  {
    id: "PROD-006",
    code: "890103006006",
    name: "Mother Dairy Toned Milk (500ml)",
    category: "Dairy & Chilled",
    price: 27,
    mrp: 27,
    stock: 30,
    unit: "pkt",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80",
    inStock: true,
  },
];
