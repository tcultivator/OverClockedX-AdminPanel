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
        const field = req.nextUrl.searchParams.get("field")
        const direction = req.nextUrl.searchParams.get("direction")
        const category = req.nextUrl.searchParams.get("category")
        
        const finalOrderBy = field != null && direction != null ? ` ORDER BY ${field} ${direction}` : ' '
        const finalCategory = category != null && category !== 'all' ? ` WHERE category = '${category}' OR parent = '${category}'` : ' '
        const totalCountOfProducts = await db.query(`SELECT COUNT(*) AS total FROM products ${finalCategory}`)
        const totalCount = totalCountOfProducts[0] as Count[]
        
        const limit = 3
        const totalPages = Math.ceil(Number(totalCount[0].total) / limit);
        const finalPage = page > totalPages ? (totalPages == 0 ? 1 : totalPages) : (page == 0 ? 1 : page)
        
        const offset = (finalPage - 1) * limit



        //get the products by offset and limit
        const getProductsQuery = `
        SELECT * FROM products
        ${finalCategory}
        ${finalOrderBy}
        LIMIT ${limit} OFFSET ${offset}
        `;

        

        const [rows] = await db.query(getProductsQuery, [limit, offset])
        const result = rows as ProductsType[]


        return NextResponse.json({ result: result, totalPages: totalPages, currentPages: finalPage })

    } catch (err) {
        

        return NextResponse.json({ status: 500 })
    }
}