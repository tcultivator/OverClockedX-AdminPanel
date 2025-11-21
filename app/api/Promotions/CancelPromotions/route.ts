import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'DELETE FROM product_promotion_list WHERE product_id = ?'
        await db.query(query, [body.product_id])
        return NextResponse.json({ status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ status: 500 })
    }
}
