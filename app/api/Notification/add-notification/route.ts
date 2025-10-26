import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        const query = 'INSERT INTO notification (notif_id,product_id,product_name,product_image,action,isRead) VALUES (?,?,?,?,?,?)'
        await db.query(query, [body.notif_id, body.product_id, body.product_name, body.product_image, body.action, body.isRead])
        return NextResponse.json({ status: 200 })
    }
    catch (err) {
        return NextResponse.json({ status: 500 })
    }
}