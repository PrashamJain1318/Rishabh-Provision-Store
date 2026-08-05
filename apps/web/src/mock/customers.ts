export interface MockCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  creditLimit: number;
  dueBalance: number;
  status: "Active" | "Cleared" | "Overdue";
  lastPurchaseDate: string;
}

export const mockCustomers: MockCustomer[] = [
  {
    id: "CUST-101",
    name: "Ramesh Kumar",
    phone: "+91 98250 11223",
    email: "ramesh.k@gmail.com",
    creditLimit: 5000,
    dueBalance: 1250,
    status: "Active",
    lastPurchaseDate: "Today, 11:20 AM",
  },
  {
    id: "CUST-102",
    name: "Sita Sharma",
    phone: "+91 97123 44556",
    email: "sita.sharma@yahoo.com",
    creditLimit: 3000,
    dueBalance: 0,
    status: "Cleared",
    lastPurchaseDate: "Yesterday, 04:45 PM",
  },
  {
    id: "CUST-103",
    name: "Vikram Singh",
    phone: "+91 99887 66554",
    email: "vikram.s@hotmail.com",
    creditLimit: 10000,
    dueBalance: 4800,
    status: "Overdue",
    lastPurchaseDate: "28 Jul 2026",
  },
  {
    id: "CUST-104",
    name: "Anjali Patel",
    phone: "+91 98980 33445",
    creditLimit: 2000,
    dueBalance: 450,
    status: "Active",
    lastPurchaseDate: "02 Aug 2026",
  },
];
