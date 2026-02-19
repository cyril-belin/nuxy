import { defineEventHandler } from 'h3'

export interface AnalyticsData {
    overview: {
        label: string
        value: string
        change: string
        changeType: 'increase' | 'decrease'
        icon: string
        color: string
        sparkline: number[]
    }[]
    trafficByDay: { day: string; visitors: number; pageViews: number }[]
    topPages: { path: string; views: number; avgTime: string; bounceRate: number }[]
    conversionFunnel: { stage: string; count: number; percentage: number }[]
    realtimeVisitors: number
    deviceBreakdown: { device: string; percentage: number; color: string }[]
    referrerSources: { source: string; visitors: number; trend: 'up' | 'down'; icon: string }[]
}

const data: AnalyticsData = {
    overview: [
        {
            label: 'Visiteurs',
            value: '24,891',
            change: '+18.2%',
            changeType: 'increase',
            icon: 'i-heroicons-eye',
            color: 'indigo',
            sparkline: [30, 45, 38, 52, 48, 60, 55, 70, 65, 78, 72, 85]
        },
        {
            label: 'Pages vues',
            value: '89,420',
            change: '+12.8%',
            changeType: 'increase',
            icon: 'i-heroicons-document-text',
            color: 'emerald',
            sparkline: [40, 55, 50, 65, 58, 72, 68, 80, 75, 88, 82, 92]
        },
        {
            label: 'Taux de rebond',
            value: '32.4%',
            change: '-5.1%',
            changeType: 'increase',
            icon: 'i-heroicons-arrow-uturn-left',
            color: 'amber',
            sparkline: [50, 48, 45, 42, 44, 40, 38, 36, 37, 35, 34, 32]
        },
        {
            label: 'Durée moyenne',
            value: '4m 32s',
            change: '+22.4%',
            changeType: 'increase',
            icon: 'i-heroicons-clock',
            color: 'purple',
            sparkline: [20, 25, 28, 35, 32, 40, 38, 45, 42, 50, 48, 55]
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
    realtimeVisitors: 147,
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
    ]
}

export default defineEventHandler(async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return data
})
