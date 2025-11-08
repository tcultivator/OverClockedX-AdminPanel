import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
type ResultInAuthenticateQueryType = {
    selectedOrders: number
}
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const authenticateQuery = 'SELECT COUNT(*) AS selectedOrders FROM orders WHERE id = ? && order_status = ?'
        const [rows] = await db.query(authenticateQuery, [body.order_id, 'pending'])
        const selectedOrders = rows as ResultInAuthenticateQueryType[]
        if (selectedOrders[0].selectedOrders == 0) {
            return NextResponse.json({ type: 'warning', message: 'Warning! this order is already proccessed and unable to decline!' })
        }
        const query = `UPDATE orders SET order_status = 'cancel' WHERE id = ?`
        await db.query(query, [body.order_id])
        return NextResponse.json({ type: 'success', message: 'The order Request is successfuly decline!' })
    }
    catch (err) {
        return NextResponse.json({ type: 'error', message: 'Something went wrong in our end!' })
    }
}