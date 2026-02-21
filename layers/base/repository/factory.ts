
import type { NitroFetchRequest, $Fetch } from 'nitropack'

export class HttpFactory {
    private readonly $fetch: $Fetch

    constructor(fetcher: $Fetch) {
        this.$fetch = fetcher
    }

    /**
     * Generic request method
     */
    async call<T>(
        method: string,
        url: string,
        data?: any,
        extras: any = {}
    ): Promise<T> {
        return await this.$fetch(url as any, {
            method,
            body: data,
            ...extras,
        }) as T
    }

}
