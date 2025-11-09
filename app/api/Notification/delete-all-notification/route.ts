import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const deleteQuery = 'DELETE FROM notification'
        await db.query(deleteQuery)
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}