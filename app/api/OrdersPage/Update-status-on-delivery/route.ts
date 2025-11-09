import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

type ResultInAuthenticateQueryType = {
    selectedOrders: number
}
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const authenticateQuery = 'SELECT COUNT(*) AS selectedOrders FROM orders WHERE id = ? && order_status = ?'
        const [rows] = await db.query(authenticateQuery, [body.order_id, 'preparing'])
        const selectedOrders = rows as ResultInAuthenticateQueryType[]
        if (selectedOrders[0].selectedOrders == 0) {
            return NextResponse.json({ message: 'notUpdated' })
        }
        const query = `UPDATE orders SET order_status = 'On Delivery' WHERE id = ?`
        await db.query(query, [body.order_id])

        return NextResponse.json({ message: 'success' })

    } catch (err) {
        return NextResponse.json({ message: 'error' })
    }
}