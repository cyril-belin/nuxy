import { HttpFactory } from '../../../base/repository/factory'
import type { AnalyticsData } from '../../types/analytics'

export class AnalyticsModule extends HttpFactory {
    private readonly RESOURCE = '/api/analytics'

    async getDashboardAnalytics(params?: any): Promise<AnalyticsData> {
        return await this.call<AnalyticsData>('GET', this.RESOURCE, null, { params })
    }

    // We can add more specific analytics methods here
    async getRealtimeVisitors(): Promise<number> {
        const data = await this.getDashboardAnalytics()
        return data.realtimeVisitors
    }
}
