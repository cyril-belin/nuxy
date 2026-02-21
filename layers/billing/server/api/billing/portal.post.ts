import { defineEventHandler, createError } from 'h3'
import { useStripe } from '../../utils/stripe'

export default defineEventHandler(async (event) => {
    const { user } = await getUserSession(event)
    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Must be logged in'
        })
    }

    const stripe = useStripe()
    const runtimeConfig = useRuntimeConfig()

    // In a real app, retrieve the stripeCustomerId from DB
    // For this demo/mock phase, we might need to search for the customer by email if not found
    const customers = await stripe.customers.list({
        email: user.email as string,
        limit: 1
    })

    if (customers.data.length === 0) {
        throw createError({
            statusCode: 400,
            message: 'No billing account found. Please subscribe first.'
        })
    }

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customers.data[0].id,
        return_url: `${runtimeConfig.public.appOrigin || 'http://localhost:3000'}/dashboard/billing`,
    })

    return { url: portalSession.url }
})
