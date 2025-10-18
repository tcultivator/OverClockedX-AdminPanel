import { create } from 'zustand'


type loading = {
    loading: boolean,
    setLoading: (value: boolean) => void,
}
export const useLoading = create<loading>((set) => ({
    loading: false,
    setLoading: (value: boolean) => {
        set({ loading: value })
    }
}))