import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ProductsType } from "@/types/ProductsType";
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const getProductQuery = 'SELECT * FROM products WHERE product_id = ?'
        const moveQuery = 'INSERT INTO deleted_products (product_id,category,parent,product_name,product_image,price,stocks,description,brand,sales_count,created_at)VALUES(?,?,?,?,?,?,?,?,?,?,?)'
        const deleteQuery = 'DELETE FROM products WHERE product_id = ?'

        const [rows] = await db.query(getProductQuery, [body.product_id])
        const returnProducts = rows as ProductsType[]
        if (returnProducts.length === 0) return NextResponse.json({ message: 'Products is not found! error deleting that products' })

        await db.query(moveQuery, [returnProducts[0].product_id,
        returnProducts[0].category,
        returnProducts[0].parent,
        returnProducts[0].product_name, returnProducts[0].product_image,
        returnProducts[0].price, returnProducts[0].stocks,
        returnProducts[0].description, returnProducts[0].brand,
        returnProducts[0].sales_count, returnProducts[0].created_at,])

        await db.query(deleteQuery, [body.product_id])

        return NextResponse.json({ message: 'Success deleting products' })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}