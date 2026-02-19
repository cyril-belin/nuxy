import type { UseFetchOptions } from 'nuxt/app'

export const useHttp = <T>(url: string, options: UseFetchOptions<T> = {}) => {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$fetch
    })
}
