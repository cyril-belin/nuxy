export default defineNuxtConfig({
    runtimeConfig: {
        stripeSecretKey: process.env.STRIPE_SECRET_KEY,
        stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        public: {
            stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            stripePriceId: process.env.STRIPE_PRICE_ID,
            appOrigin: process.env.NUXT_PUBLIC_APP_ORIGIN || 'http://localhost:3000'
        }
    }
})
