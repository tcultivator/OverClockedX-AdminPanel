import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body.addedStocks)
        const query = 'UPDATE products SET stocks = ?,base_stocks = base_stocks + ? WHERE product_id = ?'
        await db.query(query, [body.stocks,body.addedStocks, body.product_id])
        return NextResponse.json({ message: 'Stocks has been updated' })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}