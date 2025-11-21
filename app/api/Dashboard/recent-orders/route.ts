import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
type Recent_Orders = {
    order_id: number;
    email: string;
    reference_id: string;
    total_amount: number;
    payment_method:string;
    payment_status: string;
    order_status: string;
    created_at: string;
    quantity: number;
    price: number;
    sub_total: number;
    product_id: string;
    product_name: string;
    product_image: string;
}
export async function GET() {
    try {
        const query = `SELECT 
    orders.id AS order_id,
    orders.email,
    orders.total_amount,
    orders.reference_id,
    orders.payment_method,
    orders.payment_status,
    orders.order_status,
    orders.created_at,
    order_items.quantity,
    order_items.price,
    order_items.sub_total,
    products.product_id,
    products.product_name,
    products.product_image
FROM orders
JOIN order_items ON order_items.order_id = orders.id
JOIN products ON order_items.product_id = products.product_id
WHERE MONTH(orders.created_at) = MONTH(NOW());

`
        const [rows] = await db.query(query)
        const recent_orders = rows as Recent_Orders[]
        return NextResponse.json(recent_orders)
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}