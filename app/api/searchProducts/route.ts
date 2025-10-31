import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ProductsType } from "@/types/ProductsType";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'SELECT * FROM products WHERE category LIKE ? OR product_name LIKE ? OR product_id = ?'
        const [rows] = await db.query(query, [`%${body.searchValue}%`, `%${body.searchValue}%`, body.searchValue])
        const result = rows as ProductsType[]
        return NextResponse.json(result)
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong' })
    }
}