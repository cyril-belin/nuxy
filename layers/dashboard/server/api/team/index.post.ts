import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name || !body.email || !body.role) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Le nom, l\'email et le rôle sont requis'
        })
    }

    const newMember = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        email: body.email,
        role: body.role,
        status: 'Actif' as const,
        avatar: `https://i.pravatar.cc/150?u=${body.email}`,
        department: body.department || 'Général',
        joinedAt: new Date().toISOString().split('T')[0],
        projectsCount: 0
    }

    return newMember
})
