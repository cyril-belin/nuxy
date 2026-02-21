// setUserSession is available globally in Nitro with nuxt-auth-utils


// Mock user database
// In a real app, this would be a database query
const users = [
    {
        id: 1,
        email: 'user@example.com',
        password: 'password', // In a real app, do not store plain text passwords!
        name: 'User'
    }
]

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)

    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Invalid email or password'
        })
    }

    await setUserSession(event, {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    })

    return { loggedIn: true }
})
