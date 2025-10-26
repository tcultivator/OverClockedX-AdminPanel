type actionType = "Delete Product" | "Add New Product" | "Edit Product" | "Edit Stock"

export type NotificationType = {
    notif_id: string;
    product_id: string;
    product_name: string;
    product_image: string;
    action: actionType;
    isRead: boolean;
    created_at: Date
}