import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { sendMail } from "@/lib/sendGrid";
import { generatePromotionEmail } from "@/utils/PromotionEmailHtmlGenerator";
type subscriber_email = {
    email: string;
}
export async function POST(req: NextRequest) {
    const body = await req.json()
    try {
        //this will insert promotion to database
        const query = 'INSERT INTO product_promotion_list (product_id,promotion_type,value,end_date,isActive) VALUES (?,?,?,?,?)'
        await db.query(query, [body.product_id, body.promotion_type, body.promotionValue, body.promotionEndDate, true])

        //fetch all subscribe users in newsletter
        const [rows] = await db.query('SELECT email FROM subscribe_users')
        const emails = rows as subscriber_email[]
        const emailList = emails.map(item => item.email);


        // generate html email
        const promotionEndDate = new Date(body.promotionEndDate);
        const html = generatePromotionEmail({
            productImage: body.product_image,
            productName: body.product_name,
            price: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", }).format(body.price),
            promotionType: body.promotion_type,
            promotionValue: `₱${body.promotionValue}`,
            promotionEndDate: promotionEndDate.toLocaleString("en-PH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            }),
        });
        //then send email to all subscriber
        await sendMail({
            to: emailList,
            sub: `🔥 ${body.promotion_type}! Dont Miss Out!`,
            message: html,
        });

        return NextResponse.json({ status: 200, email: emailList })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ status: 500 })
    }
}