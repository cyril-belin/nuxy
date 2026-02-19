<template>
  <div class="bg-gray-950 min-h-screen font-sans text-gray-200 antialiased selection:bg-indigo-500 selection:text-white">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5 bg-gray-950/50">
      <UContainer class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <UIcon name="i-heroicons-bolt-solid" class="w-6 h-6 text-white" />
          </div>
          <span class="text-2xl font-black tracking-tighter text-white">NUXY</span>
        </NuxtLink>
        
        <div class="hidden md:flex items-center gap-10">
          <NuxtLink v-for="link in [
            { label: 'Features', href: '/#features' },
            { label: 'Pricing', href: '/#pricing' },
            { label: 'Showcase', href: '/#showcase' },
            { label: 'FAQ', href: '/#faq' }
          ]" :key="link.label" :to="link.href" class="text-sm font-semibold text-gray-400 hover:text-white transition-all hover:-translate-y-0.5">
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <template v-if="loggedIn">
            <UButton to="/dashboard" color="indigo" variant="solid" class="font-bold rounded-full px-6 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all text-white">
              Dashboard
            </UButton>
          </template>
          <template v-else>
            <UButton to="/login" variant="ghost" color="gray" class="hidden sm:flex font-bold">Log in</UButton>
            <UButton to="/signup" size="lg" color="indigo" variant="solid" class="font-bold rounded-full px-6 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all text-white">
              Get Started
            </UButton>
          </template>
        </div>
      </UContainer>
    </nav>

    <slot />

    <!-- Footer -->
    <footer class="py-20 border-t border-white/5 bg-gray-950">
      <UContainer>
        <div class="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div class="max-w-xs">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <UIcon name="i-heroicons-bolt-solid" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-black text-white">NUXY</span>
            </div>
            <p class="text-gray-500 font-medium leading-relaxed">Le framework SaaS par excellence pour Nuxt 3. Bâtissez plus vite, allez plus loin.</p>
          </div>
          
          <div v-for="group in [
            { title: 'Produit', links: ['Features', 'Pricing', 'Documentation', 'Showcase'] },
            { title: 'Compagnie', links: ['À propos', 'Blog', 'Carrières', 'Contact'] },
            { title: 'Légal', links: ['Confidentialité', 'Terms', 'Licence'] }
          ]" :key="group.title">
            <h4 class="text-xs font-black uppercase tracking-widest text-indigo-400 mb-6">{{ group.title }}</h4>
            <ul class="space-y-4">
              <li v-for="link in group.links" :key="link">
                <NuxtLink to="#" class="text-sm font-bold text-gray-500 hover:text-white transition-colors">{{ link }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-sm text-gray-500 font-bold tracking-widest uppercase">© 2026 NUXY LABS. TOUS DROITS RÉSERVÉS.</div>
          <div class="flex gap-6">
            <UButton v-for="social in ['i-simple-icons-x', 'i-simple-icons-github', 'i-simple-icons-discord']" :key="social" :icon="social" variant="ghost" color="gray" class="hover:text-indigo-400" />
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>
