import { api } from "../lib/axios";

interface IOrdersByDate {
    _id: string | null;
    ordersPerDate: string;
}

export interface ISalesMetricsResponse {
    _id: string | null;
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByDate: IOrdersByDate[]
}

interface ISalesMetricsQueryParams {
    startDate?: string;
    endDate?: string;
}

export async function getSalesMetrics(queryParams: ISalesMetricsQueryParams) {
    try {
        const response = await api.get<ISalesMetricsResponse>('/dashboard/sales-metrics', {
            params: queryParams,
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching sales metrics:', error);
        throw error;
    }
}
