import { config }          from "../config"
import LocalStorageService from "../services/LocalStorageService"
import { RootState }       from "../stores/types"

export const getAuthToken = async (): Promise<string | null> => await LocalStorageService.get(config.app.authTokenKeyName)
export const setAuthToken = async (token: string): Promise<void> => {
    await LocalStorageService.set(config.app.authTokenKeyName, token)
}
export const clearAuthToken = async (): Promise<void> => {
    await LocalStorageService.remove(config.app.authTokenKeyName)
}

export const checkIfAuthenticated = (state: RootState): boolean => !!state.auth.token
