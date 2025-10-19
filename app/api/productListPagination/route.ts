import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { ProductsType } from "@/types/ProductsType";
type Count = {
    total: Number
}
export async function GET(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get("page"))
        const limit = 2
        const offset = (page - 1) * limit
        //get total count of products
        const totalCountProductsQuery = 'SELECT COUNT(*) AS total FROM products'
        const totalCountProducts = await db.query(totalCountProductsQuery)

        const totalCount = totalCountProducts[0] as Count[]
        console.log('eto result sa count ng products ', totalCount[0].total)

        //get the products by offset and limit
        const getProductsQuery = 'SELECT * FROM products LIMIT ? OFFSET ?'
        const [rows] = await db.query(getProductsQuery, [limit, offset])
        const result = rows as ProductsType[]
        console.log(result)
        return NextResponse.json(result)

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}