import {
    get as getFromObject,
    has as hasInObject,
    set as setToObject,
} from "lodash"

class DataCacheService {
    private data: any = {}

    set({key, value}: { key: string, value: any }): void {
        setToObject(this.data, key, value)
    }

    has(key: string): boolean {
        return hasInObject(this.data, key)
    }

    get(key: string): any {
        return getFromObject(this.data, key)
    }

    clear(): void {
        this.data = {}
    }
}

export default DataCacheService
