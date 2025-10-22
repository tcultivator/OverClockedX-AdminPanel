import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'UPDATE products SET product_image = ?, product_name = ?, price = ?, description = ? WHERE product_id = ? '
        await db.query(query, [body.product_image, body.product_name, body.price, body.description, body.product_id])
        return NextResponse.json({ message: 'Success Updating Products Details!' })
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong, please try again!' })
    }
}