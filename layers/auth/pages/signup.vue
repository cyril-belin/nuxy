<template>
  <div class="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <!-- Background Accents -->
    <div class="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-lg aspect-square bg-purple-500/20 blur-[120px] rounded-full -translate-y-1/2"></div>
    
    <NuxtLink to="/" class="mb-12 group flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <UIcon name="i-heroicons-bolt-solid" class="w-6 h-6 text-white" />
      </div>
      <span class="text-2xl font-black text-white tracking-tighter">NUXY</span>
    </NuxtLink>

    <div class="w-full max-w-md">
      <div class="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative">
        <div class="text-center mb-10">
          <h1 class="text-3xl font-black text-white mb-2">Créer un compte</h1>
          <p class="text-gray-400 font-medium">Rejoignez la révolution Nuxt dès aujourd'hui.</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-6">
          <UFormGroup label="Nom complet" name="name" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UInput v-model="name" placeholder="John Doe" size="xl"
              icon="i-heroicons-user"
              color="white"
              variant="outline"
              class="rounded-xl"
              :ui="{ 
                base: 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-indigo-500',
                rounded: 'rounded-xl'
              }"
            />
          </UFormGroup>

          <UFormGroup label="Email" name="email" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UInput v-model="email" type="email" placeholder="nom@exemple.com" size="xl"
              icon="i-heroicons-envelope"
              color="white"
              variant="outline"
              class="rounded-xl"
              :ui="{ 
                base: 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-indigo-500',
                rounded: 'rounded-xl'
              }"
            />
          </UFormGroup>

          <UFormGroup label="Mot de passe" name="password" :ui="{ label: { base: 'text-gray-300 font-bold mb-2' } }">
            <UInput v-model="password" type="password" placeholder="••••••••" size="xl"
              icon="i-heroicons-lock-closed"
              color="white"
              variant="outline"
              class="rounded-xl"
              :ui="{ 
                base: 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-indigo-500',
                rounded: 'rounded-xl'
              }"
            />
          </UFormGroup>

          <UButton type="submit" size="xl" color="indigo" block :loading="loading" class="rounded-xl font-black py-4 shadow-lg shadow-indigo-500/20">
            Commencer l'aventure
          </UButton>
        </form>

        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/10"></div></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-[#030712] px-4 font-bold text-gray-500 tracking-widest">Ou s'inscrire avec</span></div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <UButton color="white" variant="outline" size="lg" icon="i-simple-icons-github" class="rounded-xl font-bold border-white/10 hover:bg-white/5">
            GitHub
          </UButton>
          <UButton color="white" variant="outline" size="lg" icon="i-simple-icons-google" class="rounded-xl font-bold border-white/10 hover:bg-white/5">
            Google
          </UButton>
        </div>
      </div>

      <p class="text-center mt-8 text-gray-400 font-medium">
        Déjà un compte ? 
        <NuxtLink to="/login" class="text-white font-black hover:text-indigo-400 transition-colors">Se connecter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const toast = useToast()
const { fetch: fetchSession } = useUserSession()

async function handleSignup() {
  loading.value = true
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value }
    })
    await fetchSession()
    toast.add({ title: 'Bienvenue !', description: 'Votre compte a été créé.', color: 'green' })
    navigateTo('/dashboard')
  } catch (err: any) {
    toast.add({ 
      title: 'Erreur', 
      description: err.data?.message || 'Une erreur est survenue lors de l\'inscription', 
      color: 'red' 
    })
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: false
})

useHead({
  title: 'Inscription - NUXY'
})
</script>
