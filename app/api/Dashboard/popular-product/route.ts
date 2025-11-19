import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type popularProducts = {
    product_id: string;
    product_name: string;
    product_image: string;
    price: number;
    stocks: number;
    base_stocks: number;
    sales_count: number;
    total_orders: number;
}
export async function GET(req: NextRequest) {
    try {
        const year = Number(req.nextUrl.searchParams.get("year"))
        const month = Number(req.nextUrl.searchParams.get("month"))
        const query = `SELECT order_items.product_id,
        products.product_name,
        products.product_image,
        products.price,
        products.stocks,
        products.base_stocks,
        products.sales_count, 
        COUNT(*) AS total_orders 
        FROM order_items 
        JOIN products ON products.product_id=order_items.product_id 
        WHERE MONTH(order_items.created_at) = ? 
        AND YEAR(order_items.created_at) = ? 
        GROUP BY product_id 
        ORDER BY total_orders DESC LIMIT 1;
`
        const [rows] = await db.query(query, [month, year])
        const popular_product_result = rows as popularProducts[]
        return NextResponse.json(popular_product_result)
    } catch (err) {
        console.error('eto ung error',err)
        return NextResponse.json({ status: 500 })
    }
}
