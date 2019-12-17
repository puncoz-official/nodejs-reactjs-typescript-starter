export interface OnChangeCallbackParams {
    name: string
    value: string
}

export type OnChangeCallback = (props: OnChangeCallbackParams) => void
