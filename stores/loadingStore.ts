import { create } from 'zustand'

type loadingTypes = {
    display: boolean,
    loadingMessage: string,
    status: 'default' | 'success' | 'error' | 'loading'
}
type loading = {
    loading: boolean,
    setLoading: (value: boolean) => void,
    actionLoading: {
        display: boolean,
        loadingMessage: string,
        status: 'default' | 'success' | 'error' | 'loading'
    },
    setActionLoadingState: ({ display, status, loadingMessage }: loadingTypes) => void,
    buttonLoading: boolean,
    setButtonLoading: (value: boolean) => void,
    searchLoading: boolean,
    setSearchLoading: (value: boolean) => void,
}
export const useLoading = create<loading>((set) => ({
    loading: false,
    setLoading: (value: boolean) => {
        set({ loading: value })
    },
    actionLoading: {
        display: false,
        loadingMessage: '',
        status: 'default'
    },
    setActionLoadingState: ({ display, status, loadingMessage }: loadingTypes) => {
        set({
            actionLoading: {
                display,
                status,
                loadingMessage,
            },
        });

        // Automatically reset for success or error after 10s
        if (status === "success" || status === "error") {
            setTimeout(() => {
                set({
                    actionLoading: {
                        display: false,
                        status: "default",
                        loadingMessage: "",
                    },
                });
            }, 3000);
        }
    },
    buttonLoading: false,
    setButtonLoading: (value: boolean) => {
        set({
            buttonLoading: value
        })
    },
    searchLoading: false,
    setSearchLoading: (value: boolean) => {
        set({
            searchLoading: value
        })
    }
}))