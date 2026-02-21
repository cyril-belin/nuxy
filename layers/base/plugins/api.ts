import { defineNuxtPlugin } from '#app'
import { AnalyticsModule } from '../../dashboard/repository/modules/analytics'

/**
 * Interface for our global API object
 */
export interface IApiInstance {
    analytics: AnalyticsModule
}

/**
 * Global type augmentation for Nuxt
 */
declare module '#app' {
    interface NuxtApp {
        $api: IApiInstance
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $api: IApiInstance
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    /**
     * Use Nuxt's $fetch with predefined options
     */
    const fetcher = $fetch.create({
        baseURL: '/'
    })

    /**
     * Initialize our modules
     */
    const modules: IApiInstance = {
        analytics: new AnalyticsModule(fetcher)
    }

    return {
        provide: {
            api: modules
        }
    }
})

