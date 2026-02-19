<template>
  <div class="space-y-8 animate-fade-in text-gray-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Analytiques</h1>
        <p class="text-gray-500 font-medium">Performances et métriques de votre plateforme.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <button v-for="range in dateRanges" :key="range.value"
            :class="[
              'px-4 py-2 text-xs font-bold transition-all',
              activeRange === range.value
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            ]"
            @click="activeRange = range.value"
          >
            {{ range.label }}
          </button>
        </div>
        <UButton color="white" variant="outline" icon="i-heroicons-arrow-down-tray" class="rounded-xl font-bold border-white/10 hover:bg-white/5">
          Export
        </UButton>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="h-40 bg-white/5 border border-white/10 rounded-3xl animate-pulse"></div>
      </div>
      <div class="h-80 bg-white/5 border border-white/10 rounded-3xl animate-pulse"></div>
    </div>

    <template v-else-if="analytics">
      <!-- Realtime Indicator -->
      <div class="flex items-center gap-3">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span class="text-xs font-bold text-gray-400">
          <span class="text-emerald-400 font-black">{{ analytics.realtimeVisitors }}</span> visiteurs en ce moment
        </span>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(stat, idx) in analytics.overview" :key="stat.label"
          class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] transition-all hover:border-indigo-500/30 group relative overflow-hidden"
          :style="{ animationDelay: `${idx * 80}ms` }"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ backgroundColor: colorStyles[stat.color].bg }">
              <UIcon :name="stat.icon" class="w-5 h-5" :style="{ color: colorStyles[stat.color].text }" />
            </div>
            <UBadge :color="stat.changeType === 'increase' ? 'emerald' : 'rose'" variant="subtle" class="rounded-full px-2 py-0.5 font-bold text-[10px]">
              {{ stat.change }}
            </UBadge>
          </div>
          <div class="text-2xl font-black text-white tracking-tight mb-1">{{ stat.value }}</div>
          <div class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{{ stat.label }}</div>

          <!-- Sparkline -->
          <div class="h-8 flex items-end gap-0.5">
            <div v-for="(val, i) in stat.sparkline" :key="i"
              class="flex-1 rounded-t-sm transition-all duration-500 sparkline-bar"
              :style="{ height: `${(val / Math.max(...stat.sparkline)) * 100}%`, transitionDelay: `${i * 30}ms`, backgroundColor: colorStyles[stat.color].sparkline, '--hover-bg': colorStyles[stat.color].sparklineHover }"
            ></div>
          </div>

          <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-indigo-500/5 transition-colors"></div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Traffic Chart -->
        <div class="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-lg font-black text-white tracking-tight">Trafic hebdomadaire</h3>
              <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Visiteurs & pages vues</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visiteurs</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-purple-500/50"></span>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pages vues</span>
              </div>
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="h-64 flex items-end gap-3 px-2">
            <div v-for="day in analytics.trafficByDay" :key="day.day"
              class="flex-1 flex flex-col items-center gap-1"
            >
              <div class="w-full flex gap-0.5 items-end justify-center" style="height: 220px;">
                <!-- Page Views (back layer) -->
                <div
                  class="w-full rounded-t-lg transition-all duration-500 cursor-pointer relative group/bar"
                  :style="{ height: `${(day.pageViews / maxPageViews) * 100}%`, backgroundColor: 'rgba(168,85,247,0.15)' }"
                >
                  <div class="opacity-0 group-hover/bar:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 border border-white/10 text-white text-[10px] font-black px-2.5 py-1 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                    {{ day.pageViews.toLocaleString('fr-FR') }} pages
                  </div>
                </div>
                <!-- Visitors (front layer) -->
                <div
                  class="w-full bg-gradient-to-t from-indigo-600/30 to-indigo-400/80 rounded-t-lg hover:to-purple-400 transition-all duration-500 cursor-pointer relative group/bar"
                  :style="{ height: `${(day.visitors / maxPageViews) * 100}%` }"
                >
                  <div class="opacity-0 group-hover/bar:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 border border-white/10 text-white text-[10px] font-black px-2.5 py-1 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                    {{ day.visitors.toLocaleString('fr-FR') }}
                  </div>
                </div>
              </div>
              <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">{{ day.day }}</span>
            </div>
          </div>
        </div>

        <!-- Conversion Funnel -->
        <div class="bg-white/5 border border-white/10 rounded-3xl p-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-lg font-black text-white tracking-tight">Entonnoir</h3>
              <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conversion</p>
            </div>
          </div>
          <div class="space-y-5">
            <div v-for="(step, i) in analytics.conversionFunnel" :key="step.stage" class="group">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span :class="[
                    'w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black',
                    i === 0 ? 'bg-indigo-500/20 text-indigo-400' :
                    i === 1 ? 'bg-purple-500/20 text-purple-400' :
                    i === 2 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  ]">
                    {{ i + 1 }}
                  </span>
                  <span class="text-sm font-bold text-white">{{ step.stage }}</span>
                </div>
                <span class="text-xs font-black text-gray-400">{{ step.count.toLocaleString('fr-FR') }}</span>
              </div>
              <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  :class="[
                    'h-full rounded-full transition-all duration-1000',
                    i === 0 ? 'bg-indigo-500' :
                    i === 1 ? 'bg-purple-500' :
                    i === 2 ? 'bg-amber-500' :
                    'bg-emerald-500'
                  ]"
                  :style="{ width: `${step.percentage}%` }"
                ></div>
              </div>
              <div class="text-[10px] font-bold text-gray-500 mt-1 text-right">{{ step.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Top Pages Table -->
        <div class="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-black text-white tracking-tight">Pages populaires</h3>
            <UButton variant="link" color="indigo" class="p-0 font-bold text-xs">Voir tout</UButton>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-white/5">
                  <th class="text-left text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 pr-4">Page</th>
                  <th class="text-right text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 px-4">Vues</th>
                  <th class="text-right text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 px-4">Durée</th>
                  <th class="text-right text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 pl-4">Rebond</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="page in analytics.topPages" :key="page.path"
                  class="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  <td class="py-4 pr-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                        <UIcon name="i-heroicons-document" class="w-4 h-4 text-indigo-400" />
                      </div>
                      <span class="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors font-mono">{{ page.path }}</span>
                    </div>
                  </td>
                  <td class="text-right py-4 px-4">
                    <span class="text-sm font-black text-white">{{ page.views.toLocaleString('fr-FR') }}</span>
                  </td>
                  <td class="text-right py-4 px-4">
                    <span class="text-sm font-bold text-gray-400">{{ page.avgTime }}</span>
                  </td>
                  <td class="text-right py-4 pl-4">
                    <UBadge
                      :color="page.bounceRate < 25 ? 'emerald' : page.bounceRate < 40 ? 'amber' : 'rose'"
                      variant="subtle"
                      class="rounded-full px-2 py-0.5 font-bold text-[10px]"
                    >
                      {{ page.bounceRate }}%
                    </UBadge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right Column: Devices + Sources -->
        <div class="space-y-8">
          <!-- Device Breakdown -->
          <div class="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 class="text-lg font-black text-white tracking-tight mb-6">Appareils</h3>
            <div class="space-y-5">
              <div v-for="device in analytics.deviceBreakdown" :key="device.device">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <UIcon
                      :name="device.device === 'Desktop' ? 'i-heroicons-computer-desktop' : device.device === 'Mobile' ? 'i-heroicons-device-phone-mobile' : 'i-heroicons-device-tablet'"
                      class="w-4 h-4"
                      :style="{ color: colorStyles[device.color].text }"
                    />
                    <span class="text-sm font-bold text-white">{{ device.device }}</span>
                  </div>
                  <span class="text-sm font-black text-white">{{ device.percentage }}%</span>
                </div>
                <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-1000"
                    :style="{ width: `${device.percentage}%`, backgroundColor: colorStyles[device.color].bar }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Referrer Sources -->
          <div class="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 class="text-lg font-black text-white tracking-tight mb-6">Sources</h3>
            <div class="space-y-4">
              <div v-for="ref in analytics.referrerSources" :key="ref.source"
                class="flex items-center gap-4 group cursor-pointer"
              >
                <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                  <UIcon :name="ref.icon" class="w-4 h-4 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{{ ref.source }}</div>
                  <div class="text-[10px] text-gray-500 font-bold">{{ ref.visitors.toLocaleString('fr-FR') }} visiteurs</div>
                </div>
                <UIcon
                  :name="ref.trend === 'up' ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'"
                  :class="ref.trend === 'up' ? 'w-4 h-4 text-emerald-400' : 'w-4 h-4 text-rose-400'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface AnalyticsStat {
  label: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: string
  color: string
  sparkline: number[]
}

interface AnalyticsData {
  overview: AnalyticsStat[]
  trafficByDay: { day: string; visitors: number; pageViews: number }[]
  topPages: { path: string; views: number; avgTime: string; bounceRate: number }[]
  conversionFunnel: { stage: string; count: number; percentage: number }[]
  realtimeVisitors: number
  deviceBreakdown: { device: string; percentage: number; color: string }[]
  referrerSources: { source: string; visitors: number; trend: 'up' | 'down'; icon: string }[]
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const activeRange = ref('30j')

const dateRanges = [
  { label: '7j', value: '7j' },
  { label: '30j', value: '30j' },
  { label: '90j', value: '90j' },
  { label: '12m', value: '12m' }
]

const { data: analytics, pending } = useFetch<AnalyticsData>('/api/analytics')

const colorStyles: Record<string, { bg: string; text: string; sparkline: string; sparklineHover: string; bar: string; iconBg: string }> = {
  indigo:  { bg: 'rgba(99,102,241,0.1)',  text: '#818cf8', sparkline: 'rgba(99,102,241,0.3)',  sparklineHover: 'rgba(99,102,241,0.5)',  bar: '#6366f1', iconBg: 'rgba(99,102,241,0.1)' },
  emerald: { bg: 'rgba(16,185,129,0.1)',  text: '#34d399', sparkline: 'rgba(16,185,129,0.3)',  sparklineHover: 'rgba(16,185,129,0.5)',  bar: '#10b981', iconBg: 'rgba(16,185,129,0.1)' },
  amber:   { bg: 'rgba(245,158,11,0.1)',  text: '#fbbf24', sparkline: 'rgba(245,158,11,0.3)',  sparklineHover: 'rgba(245,158,11,0.5)',  bar: '#f59e0b', iconBg: 'rgba(245,158,11,0.1)' },
  purple:  { bg: 'rgba(168,85,247,0.1)',  text: '#c084fc', sparkline: 'rgba(168,85,247,0.3)',  sparklineHover: 'rgba(168,85,247,0.5)',  bar: '#a855f7', iconBg: 'rgba(168,85,247,0.1)' }
}

const maxPageViews = computed(() => {
  if (!analytics.value) return 1
  return Math.max(...analytics.value.trafficByDay.map((d: { pageViews: number }) => d.pageViews))
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.sparkline-bar:hover {
  background-color: var(--hover-bg) !important;
}

.group:hover .sparkline-bar {
  background-color: var(--hover-bg) !important;
}
</style>
