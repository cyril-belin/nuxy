// setUserSession is available globally in Nitro with nuxt-auth-utils


export default defineEventHandler(async (event) => {
    const { email, password, name } = await readBody(event)

    if (!email || !password || !name) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields'
        })
    }

    // In a real app, save the user to the database
    // const user = await createUser({ email, password, name })

    await setUserSession(event, {
        user: {
            id: Date.now(),
            email,
            name
        }
    })

    return { loggedIn: true }
})
