import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT() {
    try {
        const query = 'UPDATE notification SET isRead = ?'
        await db.query(query, [true])
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}