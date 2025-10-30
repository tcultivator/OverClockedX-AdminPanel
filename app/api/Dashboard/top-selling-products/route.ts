import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
type topSellingProducts = {
    product_name: string;
    product_image: string;
    price: number;
    base_stocks: number;
    stocks: number;
    sales_count: number;
    created_at: Date
}
export async function GET() {
    try {
        const query = `SELECT products.product_name,
        products.product_image,
        products.base_stocks,
        products.stocks,
        products.price,
        products.sales_count,
        products.created_at FROM products 
        WHERE YEAR(created_at) = 2025 
        AND sales_count > 0 
        ORDER BY sales_count DESC LIMIT 10`
        const [rows] = await db.query(query)
        const topSellingProducts = rows as topSellingProducts[]
        return NextResponse.json(topSellingProducts)
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}