import db from "@/lib/db";
import { NextResponse } from "next/server";
type Count = {
    totalOrders: number
    pendingOrders: number
}
export async function GET() {
    try {
        const totalOrdersQuery = 'SELECT COUNT(*) AS totalOrders FROM orders'
        const pendingOrdersQuery = `SELECT COUNT(*) AS pendingOrders FROM orders WHERE order_status = 'pending'`
        const cancelOrdersQuery = `SELECT COUNT(*) AS cancelOrders FROM orders WHERE order_status = 'cancel'`
        //get total count of orders
        const totalOrders = await db.query(totalOrdersQuery)
        const resultTotalOrders = totalOrders[0] as Count[]
        //get total count of pending orders
        const pendingOrders = await db.query(pendingOrdersQuery)
        const resultPendingOrders = pendingOrders[0] as Count[]
        
        return NextResponse.json({ totalOrders: resultTotalOrders[0], pendingOrders: resultPendingOrders[0] })

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}