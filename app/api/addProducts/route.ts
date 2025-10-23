import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'INSERT INTO products (product_id ,category,parent,product_name,product_image,price,stocks,description,brand,sales_count) VALUES (?,?,?,?,?,?,?,?,?,?)'
        await db.query(query, [body.data.product_id, body.data.category, body.data.parent, body.data.product_name, body.data.product_image, body.data.price, body.data.stocks, body.data.description, body.data.brand, 0])
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}