export interface IReportData {
  total: {
    numberOfOrders: number;
    totalSalesAmount: number;
    totalQuantitySold: number;
  }[];
  topProducts: {
    name: string;
    revenue: number;
    quantitySold: number;
    imageURL: string;
  }[];
  salesByUsers: {
    name: string;
    totalSpent: number;
    totalPurchases: number;
    totalUnits: number;
  }[];
  monthlySales: {
    _id: {
      year: number;
      month: number;
    };
    totalRevenue: number;
    totalQuantitySold: number;
  }[];
}
