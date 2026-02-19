<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Bonjour, {{ user?.name || 'Utilisateur' }} 👋</h1>
        <p class="text-gray-500 font-medium">Voici ce qu'il se passe sur votre compte aujourd'hui.</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton color="white" variant="outline" icon="i-heroicons-calendar" class="rounded-xl font-bold border-white/10 hover:bg-white/5">
          Derniers 30 jours
        </UButton>
        <UButton color="indigo" class="rounded-xl font-black shadow-lg shadow-indigo-500/20">
          Nouveau Projet
        </UButton>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" 
        class="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:bg-white/[0.08] transition-all hover:border-indigo-500/30 group">
        <div class="flex items-center justify-between mb-4">
          <div :class="`w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 ${stat.iconColor}`">
            <UIcon :name="stat.icon" class="w-6 h-6" />
          </div>
          <UBadge :color="stat.changeType === 'increase' ? 'emerald' : 'rose'" variant="subtle" class="rounded-full px-2 py-0.5 font-bold text-[10px]">
            {{ stat.change }}
          </UBadge>
        </div>
        <div class="text-2xl font-black text-white tracking-tight mb-1">{{ stat.value }}</div>
        <div class="text-xs text-gray-500 font-bold uppercase tracking-widest">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Charts & Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Activity Chart Placeholder -->
      <div class="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-lg font-black text-white tracking-tight">Activité du système</h3>
            <p class="text-xs text-gray-500 font-bold uppercase tracking-widest">Performances en temps réel</p>
          </div>
          <USelectMenu v-model="selectedProject" :options="['Projet Alpha', 'Production Beta', 'Dev Stack']" 
            class="w-40" :ui="{ trigger: 'bg-white/5 border-white/10 text-white rounded-xl font-bold' }" />
        </div>
        
        <!-- Mock Chart Visualization -->
        <div class="h-64 flex items-end gap-2 px-2">
          <div v-for="(val, i) in [40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60, 95]" :key="i"
            class="flex-1 bg-gradient-to-t from-indigo-600/20 to-indigo-400/80 rounded-t-lg transition-all duration-700 hover:to-purple-400 group-hover:scale-y-105"
            :style="{ height: `${val}%` }"
          >
            <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-md pointer-events-none">
              {{ val }}%
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">
          <span>Jan</span><span>Mar</span><span>Mai</span><span>Juil</span><span>Sep</span><span>Nov</span>
        </div>
      </div>

      <!-- Recent Transactions/Logs -->
      <div class="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-lg font-black text-white tracking-tight">Activités récentes</h3>
          <UButton variant="link" color="indigo" class="p-0 font-bold text-xs">Voir tout</UButton>
        </div>
        <div class="space-y-6">
          <div v-for="log in activities" :key="log.id" class="flex items-start gap-4 group cursor-pointer">
            <div :class="`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${log.bgColor}`">
              <UIcon :name="log.icon" :class="`w-5 h-5 ${log.iconColor}`" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-black text-white truncate group-hover:text-indigo-400 transition-colors">{{ log.title }}</div>
              <div class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{{ log.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions / Bottom Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <div v-for="action in quickActions" :key="action.title" 
        class="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer overflow-hidden relative">
          <div class="relative z-10">
            <h4 class="text-sm font-black text-white mb-1">{{ action.title }}</h4>
            <p class="text-[10px] text-gray-500 font-bold tracking-tight uppercase">{{ action.description }}</p>
          </div>
          <div class="relative z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
            <UIcon :name="action.icon" class="w-5 h-5" />
          </div>
          <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useUserSession()
const selectedProject = ref('Projet Alpha')

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const stats = [
  { label: 'Utilisateurs Actifs', value: '12,450', change: '+12.5%', changeType: 'increase', icon: 'i-heroicons-user-group', iconColor: 'text-indigo-400' },
  { label: 'Revenu Mensuel', value: '€45,210', change: '+8.2%', changeType: 'increase', icon: 'i-heroicons-banknotes', iconColor: 'text-emerald-400' },
  { label: 'Temps de Réponse', value: '45ms', change: '-4.1%', changeType: 'increase', icon: 'i-heroicons-bolt', iconColor: 'text-amber-400' },
  { label: 'Taux de Conversion', value: '3.2%', change: '+0.5%', changeType: 'increase', icon: 'i-heroicons-arrow-trending-up', iconColor: 'text-purple-400' }
]

const activities = [
  { id: 1, title: 'Nouveau déploiement réussi', time: 'Il y a 5 min', icon: 'i-heroicons-rocket-launch', iconColor: 'text-indigo-400', bgColor: 'bg-indigo-500/10' },
  { id: 2, title: 'Facture payée par Client XYZ', time: 'Il y a 42 min', icon: 'i-heroicons-credit-card', iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  { id: 3, title: 'Alerte de sécurité résolue', time: 'Il y a 2h', icon: 'i-heroicons-shield-check', iconColor: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  { id: 4, title: 'Nouvel utilisateur inscrit', time: 'Il y a 4h', icon: 'i-heroicons-user-plus', iconColor: 'text-purple-400', bgColor: 'bg-purple-500/10' }
]

const quickActions = [
  { title: 'Inviter un membre', description: 'Gérer les permissions', icon: 'i-heroicons-user-plus' },
  { title: 'Configuration API', description: 'Générer des clés', icon: 'i-heroicons-key' },
  { title: 'Nouveau Document', description: 'Base de connaissance', icon: 'i-heroicons-document-plus' }
]
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>
