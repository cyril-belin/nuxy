import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { z } from 'zod'

const updateSchema = z.object({
    name: z.string().min(1).optional(),
    status: z.string().optional(),
    progress: z.number().min(0).max(100).optional(),
    description: z.string().optional()
})

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const result = updateSchema.safeParse(body)
    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Données invalides : ' + result.error.message
        })
    }

    return {
        id,
        ...result.data,
        updatedAt: new Date().toISOString()
    }
})
