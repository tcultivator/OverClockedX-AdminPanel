import { create } from 'zustand'
import { GroupedOrder } from '@/types/GroupDataType';
import { useLoading } from './loadingStore';
type orders = {
    orders_data: GroupedOrder[],
    setOrders_data: (value: GroupedOrder[]) => void,
    acceptOrder: (value: number) => void,
    QRCodeData: string,
}
export const useOrderStore = create<orders>((set) => ({
    orders_data: [],
    setOrders_data: (value: GroupedOrder[]) => {
        set({
            orders_data: value
        })
    },
    acceptOrder: async (value: number) => {
        const current_order_data = useOrderStore.getState().orders_data
        useLoading.getState().setLoading(true)
        const acceptOrderCall = await fetch('/api/OrdersPage/Accept-Order', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id: value })
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
        useLoading.getState().setLoading(false)
        set({
            orders_data: final_order_data,
            QRCodeData: acceptOrderCall_result.QRCodeData
        })

    },
    QRCodeData: '',
}))