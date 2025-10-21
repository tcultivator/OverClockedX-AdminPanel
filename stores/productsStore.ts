import { create } from 'zustand'
import { ProductsType } from '@/types/ProductsType'
import { useLoading } from './loadingStore'
type productStore = {
    productsData: ProductsType[],
    storeProductsData: (value: ProductsType[]) => void,
    removeProduct: (value: string) => void,
}
export const useProductsStore = create<productStore>((set) => ({
    productsData: [],
    storeProductsData: (value: ProductsType[]) => {
        console.log('eto ung value sa store: ', value)
        set({
            productsData: value
        })
    },
    removeProduct: async (value: string) => {
        const currentProducts = useProductsStore.getState().productsData
        try {
            const remove = await fetch('/api/removeProducts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product_id: value })
            })
            const data = await remove.json()
            if (data.status !== 500) {
                set({
                    productsData: currentProducts.filter(items => items.product_id != value)
                })
            }

        } catch (err) {
            console.log('error deleting product')
        }

    }
}))