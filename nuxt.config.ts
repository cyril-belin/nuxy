import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: [
    './layers/base',
    './layers/auth',
    './layers/admin',
    './layers/billing',
    './layers/dashboard'
  ],

  modules: [
    '@nuxt/ui'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  experimental: {
    appManifest: false
  }
})

