import { create } from 'zustand'

type Props = {
    currentPage: number,
    totalPage: number
}
type pagination = {
    totalPage: number[],
    pagintionDisplayWindow: number[]
    setTotalPage: ({ currentPage, totalPage }: Props) => void,

    currentPage: number,
    setCurrentPage: (value: number) => void,
}

export const usePaginationStore = create<pagination>((set) => ({
    totalPage: [],
    pagintionDisplayWindow: [],
    setTotalPage: ({ currentPage, totalPage }: Props) => {
        
        
        const arr: number[] = []

        for (let index = 1; index <= totalPage; index++) {
            arr.push(index)
        }
        if (currentPage < arr[arr.length - 1] && currentPage != 1) {
            set({
                totalPage: arr,
                pagintionDisplayWindow: arr.slice(currentPage - 2, (currentPage - 2) + 3)
            })

        }
        if (currentPage == 1) {
            set({
                totalPage: arr,
                pagintionDisplayWindow: arr.slice(currentPage - 1, (currentPage - 1) + 3)
            })

        }
        if (currentPage == arr[arr.length - 1]) {
            set({
                totalPage: arr,
                pagintionDisplayWindow: arr.slice(currentPage - 3, (currentPage - 3) + 3)
            })
        }


    },
    currentPage: 1,
    setCurrentPage: (value: number) => {
        
        set({
            currentPage: value
        })
    }
}))