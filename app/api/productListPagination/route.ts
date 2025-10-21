import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { ProductsType } from "@/types/ProductsType";
type Count = {
    total: number
}
type SortField = 'price' | 'stocks' | 'sales_count' | 'created_at'
type SortDirection = 'ASC' | 'DESC'

export async function GET(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get("page"))
        const limit = 6
        const offset = (page - 1) * limit
        const field = req.nextUrl.searchParams.get("field")
        const direction = req.nextUrl.searchParams.get("direction")
        
        const finalOrderBy = field != null && direction != null ? ` ORDER BY ${field} ${direction}` : ' '
        
        //get the products by offset and limit
        const getProductsQuery = `SELECT * FROM products ${finalOrderBy} LIMIT ? OFFSET ? `
        const [rows] = await db.query(getProductsQuery, [limit, offset])
        const result = rows as ProductsType[]
        return NextResponse.json(result)

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}