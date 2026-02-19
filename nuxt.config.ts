export default defineNuxtConfig({
  extends: [
    './layers/base',
    './layers/auth',
    './layers/admin',
    './layers/billing'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
