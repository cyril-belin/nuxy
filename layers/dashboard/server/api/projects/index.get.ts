import { defineEventHandler } from 'h3'

// Mock database in memory
const projects = [
    { id: 1, name: 'Projet Alpha', status: 'En cours', progress: 65, members: 4, createdAt: '2026-01-15' },
    { id: 2, name: 'Production Beta', status: 'Terminé', progress: 100, members: 2, createdAt: '2026-02-01' },
    { id: 3, name: 'Dev Stack', status: 'En attente', progress: 0, members: 6, createdAt: '2026-02-18' }
]

export default defineEventHandler(async (event) => {
    // Simuler un léger délai
    await new Promise(resolve => setTimeout(resolve, 300))
    return projects
})
