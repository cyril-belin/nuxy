import { defineEventHandler, createError } from 'h3'
import { useStripe } from '../../utils/stripe'

export default defineEventHandler(async (event) => {
    const { user } = await getUserSession(event)
    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Must be logged in to subscribe'
        })
    }

    const stripe = useStripe()
    const runtimeConfig = useRuntimeConfig()

    // In a real app, you would fetch the stripeCustomerId from your database
    // For now, we simulate it. 
    // If your user model doesn't have it yet, you'd create one:
    // const customer = await stripe.customers.create({ email: user.email })

    // We'll use a session for checkout
    const session = await stripe.checkout.sessions.create({
        customer_email: user.email as string, // If no customer ID exists yet
        line_items: [
            {
                price: runtimeConfig.public.stripePriceId as string,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${runtimeConfig.public.appOrigin || 'http://localhost:3000'}/dashboard/billing?success=true`,
        cancel_url: `${runtimeConfig.public.appOrigin || 'http://localhost:3000'}/dashboard/billing?canceled=true`,
        metadata: {
            userId: user.id.toString()
        }
    })

    return { url: session.url }
})
