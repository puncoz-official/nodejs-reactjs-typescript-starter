export interface User {
    id: string
    email: string
    username: string
    display_name: string
}

export interface AuthState {
    user: User,
    token: string,
}

export const SET_USER = "auth/SET_USER"
export const CLEAR_USER = "auth/CLEAR_USER"
export const SET_TOKEN = "auth/SET_TOKEN"
