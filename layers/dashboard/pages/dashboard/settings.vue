<template>
  <div class="space-y-8 animate-fade-in text-gray-200">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-white tracking-tight">Paramètres</h1>
        <p class="text-gray-500 font-medium">Gérez votre compte et vos préférences générales.</p>
      </div>
    </div>

    <!-- Tabs for separating settings sections -->
    <UTabs :items="tabItems" class="w-full">
      
      <!-- PROFILE TAB -->
      <template #profile>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div class="col-span-1">
            <h2 class="text-lg font-black text-white tracking-tight">Profil Public</h2>
            <p class="text-sm font-medium text-gray-500 mt-1">Ces informations seront affichées publiquement. Faites attention à ce que vous partagez.</p>
          </div>
          
          <div class="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div class="absolute -right-12 -top-12 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <UForm :schema="profileSchema" :state="profileState" @submit="onProfileSubmit" class="space-y-6 relative z-10">
              <UFormField label="Nom complet" name="name" class="font-bold">
                <UInput v-model="profileState.name" placeholder="John Doe" size="lg" />
              </UFormField>

              <UFormField label="Adresse Email" name="email" class="font-bold">
                <UInput v-model="profileState.email" type="email" placeholder="john@example.com" size="lg" />
              </UFormField>

              <div class="flex justify-end pt-4 border-t border-white/5">
                <UButton type="submit" color="indigo" class="rounded-xl font-black px-6 py-2.5">Enregistrer les modifications</UButton>
              </div>
            </UForm>
          </div>
        </div>
      </template>

      <!-- SECURITY TAB -->
      <template #security>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div class="col-span-1">
            <h2 class="text-lg font-black text-white tracking-tight">Sécurité du compte</h2>
            <p class="text-sm font-medium text-gray-500 mt-1">Gérez votre mot de passe et sécurisez l'accès à votre compte.</p>
          </div>

          <div class="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <UForm :schema="securitySchema" :state="securityState" @submit="onSecuritySubmit" class="space-y-6 relative z-10">
              <UFormField label="Mot de passe actuel" name="currentPassword" class="font-bold">
                <UInput v-model="securityState.currentPassword" type="password" placeholder="••••••••" size="lg" />
              </UFormField>

              <UFormField label="Nouveau mot de passe" name="newPassword" help="Doit faire au moins 8 caractères." class="font-bold">
                <UInput v-model="securityState.newPassword" type="password" placeholder="••••••••" size="lg" />
              </UFormField>

              <div class="flex justify-end pt-4 border-t border-white/5">
                <UButton type="submit" color="indigo" class="rounded-xl font-black px-6 py-2.5">Mettre à jour le mot de passe</UButton>
              </div>
            </UForm>
          </div>
        </div>
      </template>

      <!-- PREFERENCES TAB -->
      <template #preferences>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div class="col-span-1">
            <h2 class="text-lg font-black text-white tracking-tight">Préférences de notification</h2>
            <p class="text-sm font-medium text-gray-500 mt-1">Choisissez les communications que vous souhaitez recevoir de notre part.</p>
          </div>

          <div class="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div class="space-y-6 relative z-10">
              <!-- Switch 1 -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p class="font-bold text-white text-sm">Notifications par email</p>
                  <p class="text-xs font-medium text-gray-400 mt-1">Recevez des mises à jour sur l'activité de votre compte.</p>
                </div>
                <!-- Need to use UCheckbox or USwitch based on Nuxt UI standard. UToggle isn't standard, it's USwitch or UToggle in Nuxt UI v2 vs v3? 
                     Nuxt UI v3 uses USwitch for toggles. -->
                <USwitch v-model="preferencesState.emailNotifications" size="lg" />
              </div>

              <!-- Switch 2 -->
              <div class="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div>
                  <p class="font-bold text-white text-sm">Emails Marketing</p>
                  <p class="text-xs font-medium text-gray-400 mt-1">Recevez des emails promotionnels et des offres.</p>
                </div>
                <USwitch v-model="preferencesState.marketingEmails" size="lg" />
              </div>

              <div class="flex justify-end pt-4 border-t border-white/5">
                <UButton @click="savePreferences" color="indigo" class="rounded-xl font-black px-6 py-2.5">Sauvegarder les préférences</UButton>
              </div>
            </div>
          </div>
        </div>
      </template>
      
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'


definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// Access the globally auto-imported toast composable
const toast = useToast()

// Define Tab Items
const tabItems = [
  { label: 'Profil', icon: 'i-heroicons-user', slot: 'profile' },
  { label: 'Sécurité', icon: 'i-heroicons-lock-closed', slot: 'security' },
  { label: 'Préférences', icon: 'i-heroicons-adjustments-horizontal', slot: 'preferences' }
]

// 1. Profile State & Schema
const profileSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez entrer une adresse e-mail valide')
})
type ProfileSchema = z.output<typeof profileSchema>

const profileState = reactive<Partial<ProfileSchema>>({
  name: 'John Doe',
  email: 'john@example.com'
})

async function onProfileSubmit(event: FormSubmitEvent<ProfileSchema>) {
  // Simulating an API call to save data
  console.log('Saved Profile:', event.data)
  toast.add({ 
    title: 'Profil mis à jour', 
    description: 'Vos informations personnelles ont été enregistrées avec succès.', 
    color: 'emerald',
    icon: 'i-heroicons-check-circle'
  })
}

// 2. Security State & Schema
const securitySchema = z.object({
  currentPassword: z.string().min(8, 'Requis'),
  newPassword: z.string().min(8, 'Doit contenir au moins 8 caractères')
})
type SecuritySchema = z.output<typeof securitySchema>

const securityState = reactive<Partial<SecuritySchema>>({
  currentPassword: '',
  newPassword: ''
})

async function onSecuritySubmit(event: FormSubmitEvent<SecuritySchema>) {
  console.log('Password Data:', event.data)
  toast.add({ 
    title: 'Mot de passe mis à jour', 
    description: 'La sécurité de votre compte a été mise à jour.', 
    color: 'emerald',
    icon: 'i-heroicons-check-circle'
  })
}

// 3. Preferences State (No strict Zod schema needed for simple toggles)
const preferencesState = reactive({
  emailNotifications: true,
  marketingEmails: false
})

function savePreferences() {
  toast.add({ 
    title: 'Préférences sauvegardées', 
    description: 'Vos préférences de notification ont été mises à jour.', 
    color: 'emerald',
    icon: 'i-heroicons-check-circle'
  })
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
