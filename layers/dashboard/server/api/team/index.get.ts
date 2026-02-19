import { defineEventHandler } from 'h3'

export interface TeamMember {
    id: number
    name: string
    email: string
    role: string
    status: 'Actif' | 'Absent' | 'Occupé'
    avatar: string
    department: string
    joinedAt: string
    projectsCount: number
}

const members: TeamMember[] = [
    {
        id: 1,
        name: 'Camille Dupont',
        email: 'camille@nuxy.dev',
        role: 'Lead Developer',
        status: 'Actif',
        avatar: 'https://i.pravatar.cc/150?u=camille',
        department: 'Engineering',
        joinedAt: '2025-03-12',
        projectsCount: 5
    },
    {
        id: 2,
        name: 'Julien Morel',
        email: 'julien@nuxy.dev',
        role: 'Designer UI/UX',
        status: 'Actif',
        avatar: 'https://i.pravatar.cc/150?u=julien',
        department: 'Design',
        joinedAt: '2025-06-01',
        projectsCount: 3
    },
    {
        id: 3,
        name: 'Léa Martin',
        email: 'lea@nuxy.dev',
        role: 'Product Manager',
        status: 'Occupé',
        avatar: 'https://i.pravatar.cc/150?u=lea',
        department: 'Produit',
        joinedAt: '2025-01-20',
        projectsCount: 7
    },
    {
        id: 4,
        name: 'Thomas Bernard',
        email: 'thomas@nuxy.dev',
        role: 'Backend Developer',
        status: 'Absent',
        avatar: 'https://i.pravatar.cc/150?u=thomas',
        department: 'Engineering',
        joinedAt: '2025-09-10',
        projectsCount: 2
    },
    {
        id: 5,
        name: 'Sofia El Amrani',
        email: 'sofia@nuxy.dev',
        role: 'DevOps Engineer',
        status: 'Actif',
        avatar: 'https://i.pravatar.cc/150?u=sofia',
        department: 'Engineering',
        joinedAt: '2025-07-22',
        projectsCount: 4
    },
    {
        id: 6,
        name: 'Antoine Lefèvre',
        email: 'antoine@nuxy.dev',
        role: 'QA Engineer',
        status: 'Actif',
        avatar: 'https://i.pravatar.cc/150?u=antoine',
        department: 'Engineering',
        joinedAt: '2025-11-05',
        projectsCount: 3
    }
]

export default defineEventHandler(async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return members
})
