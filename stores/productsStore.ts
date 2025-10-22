import { create } from 'zustand'
import { ProductsType } from '@/types/ProductsType'
import { useLoading } from './loadingStore'
type productStore = {
    productsData: ProductsType[],
    storeProductsData: (value: ProductsType[]) => void,
    removeProduct: (value: string) => void,
    editStocks: (pId: string, newStocks: number) => void,
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
            useLoading.getState().setActionLoadingState({ display: true, loadingMessage: 'Deleting Products! Please wait...' })
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
            useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
        } catch (err) {
            console.log('error deleting product')
            useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
        }

    },
    editStocks: async (pId: string, newStocks: number) => {
        const currentProducts = useProductsStore.getState().productsData
        const finalProducts = []
        try {
            useLoading.getState().setActionLoadingState({ display: true, loadingMessage: 'Updating Stocks! Please wait...' })
            const updateStocks = await fetch('/api/EditProductStocks', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product_id: pId, stocks: newStocks })
            })
            const response = await updateStocks.json()
            if (response.status != 500) {
                for (const item of currentProducts) {
                    if (item.product_id == pId) {
                        finalProducts.push({
                            id: item.id,
                            product_id: item.product_id,
                            category: item.category,
                            parent: item.parent,
                            product_name: item.product_name,
                            product_image: item.product_image,
                            price: item.price,
                            stocks: newStocks,
                            description: item.description,
                            brand: item.brand,
                            sales_count: item.sales_count,
                            created_at: item.created_at,
                            updated_at: item.updated_at
                        })
                    } else {
                        finalProducts.push(item)
                    }
                }
                set({
                    productsData: finalProducts,

                })

            } else {
                console.log('error updating stocks')
            }
            // query to database first then if success then run this logic that change the stocks in productsData
            //also add badge to the products that been updated
            useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
        } catch (err) {
            console.log('Something went wrong!')
            useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
        }

    }
}))