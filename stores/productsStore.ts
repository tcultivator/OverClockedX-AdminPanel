import { create } from 'zustand'
import { ProductsType } from '@/types/ProductsType'
import { useLoading } from './loadingStore'
import { parentClasses } from '@/utils/ParentClasses'
import { formatDateYYYYMMDD } from '@/utils/getCurrentDateFunction'
type addingPromotion = {
    product_id: string
    product_image: string
    product_name: string
    price: number
    promotion_type: string
    promotionValue: number
    promotionEndDate: string
}

type CancelPromotion = {
    product_id: string
    product_image: string
    product_name: string
}

type addNewProduct = {
    product_name: string;
    product_image: string;
    price: number;
    category: string;
    brand: string;
    stocks: number;
    description: string;
}
type productStore = {
    productsData: ProductsType[],
    storeProductsData: (value: ProductsType[]) => void,
    removeProduct: (value: string) => void,
    editStocks: (pId: string, newStocks: number, oldStocks: number) => void,
    updateProductsDetails: (value: ProductsType) => void,
    addProductsToDatabase: (value: addNewProduct) => void,
    AddingPromotion: ({ product_id, product_image, product_name, price, promotion_type, promotionValue, promotionEndDate }: addingPromotion) => void,
    CancelPromotion: ({ product_id, product_image, product_name, }: CancelPromotion) => void,
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
                const finalProducts = currentProducts.map(item => {
                    if (item.product_id == pId) {
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
                        return {
                            ...item, stocks: newStocks
                        }
                    }
                    return item
                })
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

                const finalProducts = currentProducts.map(item => {
                    if (item.product_id == value.product_id) {
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
                        return {
                            ...item, product_name: value.product_name, product_image: value.product_image, price: value.price, description: value.description
                        }
                    }
                    return item
                })
                set({
                    productsData: finalProducts,

                })
                useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Updating Products Details' })
            }

        } catch (err) {
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Updating Products Details!' })
        }
    },

    addProductsToDatabase: async (value: addNewProduct) => {

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
            promotion_type: null,
            value: null
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

    },
    AddingPromotion: async ({ product_id, product_image, product_name, price, promotion_type, promotionValue, promotionEndDate }: addingPromotion) => {
        const currentProducts = useProductsStore.getState().productsData
        const selected = new Date(promotionEndDate);
        const now = new Date();
        if (selected <= now) {
            return alert("Date and time must be in the future!");
        }
        useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Adding Promotion...' })
        const addingPromotion = await fetch('/api/Promotions/AddPromotions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id,
                product_image: product_image,
                product_name: product_name,
                price: price,
                promotion_type: promotion_type,
                promotionValue: promotionValue,
                promotionEndDate: promotionEndDate.replace("T", ":") + ":00"
            })
        })

        const addingPromotionResult = await addingPromotion.json()
        if (addingPromotionResult.status == 500) {
            //handle error
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Adding Promotion' })
            return
        }

        const finalProducts = currentProducts.map(item => {
            if (item.product_id == product_id) {
                //adding notification
                const notif_id = RandomString();
                const date = new Date()
                const final = formatDateYYYYMMDD(date)
                const parsedDate = parseDateDDMMYYYY(final);
                useNotificationStore.getState().addNotification({
                    notif_id: notif_id,
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_image: item.product_image,
                    action: 'Add Promotion',
                    isRead: false,
                    created_at: parsedDate
                })
                return {
                    ...item, promotion_type: promotion_type, value: promotionValue
                }
            }
            return item
        })
        set({
            productsData: finalProducts,

        })
        useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Adding Promotion' })
    },


    CancelPromotion: async ({ product_id, product_image, product_name, }: CancelPromotion) => {
        const currentProducts = useProductsStore.getState().productsData
        useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Removing Promotion...' })
        const cancelPromotion = await fetch('/api/Promotions/CancelPromotions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ product_id: product_id })
        })
        const cancelPromotionResult = await cancelPromotion.json()
        if (cancelPromotionResult.status == 500) {
            // handle error
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Removing Promotion' })
            return
        }

        const finalProducts = currentProducts.map(item => {
            if (item.product_id == product_id) {
                //adding notification
                const notif_id = RandomString();
                const date = new Date()
                const final = formatDateYYYYMMDD(date)
                const parsedDate = parseDateDDMMYYYY(final);
                useNotificationStore.getState().addNotification({
                    notif_id: notif_id,
                    product_id: product_id,
                    product_name: product_name,
                    product_image: product_image,
                    action: 'Cancel Promotion',
                    isRead: false,
                    created_at: parsedDate
                })
                return {
                    ...item, promotion_type: null, value: null
                }
            }
            return item
        })
        set({
            productsData: finalProducts,

        })

        useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Removing Promotion' })

        // adding notification / logs
        const notif_id = RandomString();
        const date = new Date()
        const final = formatDateYYYYMMDD(date)
        const parsedDate = parseDateDDMMYYYY(final);
        useNotificationStore.getState().addNotification({
            notif_id: notif_id,
            product_id: product_id,
            product_name: product_name,
            product_image: product_image,
            action: 'Cancel Promotion',
            isRead: false,
            created_at: parsedDate
        })


    }

}))

export function parseDateDDMMYYYY(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JS Date
}