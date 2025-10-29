import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

type lowStocksProducts = {
    product_id: string;
    product_name: string;
    product_image: string;
    price: number;
    stocks: number;
    base_stocks: number;
}
export async function GET() {
    try {
        const query = 'SELECT * FROM products WHERE stocks <= base_stocks/3 ORDER BY stocks ASC'
        const [rows] = await db.query(query)
        const low_stocks_products = rows as lowStocksProducts[]
        return NextResponse.json(low_stocks_products)
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}