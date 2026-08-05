export interface SalesTrajectoryPoint {
  time: string;
  sales: number;
  orders: number;
}

export interface CategoryBreakdown {
  name: string;
  value: number;
  percentage: string;
}

export const mockSalesTrajectory: SalesTrajectoryPoint[] = [
  { time: "08:00 AM", sales: 1200, orders: 4 },
  { time: "10:00 AM", sales: 4500, orders: 15 },
  { time: "12:00 PM", sales: 9200, orders: 28 },
  { time: "02:00 PM", sales: 14800, orders: 42 },
  { time: "04:00 PM", sales: 19500, orders: 65 },
  { time: "06:00 PM", sales: 24850, orders: 88 },
];

export const mockCategoryBreakdown: CategoryBreakdown[] = [
  { name: "Atta & Flours", value: 145000, percentage: "30%" },
  { name: "Edible Oils", value: 112000, percentage: "23%" },
  { name: "Dairy & Chilled", value: 85000, percentage: "17.5%" },
  { name: "Snacks & Biscuits", value: 68000, percentage: "14%" },
  { name: "Personal Care", value: 42000, percentage: "8.6%" },
  { name: "Detergents", value: 33200, percentage: "6.9%" },
];

export const mockExecutiveKPIs = {
  monthlyTurnover: "₹ 4,85,200",
  todaysSales: "₹ 24,850",
  grossProfitEst: "₹ 4,920",
  khataDues: "₹ 12,400",
  lowStockCount: 5,
  activeCustomerCount: 1420,
};
