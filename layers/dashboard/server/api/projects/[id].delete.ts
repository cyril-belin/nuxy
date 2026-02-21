import { defineEventHandler, createError, getRouterParam } from 'h3'

// In a real app, this would be imported from a shared db file
// For this boilerplate, we'll assume the client handles the confirmation
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID du projet manquant'
        })
    }

    // Process deletion logic here

    return {
        success: true,
        message: `Projet ${id} supprimé avec succès`
    }
})
