import { create } from 'zustand'
import { ProductsType } from '@/types/ProductsType'
import { useLoading } from './loadingStore'
import { parentClasses } from '@/utils/ParentClasses'
import { formatDateYYYYMMDD } from '@/utils/getCurrentDateFunction'
type productStore = {
    productsData: ProductsType[],
    storeProductsData: (value: ProductsType[]) => void,
    removeProduct: (value: string) => void,
    editStocks: (pId: string, newStocks: number, oldStocks: number) => void,
    updateProductsDetails: (value: ProductsType) => void,
    addProductsToDatabase: (value: ProductsTypes) => void,

}
import { RandomString } from '@/utils/RandomStringGenerator'
import { useNotificationStore } from './notificationStore'
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

        set({
            productsData: value
        })
    },
    removeProduct: async (value: string) => {
        const currentProducts = useProductsStore.getState().productsData

        //getting the system date, need this for setting notification, it needs current datetime
        const date = new Date()
        const final = formatDateYYYYMMDD(date)
        const parsedDate = parseDateDDMMYYYY(final);
        //logic for getting data for notification
        const selectedProductsForNotification = currentProducts.filter(items => items.product_id == value)
        try {
            useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Deleting Products! Please wait...' })
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

                //adding notification
                const notif_id = RandomString();
                useNotificationStore.getState().addNotification({
                    notif_id: notif_id,
                    product_id: selectedProductsForNotification[0].product_id,
                    product_name: selectedProductsForNotification[0].product_name,
                    product_image: selectedProductsForNotification[0].product_image,
                    action: 'Delete Product',
                    isRead: false,
                    created_at: parsedDate
                })
            }
            useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Sucess Deleting Products!' })
        } catch (err) {


            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Deleting Products!' })
        }

    },
    editStocks: async (pId: string, newStocks: number, oldStocks: number) => {
        const currentProducts = useProductsStore.getState().productsData
        const finalProducts = []
        //getting the system date, need this for setting notification, it needs current datetime
        const date = new Date()
        const final = formatDateYYYYMMDD(date)
        const parsedDate = parseDateDDMMYYYY(final);
        try {

            useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Updating Stocks! Please wait...' })
            const updateStocks = await fetch('/api/EditProductStocks', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product_id: pId, stocks: newStocks, addedStocks: newStocks - oldStocks })
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
                        //this add notification on notification store
                        const notif_id = RandomString();
                        useNotificationStore.getState().addNotification({
                            notif_id: notif_id,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            product_image: item.product_image,
                            action: 'Edit Stock',
                            isRead: false,
                            created_at: parsedDate
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
                useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error updating Stocks' })
            }
            // query to database first then if success then run this logic that change the stocks in productsData
            //also add badge to the products that been updated

            useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Updating Stocks' })
        } catch (err) {
            console.log('Something went wrong!')
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error updating Stocks' })
        }

    },

    updateProductsDetails: async (value: ProductsType) => {
        const currentProducts = useProductsStore.getState().productsData
        const finalProducts = []

        //getting the system date, need this for setting notification, it needs current datetime
        const date = new Date()
        const final = formatDateYYYYMMDD(date)
        const parsedDate = parseDateDDMMYYYY(final);
        try {

            useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Updating Products Details! Please wait...' })
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

                        //adding notification
                        const notif_id = RandomString();
                        useNotificationStore.getState().addNotification({
                            notif_id: notif_id,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            product_image: item.product_image,
                            action: 'Edit Product',
                            isRead: false,
                            created_at: parsedDate
                        })
                    } else {
                        finalProducts.push(item)
                    }
                }
                set({
                    productsData: finalProducts,

                })
                useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Updating Products Details' })
            }

        } catch (err) {
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Updating Products Details!' })
        }
    },

    addProductsToDatabase: async (value: ProductsTypes) => {

        useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Adding Products! Please wait...' })
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
            //adding notification
            const notif_id = RandomString();
            useNotificationStore.getState().addNotification({
                notif_id: notif_id,
                product_id: finalProductsToInsert.product_id,
                product_name: finalProductsToInsert.product_name,
                product_image: finalProductsToInsert.product_image,
                action: 'Add New Product',
                isRead: false,
                created_at: parsedDate
            })
            useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Adding Products!' })
        } else {
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Adding Products!' })
        }

    }

}))

function parseDateDDMMYYYY(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JS Date
}