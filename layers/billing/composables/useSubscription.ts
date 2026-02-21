import { ref } from '#imports'

interface StripeResponse {
    url?: string
    message?: string
}

export const useSubscription = () => {
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const subscribe = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await $fetch<StripeResponse>('/api/billing/subscribe', {
                method: 'POST'
            })
            if (response.url) {
                window.location.href = response.url
            }
        } catch (err: any) {
            error.value = err.data?.message || 'Failed to start subscription process'
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    const openPortal = async () => {
        isLoading.value = true
        error.value = null
        try {
            const response = await $fetch<StripeResponse>('/api/billing/portal', {
                method: 'POST'
            })
            if (response.url) {
                window.location.href = response.url
            }
        } catch (err: any) {
            error.value = err.data?.message || 'Failed to open billing portal'
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        error,
        subscribe,
        openPortal
    }
}
