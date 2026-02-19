<template>
  <div class="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-indigo-500/30">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-gray-900/50 backdrop-blur-xl border-r border-white/5 z-50 hidden lg:flex flex-col">
      <div class="h-20 flex items-center px-6 border-b border-white/5">
        <NuxtLink to="/dashboard" class="flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <UIcon name="i-heroicons-bolt-solid" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-black text-white tracking-tighter">NUXY</span>
        </NuxtLink>
      </div>

      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        <div v-for="group in navGroups" :key="group.title">
          <div class="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{{ group.title }}</div>
          <div class="space-y-1">
            <ULink v-for="item in group.items" :key="item.label" :to="item.to" 
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all group"
              active-class="bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/10"
              inactive-class="text-gray-400 hover:text-white hover:bg-white/5"
            >
              <UIcon :name="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" />
              {{ item.label }}
            </ULink>
          </div>
          <div class="my-6 border-t border-white/5"></div>
        </div>
      </nav>

      <div class="p-4 border-t border-white/5">
        <div class="bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <UIcon name="i-heroicons-sparkles" class="w-12 h-12 text-indigo-400" />
          </div>
          <div class="text-xs font-black text-white mb-1">Passer à Pro</div>
          <p class="text-[10px] text-gray-500 font-bold mb-3 leading-tight">Débloquez toutes les fonctionnalités premium.</p>
          <UButton size="xs" color="indigo" block class="rounded-lg font-black tracking-tight">Upgrade</UButton>
        </div>
        
        <div class="mt-4 flex items-center gap-3 px-2 py-2">
          <UAvatar :src="user?.avatarUrl || ''" :alt="user?.name" size="sm" class="ring-2 ring-indigo-500/20" />
          <div class="flex-1 min-w-0">
            <div class="text-xs font-black text-white truncate">{{ user?.name || 'Utilisateur' }}</div>
            <div class="text-[10px] text-gray-500 font-bold truncate">{{ user?.email }}</div>
          </div>
          <UButton variant="ghost" color="gray" icon="i-heroicons-outline-logout" size="xs" @click="handleLogout" />
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Top Header -->
      <header class="sticky top-0 z-40 h-20 bg-gray-950/50 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UButton icon="i-heroicons-bars-3" variant="ghost" color="gray" class="lg:hidden" @click="mobileMenuOpen = true" />
          <div class="flex flex-col">
            <h2 class="text-lg font-black text-white tracking-tight">{{ currentPageTitle }}</h2>
            <div class="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              <span>Main</span>
              <UIcon name="i-heroicons-chevron-right" class="w-2 h-2" />
              <span class="text-indigo-400">{{ currentPageTitle }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-indigo-500/50 transition-colors group">
            <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-gray-500 group-focus-within:text-indigo-400" />
            <input type="text" placeholder="Rechercher..." class="bg-transparent border-none focus:ring-0 text-xs font-medium text-white placeholder-gray-500 w-48" />
            <kbd class="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-gray-500">⌘K</kbd>
          </div>
          
          <UChip :show="true" color="red" size="sm">
            <UButton icon="i-heroicons-bell" variant="ghost" color="gray" class="hover:bg-white/5" />
          </UChip>
          
          <div class="h-6 w-px bg-white/10 mx-1"></div>
          
          <UButton color="white" variant="outline" size="sm" class="rounded-full font-bold border-white/10 hover:bg-white/5 hidden sm:flex">
            Support
          </UButton>
        </div>
      </header>

      <!-- Page Area -->
      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay (Simplified) -->
    <USlideover v-model="mobileMenuOpen" side="left">
      <div class="p-6 h-full bg-gray-950 flex flex-col">
        <!-- Content identical to sidebar but inside slideover -->
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const mobileMenuOpen = ref(false)
const route = useRoute()

const navGroups = [
  {
    title: 'Général',
    items: [
      { label: 'Vue d\'ensemble', icon: 'i-heroicons-chart-bar', to: '/dashboard' },
      { label: 'Analytiques', icon: 'i-heroicons-presentation-chart-line', to: '/dashboard/analytics' },
      { label: 'Projets', icon: 'i-heroicons-folder', to: '/dashboard/projects' }
    ]
  },
  {
    title: 'Gestion',
    items: [
      { label: 'Équipe', icon: 'i-heroicons-users', to: '/dashboard/team' },
      { label: 'Facturation', icon: 'i-heroicons-credit-card', to: '/dashboard/billing' },
      { label: 'Paramètres', icon: 'i-heroicons-cog-6-tooth', to: '/dashboard/settings' }
    ]
  }
]

const currentPageTitle = computed(() => {
  const currentPath = route.path
  for (const group of navGroups) {
    const item = group.items.find(i => i.to === currentPath)
    if (item) return item.label
  }
  return 'Dashboard'
})

async function handleLogout() {
  await clear()
  navigateTo('/login')
}
</script>
