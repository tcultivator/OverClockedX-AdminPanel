import { create } from 'zustand'
import { GroupedOrder } from '@/types/GroupDataType';
import { useLoading } from './loadingStore';
import QRCode from "qrcode";
type DeclineOrderReturnValue = {
    type: "success" | "error" | "default" | "warning";
    message: string
}
type orders = {
    orders_data: GroupedOrder[],
    setOrders_data: (value: GroupedOrder[]) => void,
    acceptOrder: (value: number, pid: string, email: string, reference_id: string, created_at: string, total_amount: number) => void,
    QRCodeData: string,
    GenerateQR: (value: number, pid: string) => void,
    updateStatusOnDelivery: (value: string) => void,
    declineOrder: (value: number, email: string, reference_id: string, created_at: string, total_amount: number) => Promise<DeclineOrderReturnValue>,

}
export const useOrderStore = create<orders>((set) => ({
    orders_data: [],
    setOrders_data: (value: GroupedOrder[]) => {
        set({
            orders_data: value
        })
    },
    //make this return something so it can use error handling in frontend
    acceptOrder: async (value: number, pid: string, email: string, reference_id: string, created_at: string, total_amount: number) => {
        const current_order_data = useOrderStore.getState().orders_data
        console.log(email)
        useLoading.getState().setButtonLoading(true)
        const acceptOrderCall = await fetch('/api/OrdersPage/Accept-Order', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id: value, email: email, reference_id: reference_id, created_at: created_at, total_amount: total_amount })
        })
        const acceptOrderCall_result = await acceptOrderCall.json()
        if (acceptOrderCall_result.status == 500) return

        const final_order_data = current_order_data.map(item => {
            if (item.order_id === value) {
                return {
                    ...item, order_status: 'preparing' as const
                }
            }
            return item
        })
        useLoading.getState().setButtonLoading(false)
        useOrderStore.getState().GenerateQR(value, pid)
        set({
            orders_data: final_order_data,
        })

    },
    QRCodeData: '',
    GenerateQR: async (value: number, pid: string) => {
        const QRCodeData = await QRCode.toDataURL(`http://192.168.100.60:3000/product/${pid}?order_id=${value}`)
        set({
            QRCodeData: QRCodeData
        })
    },
    updateStatusOnDelivery: (value: string) => {
        const orders_data = useOrderStore.getState().orders_data
        const final_order_data = orders_data.map(item => {
            if (item.order_id === Number(value)) {
                return {
                    ...item, order_status: 'On Delivery' as const
                }
            }
            return item
        })
        set({
            orders_data: final_order_data
        })
    },
    declineOrder: async (value: number, email: string, reference_id: string, created_at: string, total_amount: number) => {
        const current_order_data = useOrderStore.getState().orders_data
        useLoading.getState().setButtonLoading(true)
        const declineOrderCall = await fetch('/api/OrdersPage/Decline-Order', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ order_id: value, email: email, reference_id: reference_id, created_at: created_at, total_amount: total_amount })
        })
        const declineOrderCall_result = await declineOrderCall.json()
        if (declineOrderCall_result.type == 'success') {
            const final_order_data = current_order_data.map(item => {
                if (item.order_id === value) {
                    return {
                        ...item, order_status: 'cancel' as const
                    }
                }
                return item
            })

            set({
                orders_data: final_order_data,
            })
        }
        useLoading.getState().setButtonLoading(false)

        return {
            type: declineOrderCall_result.type,
            message: declineOrderCall_result.message
        }
    },

}))