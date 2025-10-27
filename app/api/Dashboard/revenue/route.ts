import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
type data = {
    total_amount: number;
    created_at: Date;
}
export async function GET(req: NextRequest) {
    try {
        const year = Number(req.nextUrl.searchParams.get("year"))
        const query = 'SELECT orders.total_amount,orders.created_at FROM orders WHERE YEAR(created_at) = ? ORDER BY created_at'
        const [rows] = await db.query(query, [year])
        const result = rows as data[]
        console.log(result)
        return NextResponse.json(result)
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}