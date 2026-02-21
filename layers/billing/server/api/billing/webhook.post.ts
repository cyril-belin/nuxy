import { defineEventHandler, readRawBody, createError } from 'h3'
import { useStripe } from '../../utils/stripe'

export default defineEventHandler(async (event) => {
    const stripe = useStripe()
    const runtimeConfig = useRuntimeConfig()
    const signature = getHeader(event, 'stripe-signature')

    if (!signature || !runtimeConfig.stripeWebhookSecret) {
        throw createError({
            statusCode: 400,
            message: 'Missing stripe signature or webhook secret'
        })
    }

    const body = await readRawBody(event)
    if (!body) {
        throw createError({
            statusCode: 400,
            message: 'Missing body'
        })
    }

    let stripeEvent
    try {
        stripeEvent = stripe.webhooks.constructEvent(
            body as any,
            signature as string,
            runtimeConfig.stripeWebhookSecret as string
        )
    } catch (err: any) {
        throw createError({
            statusCode: 400,
            message: `Webhook signature verification failed: ${err.message}`
        })
    }

    // Handle the event
    switch (stripeEvent.type) {
        case 'checkout.session.completed':
            const session = stripeEvent.data.object
            console.log('Checkout completed for session:', session.id)
            // Update user subscription status in DB
            break
        case 'customer.subscription.deleted':
            console.log('Subscription deleted')
            // Update user subscription status in DB
            break
        case 'customer.subscription.updated':
            console.log('Subscription updated')
            // Update user subscription status in DB
            break
        default:
            console.log(`Unhandled event type ${stripeEvent.type}`)
    }

    return { received: true }
})
