import { create } from 'zustand'
import { ProductsType } from '@/types/ProductsType'
import { useLoading } from './loadingStore'
import { parentClasses } from '@/utils/ParentClasses'
import { formatDateYYYYMMDD } from '@/utils/getCurrentDateFunction'
type productStore = {
    productsData: ProductsType[],
    storeProductsData: (value: ProductsType[]) => void,
    removeProduct: (value: string) => void,
    editStocks: (pId: string, newStocks: number) => void,
    updateProductsDetails: (value: ProductsType) => void,
    addProductsToDatabase: (value: ProductsTypes) => void,

}
import { RandomString } from '@/utils/RandomStringGenerator'
type ProductsTypes = {
    category: string;
    product_name: string;
    product_image: string;
    price: number;
    stocks: number;
    description: string;
    brand: string;
}

type parentType = | "Desktop"
    | "Laptop"
    | "Pc Case"
    | "CPU"
    | "Motherboard"
    | "Memory"
    | "Storage"
    | "GPU"
    | "PowerSupply"
    | "Monitor"
    | "Keyboard"
    | "Mouse"
    | "Headphone"
    | "Microphone"
    | "Router"
    | "Switch"
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
                method: 'PUT',
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

    },

    updateProductsDetails: async (value: ProductsType) => {
        const currentProducts = useProductsStore.getState().productsData
        const finalProducts = []
        try {
            useLoading.getState().setActionLoadingState({ display: true, loadingMessage: 'Updating Products Details! Please wait...' })
            const updateProducts = await fetch('/api/updateProductsDetails', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product_image: value.product_image, product_name: value.product_name, price: value.price, description: value.description, product_id: value.product_id })
            })
            const response = await updateProducts.json()
            if (response.status != 500) {
                for (const item of currentProducts) {
                    if (item.product_id == value.product_id) {
                        finalProducts.push({
                            id: item.id,
                            product_id: item.product_id,
                            category: item.category,
                            parent: item.parent,
                            product_name: value.product_name,
                            product_image: value.product_image,
                            price: value.price,
                            stocks: item.stocks,
                            description: value.description,
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
            }
            useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
        } catch (err) {
            useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
        }
    },

    addProductsToDatabase: async (value: ProductsTypes) => {
        useLoading.getState().setActionLoadingState({ display: true, loadingMessage: 'Adding Products! Please wait...' })
        const currentProducts = useProductsStore.getState().productsData
        const pId = RandomString() //generate unique product id - string
        const parentValue = parentClasses[value.category as keyof typeof parentClasses];
        const date = new Date()
        const final = formatDateYYYYMMDD(date)
        const parsedDate = parseDateDDMMYYYY(final);
        const finalProductsToInsert = {
            id: 0,
            product_id: pId,
            category: value.category,
            parent: parentValue,
            product_name: value.product_name,
            product_image: value.product_image,
            price: value.price,
            stocks: value.stocks,
            description: value.description,
            brand: value.brand,
            sales_count: 0,
            created_at: parsedDate,
            updated_at: parsedDate,
        }
        const addProduct = await fetch('/api/addProducts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data: finalProductsToInsert })
        })
        const result = await addProduct.json()
        if (result.status != 500) {
            set({
                productsData: [finalProductsToInsert, ...currentProducts]
            })
        }
        useLoading.getState().setActionLoadingState({ display: false, loadingMessage: '' })
    }

}))

function parseDateDDMMYYYY(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JS Date
}