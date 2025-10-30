import db from "@/lib/db";
import { NextResponse } from "next/server";
type Count = {
    totalProducts: number
    totalSoldOut: number
    totalDeletedProducts: number
}
export async function GET() {
    try {
        const totalProductsQuery = 'SELECT COUNT(*) AS totalProducts FROM products'
        const totalSoldOutQuery = 'SELECT COUNT(*) AS totalSoldOut FROM products WHERE stocks = 0'
        const totalDeletedQuery = 'SELECT COUNT(*) AS totalDeletedProducts FROM deleted_products'
        //get total count of products
        const totaProducts = await db.query(totalProductsQuery)
        const resultTotalProducts = totaProducts[0] as Count[]
        //get total count of sold out products
        const totalSoldout = await db.query(totalSoldOutQuery)
        const resultTotalSoldout = totalSoldout[0] as Count[]
        //get total count of deleted products
        const totalDeleted = await db.query(totalDeletedQuery)
        const resultTotalDeleted = totalDeleted[0] as Count[]
        return NextResponse.json({ totalProducts: resultTotalProducts[0], totalSoldOut: resultTotalSoldout[0], totalDeletedProducts: resultTotalDeleted[0] })

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}