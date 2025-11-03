import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const query = `UPDATE orders SET order_status = 'On Delivery' WHERE id = ?`
        await db.query(query, [body.order_id])

        return NextResponse.json({ status: 200 })

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}