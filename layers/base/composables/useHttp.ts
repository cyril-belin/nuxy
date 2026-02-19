import type { UseFetchOptions } from 'nuxt/app'

import { useFetch, useNuxtApp } from '#imports'

export const useHttp = <T>(url: string, options: UseFetchOptions<T> = {}) => {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$fetch as any
    })
}
