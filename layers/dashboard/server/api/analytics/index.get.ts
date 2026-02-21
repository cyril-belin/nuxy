import type { H3Event } from 'h3'
import type { AnalyticsData } from '../../../types/analytics'

export default defineCachedEventHandler(
    async (event: H3Event) => {
        // In a real app, you would fetch this from a database
        // Here we simulate some dynamic variations based on query params
        const query = getQuery(event)
        const range = (query.range as string) || '30j'

        // Helper to generate sparkline
        const genSparkline = (base: number, volatility: number) =>
            Array.from({ length: 12 }, () => Math.floor(base + (Math.random() - 0.5) * volatility))

        const data: AnalyticsData = {
            overview: [
                {
                    label: 'Visiteurs',
                    value: range === '7j' ? '5,420' : '24,891',
                    change: '+18.2%',
                    changeType: 'increase',
                    icon: 'i-heroicons-eye',
                    color: 'indigo',
                    sparkline: genSparkline(50, 40)
                },
                {
                    label: 'Pages vues',
                    value: range === '7j' ? '18,150' : '89,420',
                    change: '+12.8%',
                    changeType: 'increase',
                    icon: 'i-heroicons-document-text',
                    color: 'emerald',
                    sparkline: genSparkline(60, 50)
                },
                {
                    label: 'Taux de rebond',
                    value: '32.4%',
                    change: '-5.1%',
                    changeType: 'increase',
                    icon: 'i-heroicons-arrow-uturn-left',
                    color: 'amber',
                    sparkline: genSparkline(40, 20)
                },
                {
                    label: 'Durée moyenne',
                    value: '4m 32s',
                    change: '+22.4%',
                    changeType: 'increase',
                    icon: 'i-heroicons-clock',
                    color: 'purple',
                    sparkline: genSparkline(30, 30)
                }
            ],
            trafficByDay: [
                { day: 'Lun', visitors: 1842, pageViews: 5240 },
                { day: 'Mar', visitors: 2150, pageViews: 6120 },
                { day: 'Mer', visitors: 2480, pageViews: 7030 },
                { day: 'Jeu', visitors: 2230, pageViews: 6340 },
                { day: 'Ven', visitors: 2910, pageViews: 8150 },
                { day: 'Sam', visitors: 1650, pageViews: 4680 },
                { day: 'Dim', visitors: 1380, pageViews: 3920 }
            ],
            topPages: [
                { path: '/dashboard', views: 12450, avgTime: '3m 12s', bounceRate: 18 },
                { path: '/pricing', views: 8930, avgTime: '2m 45s', bounceRate: 42 },
                { path: '/docs/getting-started', views: 6720, avgTime: '5m 30s', bounceRate: 12 },
                { path: '/blog/nuxt-4-release', views: 5180, avgTime: '4m 18s', bounceRate: 28 },
                { path: '/features', views: 4290, avgTime: '2m 55s', bounceRate: 35 },
                { path: '/login', views: 3840, avgTime: '1m 20s', bounceRate: 55 }
            ],
            conversionFunnel: [
                { stage: 'Visiteurs', count: 24891, percentage: 100 },
                { stage: 'Inscription', count: 4210, percentage: 16.9 },
                { stage: 'Activation', count: 2850, percentage: 11.4 },
                { stage: 'Conversion', count: 892, percentage: 3.6 }
            ],
            realtimeVisitors: Math.floor(100 + Math.random() * 100),
            deviceBreakdown: [
                { device: 'Desktop', percentage: 58, color: 'indigo' },
                { device: 'Mobile', percentage: 34, color: 'emerald' },
                { device: 'Tablet', percentage: 8, color: 'amber' }
            ],
            referrerSources: [
                { source: 'Google Search', visitors: 9420, trend: 'up', icon: 'i-heroicons-magnifying-glass' },
                { source: 'Direct', visitors: 5830, trend: 'up', icon: 'i-heroicons-cursor-arrow-rays' },
                { source: 'Twitter / X', visitors: 3210, trend: 'down', icon: 'i-heroicons-chat-bubble-oval-left' },
                { source: 'GitHub', visitors: 2890, trend: 'up', icon: 'i-heroicons-code-bracket' },
                { source: 'LinkedIn', visitors: 1740, trend: 'up', icon: 'i-heroicons-briefcase' }
            ],
            revenueByMonth: [
                { month: 'Jan', amount: 12400 },
                { month: 'Fév', amount: 15600 },
                { month: 'Mar', amount: 14200 },
                { month: 'Avr', amount: 19800 },
                { month: 'Mai', amount: 22400 },
                { month: 'Juin', amount: 26100 }
            ]
        }

        return data
    },

    {
        maxAge: 60 * 5, // 5 minutes
        swr: true,
        group: 'api',
        name: 'analytics'
    }
)

