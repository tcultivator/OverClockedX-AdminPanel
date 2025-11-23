import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/sendGrid";
import { generateNewArrivalEmail } from "@/utils/htmlForEmail/generateNewArrivalEmail";
type subscriber_email = {
    email: string;
}
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const query = 'INSERT INTO products (product_id ,category,parent,product_name,product_image,price,stocks,description,brand,sales_count) VALUES (?,?,?,?,?,?,?,?,?,?)'
        await db.query(query, [body.data.product_id, body.data.category, body.data.parent, body.data.product_name, body.data.product_image, body.data.price, body.data.stocks, body.data.description, body.data.brand, 0])

        const [rows] = await db.query('SELECT email FROM subscribe_users')
        const emails = rows as subscriber_email[]
        const emailList = emails.map(item => item.email);

        const html = generateNewArrivalEmail({
            product_id: body.data.product_id,
            productImage: body.data.product_image,
            productName: body.data.product_name,
            price: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", }).format(body.data.price)
        })

        await sendMail({
            to: emailList,
            sub: `🔥 New Arrivals! Dont Miss Out!`,
            message: html,
        });
        return NextResponse.json({ status: 200 })
    } catch (err) {
        return NextResponse.json({ status: 500 })
    }
}