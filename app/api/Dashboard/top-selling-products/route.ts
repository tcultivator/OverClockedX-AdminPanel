import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { topSellingProducts } from '@/types/topSellingProductsType'
export async function GET(req: NextRequest) {
    try {
        const year = Number(req.nextUrl.searchParams.get("year"))
        const month = Number(req.nextUrl.searchParams.get("month"))
        const query = `SELECT 
    order_items.product_id,
    products.product_name,
    products.product_image,
    products.price,
    products.stocks,
    products.base_stocks,
    products.sales_count,
    COUNT(*) AS total_orders
FROM order_items
JOIN products 
    ON products.product_id = order_items.product_id
WHERE MONTH(order_items.created_at) = ?
  AND YEAR(order_items.created_at) = ?
GROUP BY 
    order_items.product_id,
    products.product_name,
    products.product_image,
    products.price,
    products.stocks,
    products.base_stocks,
    products.sales_count
ORDER BY total_orders DESC
LIMIT 10;`
        const [rows] = await db.query(query, [month, year])
        const topSellingProducts = rows as topSellingProducts[]
        return NextResponse.json(topSellingProducts)
    } catch (err) {
        console.error('eto ung error',err)
        return NextResponse.json({ status: 500 })
    }
}
