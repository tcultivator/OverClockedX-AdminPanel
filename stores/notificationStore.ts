import { create } from 'zustand'
import { NotificationType } from '@/types/NotificationType'
import { RandomString } from '@/utils/RandomStringGenerator'
type NotificationStoreType = {
    notificationDataStore: NotificationType[],
    setNotificationData: (value: NotificationType[]) => void,
    addNotification: ({ product_id, product_name, product_image, action, isRead, created_at }: NotificationType) => void,
    markAsRead: (value: string) => void,
    delete_notification: (value: string) => void,
}
export const useNotificationStore = create<NotificationStoreType>((set) => ({
    notificationDataStore: [],
    setNotificationData: (value: NotificationType[]) => {
        set({
            notificationDataStore: value
        })
    },
    addNotification: async ({ notif_id, product_id, product_name, product_image, action, isRead, created_at }: NotificationType) => {

        const newNotification = {
            notif_id: notif_id,
            product_id: product_id,
            product_name: product_name,
            product_image: product_image,
            action: action,
            isRead: isRead,
            created_at: created_at
        }

        try {

            const insertNotification = await fetch('/api/Notification/add-notification', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    notif_id: notif_id,
                    product_id: product_id,
                    product_name: product_name,
                    product_image: product_image,
                    action: action,
                    isRead: isRead,
                })
            })
            const response = await insertNotification.json()
            if (response.status != 500) {
                set((state) => ({
                    notificationDataStore: [newNotification, ...state.notificationDataStore]

                }))
            }
        } catch (err) {
            console.log('error adding notification')
        }


    },

    markAsRead: async (value: string) => {
        console.log(value)
        const currentNotificationData = useNotificationStore.getState().notificationDataStore
        const updated_notification = []
        try {
            const read_notification = await fetch('/api/Notification/read-notification', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ notif_id: value })
            })
            const response = await read_notification.json()
            if (response.status != 500) {
                for (const item of currentNotificationData) {
                    if (item.notif_id == value) {
                        updated_notification.push({
                            notif_id: item.notif_id,
                            product_id: item.product_id,
                            product_name: item.product_name,
                            product_image: item.product_image,
                            action: item.action,
                            isRead: true,
                            created_at: item.created_at
                        })
                    } else {
                        updated_notification.push(item)
                    }
                }
                set({
                    notificationDataStore: updated_notification
                })
            }
        } catch (err) {
            console.log('error reading notification')
        }

    },

    delete_notification: async (value: string) => {
        const currentNotificationData = useNotificationStore.getState().notificationDataStore
        try {
            const deleteNotif = await fetch('/api/Notification/delete-notification', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ notif_id: value })
            })
            const response = await deleteNotif.json()
            if (response.status != 500) {
                set({
                    notificationDataStore: currentNotificationData.filter(items => items.notif_id != value)
                })
            }

        } catch (err) {
            console.log('error deleting notification')
        }
    }
}))