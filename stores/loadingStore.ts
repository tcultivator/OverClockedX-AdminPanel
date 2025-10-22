import { create } from 'zustand'

type loadingTypes = {
    display: boolean,
    loadingMessage: string
}
type loading = {
    loading: boolean,
    setLoading: (value: boolean) => void,
    actionLoading: {
        display: boolean,
        loadingMessage: string
    },
    setActionLoadingState: ({ display, loadingMessage }: loadingTypes) => void,
}
export const useLoading = create<loading>((set) => ({
    loading: false,
    setLoading: (value: boolean) => {
        set({ loading: value })
    },
    actionLoading: {
        display: false,
        loadingMessage: ''
    },
    setActionLoadingState: ({ display, loadingMessage }: loadingTypes) => {
        set({
            actionLoading: { display: display, loadingMessage: loadingMessage }
        })
    }
}))