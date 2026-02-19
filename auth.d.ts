declare module '#auth-utils' {
    interface User {
        id: number
        email: string
        name: string
        avatarUrl?: string
    }

    interface UserSession {
        // Add your own fields if needed
    }
}

export { }
