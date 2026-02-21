<template>
  <div class="space-y-8 animate-fade-in text-gray-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Facturation</h1>
        <p class="text-gray-500 font-medium">Gérez votre abonnement et vos informations de paiement.</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton color="white" variant="outline" icon="i-heroicons-arrow-down-tray" class="rounded-xl font-bold border-white/10 hover:bg-white/5">
          Télécharger l'historique
        </UButton>
      </div>
    </div>

    <!-- Current Plan & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Current Plan Card -->
      <div class="col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-500/10 to-purple-600/5 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden group">
        <div class="absolute -right-12 -top-12 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-400/30 transition-colors"></div>
        <div class="flex justify-between items-start mb-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-indigo-400" />
              </div>
              <h3 class="text-xl font-black text-white tracking-tight">Forfait Pro</h3>
            </div>
            <p class="text-sm font-bold text-gray-400">Facturé mensuellement • Prochain prélèvement le 24 Mars 2026</p>
          </div>
          <UBadge color="indigo" variant="subtle" class="rounded-full px-3 py-1 font-black text-xs uppercase tracking-widest">
            Actif
          </UBadge>
        </div>

        <div class="flex items-baseline gap-1 mb-8">
          <span class="text-4xl font-black text-white tracking-tighter">€49</span>
          <span class="text-sm font-bold text-gray-500">/mois</span>
        </div>

        <div class="flex items-center gap-4 relative z-10">
          <UButton 
            color="indigo" 
            class="rounded-xl font-black shadow-lg shadow-indigo-500/20 px-6 py-2.5"
            :loading="isLoadingPortal"
            @click="manageSubscription"
          >
            Gérer l'abonnement
          </UButton>
          <UButton 
            color="white" 
            variant="ghost" 
            class="rounded-xl font-bold hover:bg-white/5"
          >
            Changer de forfait
          </UButton>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-black text-white tracking-tight">Moyen de paiement</h3>
            <UButton variant="link" color="indigo" class="p-0 font-bold text-xs" @click="manageSubscription">Modifier</UButton>
          </div>
          
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <div class="w-12 h-8 bg-gray-900 rounded flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
              <UIcon name="i-heroicons-credit-card" class="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <div class="text-sm font-black text-white tracking-widest">•••• •••• •••• 4242</div>
              <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expire 12/28</div>
            </div>
          </div>
        </div>

        <div class="mt-6 relative z-10">
          <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Adresse de facturation</div>
          <p class="text-sm font-medium text-gray-400">
            123 Avenue des Champs-Élysées<br>
            75008 Paris, France
          </p>
        </div>
      </div>
    </div>

    <!-- Usage Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="metric in usageMetrics" :key="metric.label"
        class="bg-white/5 border border-white/10 p-6 rounded-3xl transition-all hover:bg-white/[0.08] hover:border-indigo-500/30 group relative overflow-hidden">
        <div class="absolute right-0 top-0 w-32 h-32 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ metric.label }}</h4>
          <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/5" :class="metric.isWarning ? 'text-amber-400 border border-amber-500/20' : 'text-emerald-400 border border-emerald-500/20'">
            {{ metric.percentage }}%
          </span>
        </div>
        <div class="flex items-end justify-between mb-3 relative z-10">
          <span class="text-2xl font-black text-white tracking-tight">{{ metric.value }} <span class="text-sm font-bold text-gray-500">/ {{ metric.limit }}</span></span>
        </div>
        <div class="h-2 bg-white/5 rounded-full overflow-hidden relative z-10">
          <div 
            class="h-full rounded-full transition-all duration-1000 ease-out"
            :class="metric.isWarning ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'"
            :style="{ width: `${metric.percentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Billing History -->
    <div class="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-black text-white tracking-tight">Historique des factures</h3>
          <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Vos 4 derniers paiements</p>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/5">
              <th class="text-left text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 pr-4">Facture</th>
              <th class="text-left text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 px-4">Date</th>
              <th class="text-left text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 px-4">Statut</th>
              <th class="text-right text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 px-4">Montant</th>
              <th class="text-right text-[10px] font-black text-gray-500 uppercase tracking-widest py-3 pl-4">Reçu</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id"
              class="border-b border-white/[0.03] hover:bg-white/[0.05] transition-colors group cursor-pointer"
            >
              <td class="py-4 pr-4">
                <span class="text-sm font-bold text-white font-mono group-hover:text-indigo-400 transition-colors">{{ invoice.id }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-sm font-medium text-gray-400">{{ invoice.date }}</span>
              </td>
              <td class="py-4 px-4">
                <UBadge
                  :color="invoice.status === 'Payée' ? 'emerald' : 'amber'"
                  variant="subtle"
                  class="rounded-full px-2 py-0.5 font-bold text-[10px]"
                >
                  {{ invoice.status }}
                </UBadge>
              </td>
              <td class="text-right py-4 px-4">
                <span class="text-sm font-black text-white">{{ invoice.amount }}</span>
              </td>
              <td class="text-right py-4 pl-4">
                <UButton icon="i-heroicons-document-arrow-down" variant="ghost" color="gray" size="sm" class="hover:bg-white/10 hover:text-indigo-400 transition-colors" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from '../../../billing/composables/useSubscription'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { isLoading: isLoadingPortal, error: subscriptionError, subscribe, openPortal } = useSubscription()

const usageMetrics = [
  { label: 'Utilisateurs Actifs', value: '4', limit: '5', percentage: 80, isWarning: true },
  { label: 'Projets', value: '12', limit: '20', percentage: 60, isWarning: false },
  { label: 'Espace de Stockage', value: '45 Go', limit: '100 Go', percentage: 45, isWarning: false }
]

const invoices = [
  { id: 'INV-2026-004', date: '24 Fév 2026', status: 'Payée', amount: '€49.00' },
  { id: 'INV-2026-003', date: '24 Jan 2026', status: 'Payée', amount: '€49.00' },
  { id: 'INV-2026-002', date: '24 Déc 2025', status: 'Payée', amount: '€49.00' },
  { id: 'INV-2026-001', date: '24 Nov 2025', status: 'Payée', amount: '€49.00' }
]

const manageSubscription = async () => {
  await openPortal()
  if (subscriptionError.value) {
    // If portal fails (usually because no stripe customer exists yet), try to start a subscription
    await subscribe()
    if (subscriptionError.value) {
      useToast().add({
        title: 'Erreur',
        description: subscriptionError.value,
        color: 'red'
      })
    }
  }
}
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
