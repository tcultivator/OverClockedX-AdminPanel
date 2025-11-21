import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { ProductPromotions } from "@/types/ProductsThatHasPromotionsType";
export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        await db.query('UPDATE product_promotion_list SET isActive = false WHERE end_date < Now()')
        const query = `
        SELECT products.product_id, 
        products.product_name, 
        products.product_image, 
        products.brand, 
        products.price,
        products.sales_count,
        products.stocks,
        products.base_stocks,
        product_promotion_list.start_date, 
        product_promotion_list.end_date, 
        product_promotion_list.value, 
        product_promotion_list.promotion_type,
        product_promotion_list.isActive
        FROM product_promotion_list 
        RIGHT JOIN products ON product_promotion_list.product_id = products.product_id AND product_promotion_list.isActive = true 
        WHERE products.product_id = ?;
        `

        const [rows] = await db.query(query, [body.product_id])
        const ProductThatHasPromotions = rows as ProductPromotions[]
        return NextResponse.json(ProductThatHasPromotions[0])
    } catch (err) {
        return NextResponse.json({ status: 500, message: `Error,${err}` })
    }
}