<template>
  <div>
    <!-- Background Gradients (Local to Page if needed, or moved to layout) -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full"></div>
    </div>

    <main>
      <!-- Hero Section -->
      <section class="relative pt-20 pb-32 overflow-hidden">
        <UContainer>
          <div class="text-center max-w-4xl mx-auto mb-20">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md animate-fade-in text-indigo-400">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span class="text-xs font-bold tracking-widest uppercase">Nouvelle version 2.0 disponible</span>
            </div>
            
            <h1 class="text-6xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9] lg:leading-[0.85]">
              L'architecture <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">ultime pour Nuxt</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Le boilerplate SaaS qui fait 80% du travail pour vous. Auth, DB, Paiements et UI pré-configurés en 2 secondes.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <UButton size="xl" color="indigo" class="w-full sm:w-auto px-10 py-4 rounded-full font-black text-lg shadow-2xl shadow-indigo-500/30 hover:scale-105 transition-transform">
                Déployer maintenant
              </UButton>
              <UButton size="xl" variant="ghost" color="white" class="w-full sm:w-auto px-10 py-4 font-black text-lg hover:bg-white/5">
                Explorer la démo
              </UButton>
            </div>
          </div>

          <!-- Hero Image/Mockup -->
          <div class="relative group" id="showcase">
            <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div class="relative bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <img src="/img/dashboard.png" alt="Nuxy Dashboard" class="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              
              <!-- Floating UI Overlays -->
              <div class="absolute top-10 right-10 bg-gray-950/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl hidden lg:block transform hover:-translate-y-2 transition-transform">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div class="text-sm font-bold text-white">Structure prête</div>
                    <div class="text-xs text-gray-500">Layers configurés</div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-indigo-500 w-[95%]"></div>
                  </div>
                  <div class="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-[#6366f1]">Score de performance : 98/100</div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Stats Section -->
      <section class="py-20 border-y border-white/5 bg-white/[0.02]">
        <UContainer>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 text-white">
            <div v-for="stat in [
              { value: '10x', label: 'Plus rapide à coder' },
              { value: '2.4s', label: 'Temps de setup' },
              { value: '100%', label: 'Type-safe' },
              { value: '∞', label: 'Possibilités' }
            ]" :key="stat.label" class="text-center">
              <div class="text-4xl md:text-5xl font-black mb-2">{{ stat.value }}</div>
              <div class="text-sm font-bold tracking-widest uppercase text-gray-500">{{ stat.label }}</div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-32">
        <UContainer>
          <div class="max-w-3xl mx-auto text-center mb-24">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">Tout ce dont vous avez besoin</h2>
            <p class="text-xl text-gray-400 font-medium">Pourquoi réinventer la roue ? On s'occupe de la plomberie pour que vous puissiez créer de la valeur.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            <div v-for="feature in features" :key="feature.title" 
              class="group p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10">
              <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg ${feature.bgColor}`">
                <UIcon :name="feature.icon" :class="`w-7 h-7 ${feature.iconColor}`" />
              </div>
              <h3 class="text-xl font-black mb-3">{{ feature.title }}</h3>
              <p class="text-gray-400 font-medium leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="py-32 relative overflow-hidden">
        <UContainer>
          <div class="max-w-3xl mx-auto text-center mb-20 text-white">
            <h2 class="text-4xl md:text-6xl font-black mb-6">Prix transparent</h2>
            <p class="text-xl text-gray-400 font-medium">Payez une fois, possédez-le pour toujours. Mises à jour gratuites.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-white">
            <div v-for="plan in plans" :key="plan.name" 
              :class="`relative p-10 rounded-3xl border ${plan.popular ? 'border-indigo-500 bg-indigo-500/5 shadow-2xl shadow-indigo-500/20' : 'border-white/10 bg-white/5'}`">
              <div v-if="plan.popular" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                Le plus populaire
              </div>
              <div class="text-lg font-black mb-2">{{ plan.name }}</div>
              <div class="flex items-end gap-1 mb-8">
                <span class="text-4xl font-black">{{ plan.price }}</span>
                <span class="text-gray-500 font-bold mb-1">{{ plan.period }}</span>
              </div>
              <ul class="space-y-4 mb-10 text-sm font-medium text-gray-300">
                <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
                  <UIcon name="i-heroicons-check-circle-20-solid" class="w-5 h-5 text-indigo-500" />
                  {{ feature }}
                </li>
              </ul>
              <UButton :color="plan.popular ? 'indigo' : 'white'" :variant="plan.popular ? 'solid' : 'outline'" class="w-full rounded-2xl py-3 font-black">
                Choisir ce plan
              </UButton>
            </div>
          </div>
        </UContainer>
      </section>

       <!-- FAQ Section -->
       <section id="faq" class="py-32 bg-white/[0.02]">
        <UContainer>
            <div class="max-w-3xl mx-auto text-white">
                <h2 class="text-4xl font-black mb-12 text-center">Foire aux questions</h2>
                <UAccordion :items="faqItems" class="space-y-4" :ui="{
                    wrapper: 'flex flex-col gap-4',
                    item: {
                      base: 'px-6 py-4 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20',
                      label: 'text-left font-bold text-white text-lg',
                      content: 'text-gray-400 leading-relaxed font-medium pb-4'
                    }
                }" />
            </div>
        </UContainer>
       </section>

      <!-- Final CTA -->
      <section class="py-32">
        <UContainer>
          <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-12 md:p-24 text-center shadow-2xl shadow-indigo-500/20 text-white">
            <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none text-white"></div>
            <h2 class="text-4xl md:text-6xl font-black mb-8">Prêt à lancer votre prochain grand projet ?</h2>
            <p class="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium">Rejoignez plus de 2,000 développeurs qui bâtissent le futur du web avec Nuxy.</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
              <UButton size="xl" color="white" class="w-full sm:w-auto px-12 py-4 rounded-full font-black text-indigo-600 text-lg shadow-xl">
                Obtenir Nuxy maintenant
              </UButton>
              <span class="text-indigo-100 text-sm font-bold uppercase tracking-widest">Satisfait ou remboursé sous 30 jours</span>
            </div>
          </div>
        </UContainer>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Nuxy - Le Boilerplate SaaS Nuxt 3 pour les Pro',
  meta: [
    { name: 'description', content: 'Démarrez votre SaaS en un temps record avec l\'architecture Nuxt la plus performante du marché.' }
  ]
})

const features = [
  {
    title: 'Auth Multi-Provider',
    description: 'GitHub, Google, Apple et Email intégrés. Session management et redirection après login automatique.',
    icon: 'i-heroicons-shield-check',
    bgColor: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400'
  },
  {
    title: 'Database & ORM',
    description: 'Structure Prisma/Supabase avec migrations prêtes. Repository pattern pour une scalabilité infinie.',
    icon: 'i-heroicons-circle-stack',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Paiements Stripe',
    description: 'Webhooks, portail client, et abonnements récurrents déjà câblés. Gagnez de l\'argent immédiatement.',
    icon: 'i-heroicons-credit-card',
    bgColor: 'bg-pink-500/10',
    iconColor: 'text-pink-400'
  }
]

const plans = [
  {
    name: 'Starter',
    price: '0€',
    period: '/projet',
    features: ['Accès au repo initial', 'Nuxt UI & Tailwind', 'Documentation base', 'Forum communautaire'],
    popular: false
  },
  {
    name: 'Pro Pack',
    price: '149€',
    period: '/à vie',
    features: ['Tous les providers Auth', 'Workflow Stripe complet', 'Composants Dashboard pro', 'Support prioritaire 1an'],
    popular: true
  },
  {
    name: 'Entreprise',
    price: '999€',
    period: '/an',
    features: ['Licence illimitée', 'Accompagnement design', 'Audit de sécurité', 'Slack privé avec la team'],
    popular: false
  }
]

const faqItems = [
  { label: 'Puis-je utiliser Nuxy pour des projets commerciaux ?', content: 'Absolument ! Nuxy est conçu pour vous aider à lancer et monétiser vos propres produits SaaS ou ceux de vos clients.' },
  { label: 'Quelles versions de Nuxt sont supportées ?', content: 'Nous supportons toujours la dernière version stable de Nuxt 3. Les mises à jour mineures sont gratuites.' },
  { label: 'Le support est-il inclus ?', content: 'Oui, le plan Pro inclut un support par email et le plan Entreprise inclut un canal Slack dédié.' }
]
</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

html {
  scroll-behavior: smooth;
}
</style>
