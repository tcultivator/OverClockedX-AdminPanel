import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'UPDATE notification SET isRead = ? WHERE notif_id = ?'
        await db.query(query, [true, body.notif_id])
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}