import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

type Recent_Orders = {
    order_id: number;
    email: string;
    profile_Image: string;
    reference_id: string;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
    quantity: number;
    price: number;
    sub_total: number;
    product_id: string;
    product_name: string;
    product_image: string;
    rname: string;
    phone_number: string;
    country: string;
    city_municipality: string;
    barangay: string;
    province: string;
    trademark: string;
}
export async function GET(req: NextRequest) {
    try {
        const paymentMethod = req.nextUrl.searchParams.get("paymentMethod")
        const paymentStatus = req.nextUrl.searchParams.get("paymentStatus")
        const orderStatus = req.nextUrl.searchParams.get("orderStatus")
        const finalPaymentMethod = paymentMethod != null ? ` AND orders.payment_method = '${paymentMethod}'` : ' '
        const finalPaymentStatus = paymentStatus != null ? ` AND orders.payment_status = '${paymentStatus}'` : ' '
        const finalOrderStatus = orderStatus != null ? ` AND orders.order_status = '${orderStatus}'` : ' '
        const query = `SELECT orders.id AS order_id, 
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
        products.product_image, 
        accounts.profile_Image,
        customer_address.rname,
        customer_address.phone_number,
        customer_address.country,
        customer_address.city_municipality,
        customer_address.barangay,
        customer_address.province,
        customer_address.trademark 
        FROM orders JOIN order_items ON order_items.order_id = orders.id 
        JOIN products ON order_items.product_id = products.product_id 
        JOIN accounts ON orders.email = accounts.email 
        JOIN customer_address ON orders.id = customer_address.order_id WHERE orders.id != 0 ${finalPaymentMethod} ${finalPaymentStatus} ${finalOrderStatus}
`
        const [rows] = await db.query(query)
        const recent_orders = rows as Recent_Orders[]
        return NextResponse.json(recent_orders)
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}