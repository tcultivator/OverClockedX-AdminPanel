import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        const query = 'INSERT INTO product_promotion_list (product_id,promotion_type,value,end_date,isActive) VALUES (?,?,?,?,?)'
        await db.query(query, [body.product_id, body.promotion_type, body.promotionValue, body.promotionEndDate, true])
        return NextResponse.json({ status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ status: 500 })
    }
}