export interface IAIQueryInput {
  prompt: string;
  context?: string;
}

export interface IAIQueryResponse {
  prompt: string;
  response: string;
  model: string;
  timestamp: string;
}

export interface IInventoryAdviceResponse {
  productsToReorder: Array<{ sku: string; name: string; currentStock: number; reorderQty: number; reason: string }>;
  deadStock: Array<{ sku: string; name: string; daysIdle: number; stockValue: number; action: string }>;
  fastMovingProducts: Array<{ sku: string; name: string; salesVelocity: string; stockoutRisk: string }>;
  expectedStockout: Array<{ sku: string; name: string; daysRemaining: number; estimatedStockoutDate: string }>;
  summary: string;
  rawAIInsight?: string;
}

export interface ISalesForecastResponse {
  next7DaysRevenue: number;
  next30DaysRevenue: number;
  topSellingCategories: Array<{ category: string; projectedGrowth: string; estimatedRevenue: number }>;
  predictedMonthlyTurnover: number;
  aiStrategicAdvice: string;
  confidenceScore: number;
}
