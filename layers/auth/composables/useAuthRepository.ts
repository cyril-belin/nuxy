export const useAuthRepository = () => {
    const { loggedIn, user, session, clear } = useUserSession()

    return {
        loggedIn,
        user,
        session,
        logout: clear,
        fetchSession: useRequestFetch()
    }
}
