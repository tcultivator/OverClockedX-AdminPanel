import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'UPDATE products SET stocks = ? WHERE product_id = ?'
        await db.query(query, [body.stocks, body.product_id])
        return NextResponse.json({ message: 'Stocks has been updated' })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}