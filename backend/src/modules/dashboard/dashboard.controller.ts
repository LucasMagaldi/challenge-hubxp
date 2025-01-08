import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('sales-metrics')
  async getSalesMetrics(
    @Query('categoryIds') categoryIds?: string | string[],
    @Query('productIds') productIds?: string | string[],
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.dashboardService.getSalesMetrics(
      Array.isArray(categoryIds) ? categoryIds : categoryIds?.split(','),
      Array.isArray(productIds) ? productIds : productIds?.split(','),
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
