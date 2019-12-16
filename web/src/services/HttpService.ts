import axios, {
    AxiosRequestConfig,
    AxiosResponse,
}                       from "axios"
import qs               from "qs"
import { config }       from "../config"
import { getAuthToken } from "../helpers"
import DataCacheService from "./DataCacheService"

export type HttpResponse = {
    body: {
        status: boolean,
        data: any,
        message: string
    },
    status: number,
    headers: AxiosResponse,
}

const Http = axios.create({
    baseURL: config.app.api_url,
})

const cache = new DataCacheService()

class HttpService {
    public async get(endpoint: string, params?: AxiosRequestConfig["params"], cachable: boolean = true): Promise<HttpResponse> {
        cachable = config.app.api_cache ? cachable : false

        const httpConfig: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params: params,
        }

        await this.setAuthHeaders()

        let response = {}

        const key = encodeURIComponent(endpoint + JSON.stringify(params))

        try {
            if (cachable && cache.has(key)) {
                response = cache.get(key)
            } else {
                response = await Http.get(endpoint, httpConfig)
                cache.set({key, value: response})
            }
        } catch (e) {
            this.onError(e)
        }

        return this.onSuccess(response as AxiosResponse)
    }

    public async post(endpoint: string, params: any = {}, processParams: boolean = false, contentType: string | null = null): Promise<HttpResponse> {
        let config = {
            headers: {
                "Content-Type": contentType || "application/json",
            },
        }

        await this.setAuthHeaders()

        let response = {}

        try {
            response = await Http.post(endpoint, processParams ? qs.stringify(params) : params, config)
        } catch (e) {
            this.onError(e)
        }

        return this.onSuccess(response as AxiosResponse)
    }

    public async patch(endpoint: string, params: any = {}, processParams: boolean = false, contentType: string | null = null): Promise<HttpResponse> {
        let config = {
            headers: {
                "Content-Type": contentType || "application/json",
            },
        }

        await this.setAuthHeaders()


        let response = {}

        try {
            response = await Http.patch(endpoint, processParams ? qs.stringify(params) : params, config)
        } catch (error) {
            this.onError(error)
        }

        return this.onSuccess(response as AxiosResponse)
    }

    public async put(endpoint: string, params: any = {}, processParams: boolean = false, contentType: string | null = null): Promise<HttpResponse> {
        let config = {
            headers: {
                "Content-Type": contentType || "application/json",
            },
        }

        await this.setAuthHeaders()

        let response = {}

        try {
            response = await Http.put(endpoint, processParams ? qs.stringify(params) : params, config)
        } catch (error) {
            this.onError(error)
        }

        return this.onSuccess(response as AxiosResponse)
    }

    public async delete(endpoint: string): Promise<HttpResponse> {
        await this.setAuthHeaders()

        let response = {}

        try {
            response = await Http.delete(endpoint)
        } catch (error) {
            this.onError(error)
        }

        return this.onSuccess(response as AxiosResponse)
    }

    public clearCache(): void {
        cache.clear()
    }

    private onError(error: any) {
        throw error
    }

    private onSuccess({data, status, headers}: AxiosResponse<any>): HttpResponse {
        return {
            body: data,
            status,
            headers,
        }
    }

    private async setAuthHeaders(): Promise<void> {
        const bearerToken = await getAuthToken()

        if (bearerToken) {
            Http.defaults.headers.common["Authorization"] = `Bearer ${bearerToken}`
        }
    }
}

export default (new HttpService())
