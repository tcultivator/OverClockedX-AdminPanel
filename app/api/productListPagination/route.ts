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
        console.log(field)
        console.log(direction)

        const finalOrderBy = field != null && direction != null ? ` ORDER BY ${field} ${direction}` : ' '
        //get total count of products
        const totalCountProductsQuery = 'SELECT COUNT(*) AS total FROM products'
        const totalCountProducts = await db.query(totalCountProductsQuery)

        const totalCount = totalCountProducts[0] as Count[]
        console.log('eto result sa count ng products ', totalCount[0].total)

        //get the products by offset and limit
        const getProductsQuery = `SELECT * FROM products ${finalOrderBy} LIMIT ? OFFSET ? `
        console.log(getProductsQuery)
        console.log(finalOrderBy)
        const [rows] = await db.query(getProductsQuery, [limit, offset])
        const result = rows as ProductsType[]
        console.log(result)
        return NextResponse.json(result)

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}