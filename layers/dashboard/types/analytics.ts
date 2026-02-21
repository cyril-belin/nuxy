
export interface AnalyticsStat {
    label: string
    value: string
    change: string
    changeType: 'increase' | 'decrease'
    icon: string
    color: string
    sparkline: number[]
}

export interface TrafficByDay {
    day: string
    visitors: number
    pageViews: number
}

export interface TopPage {
    path: string
    views: number
    avgTime: string
    bounceRate: number
}

export interface ConversionStep {
    stage: string
    count: number
    percentage: number
}

export interface DeviceStat {
    device: string
    percentage: number
    color: string
}

export interface ReferrerSource {
    source: string
    visitors: number
    trend: 'up' | 'down'
    icon: string
}

export interface AnalyticsData {
    overview: AnalyticsStat[]
    trafficByDay: TrafficByDay[]
    topPages: TopPage[]
    conversionFunnel: ConversionStep[]
    realtimeVisitors: number
    deviceBreakdown: DeviceStat[]
    referrerSources: ReferrerSource[]
    revenueByMonth: { month: string; amount: number }[]
}
