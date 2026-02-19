import { useUserSession, useRequestFetch } from '#imports'

export const useAuthRepository = () => {
    const { loggedIn, user, session, clear } = useUserSession()

    const login = async (body: any) => {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body
        })
        // Refresh session after login to update state
        await useUserSession().fetch()
    }

    const register = async (body: any) => {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body
        })
        await useUserSession().fetch()
    }

    return {
        loggedIn,
        user,
        session,
        clear,
        logout: clear,
        fetchSession: useRequestFetch(),
        login,
        register
    }
}
