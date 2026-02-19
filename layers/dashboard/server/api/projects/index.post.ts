import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Le nom du projet est requis'
        })
    }

    // En production, on enregistrerait dans une base de données
    const newProject = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        status: 'En cours',
        progress: 0,
        members: 1,
        createdAt: new Date().toISOString().split('T')[0]
    }

    return newProject
})
