import Stripe from 'stripe'

export const useStripe = () => {
    const config = useRuntimeConfig()
    const secretKey = config.stripeSecretKey as string

    if (!secretKey) {
        throw new Error('STRIPE_SECRET_KEY is not defined')
    }

    return new Stripe(secretKey, {
        apiVersion: '2026-01-28.clover'
    })
}
