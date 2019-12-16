const localstorage = window.localStorage

class LocalStorageService {
    async set(key: string, value: string): Promise<void> {
        await new Promise(resolve => {
            localstorage.setItem(key, value)

            resolve()
        })
    }

    async setJson(key: string, json: any): Promise<void> {
        await this.set(key, JSON.stringify(json))
    }

    async get(key: string): Promise<string | null> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(localstorage.getItem(key))
            }, 0)
        })
    }

    async getJson(key: string): Promise<any> {
        const value = await this.get(key)
        if (!value) {
            return value
        }

        return JSON.parse(value)
    }

    async remove(key: string): Promise<void> {
        new Promise(resolve => {
            localstorage.removeItem(key)

            resolve()
        })
    }

    async removeAll(): Promise<void> {
        new Promise(resolve => {
            localstorage.clear()

            resolve()
        })
    }

    async getByIndex(index: number): Promise<any> {
        return new Promise(resolve => {
            resolve(localstorage.key(index))
        })
    }
}

export default (new LocalStorageService())
