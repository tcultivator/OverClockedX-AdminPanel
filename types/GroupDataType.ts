export type GroupedOrder = {
    order_id: number;
    email: string;
    profile_Image: string;
    reference_id: string;
    total_amount: number;
    payment_method: string;
    payment_status: 'success' | 'pending' | 'cancel';
    order_status: 'success' | 'pending' | 'cancel' | 'preparing' | 'On Delivery';
    created_at: string;
    rname: string;
    phone_number: string;
    country: string;
    city_municipality: string;
    barangay: string;
    province: string;
    trademark: string;
    updated_at: string;
    items: {
        product_id: string;
        product_name: string;
        product_image: string;
        quantity: number;
        price: number;
        sub_total: number;
    }[];
};