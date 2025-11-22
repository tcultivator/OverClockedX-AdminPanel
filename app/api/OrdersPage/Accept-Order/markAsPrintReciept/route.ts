import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    const body = await req.json()
    try {
        await db.query('UPDATE orders SET updated_at = ? WHERE id = ?', [body.updated_at, body.order_id])
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}