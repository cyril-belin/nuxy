export const useApi = () => {
    const { $fetch } = useNuxtApp()

    const projects = {
        async getAll() {
            return await ($fetch as any)('/api/projects')
        },
        async create(data: { name: string, description?: string }) {
            return await ($fetch as any)('/api/projects', {
                method: 'POST',
                body: data
            })
        }
    }

    const team = {
        async getAll() {
            return await ($fetch as any)('/api/team')
        },
        async invite(data: { name: string, email: string, role: string, department?: string }) {
            return await ($fetch as any)('/api/team', {
                method: 'POST',
                body: data
            })
        }
    }

    return {
        projects,
        team
    }
}
