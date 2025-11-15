import db from "@/lib/db";
import { connect } from "http2";
import { NextResponse, NextRequest } from "next/server";
import {sendMail} from '@/lib/sendGrid'
type ordersProductsData = {
    product_id: string;
    quantity: number;
}
type ProductsRow = {
    stocks: number;
}
export async function PUT(req: NextRequest) {
    const connection = await db.getConnection()
    try {
        const body = await req.json()
        await connection.beginTransaction()
        const [rows] = await connection.query('SELECT order_items.product_id,order_items.quantity FROM orders JOIN order_items ON orders.id = order_items.order_id WHERE orders.id = ?', [body.id])
        const ordersProducts = rows as ordersProductsData[]
        for (const item of ordersProducts) {
            const [product] = await connection.query(
                'SELECT stocks FROM products WHERE product_id = ?', [item.product_id]
            );
            const itemList = product as ProductsRow[]
            if (itemList.length === 0 || itemList[0].stocks < item.quantity) {
                //add better error handling, if no error handling to this, the loading keeps going
                throw new Error(`Not enough stock for product id : ${item.product_id}`)
            }
            await connection.query('UPDATE products SET stocks = stocks - ?, sales_count = sales_count + ? WHERE product_id = ?', [item.quantity, item.quantity, item.product_id])
        }
        await connection.query(`UPDATE orders SET order_status = 'preparing' WHERE id = ?`, [body.id])

        await connection.commit()
        await sendMail({
            to: body.email,
            sub: "Order Request Accepted",
            message: `
                    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%"
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

        <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #1a1a1a; color: #ffffff;">
                <h1 style="margin: 0 0 10px; font-size: 24px;">Order Request Accepted</h1>
                <p style="margin: 0; font-size: 14px; color: #cccccc;">
                    Your order is now being processed.
                </p>
            </td>
        </tr>

        <tr>
            <td style="padding: 40px; text-align: center;">
             <div style="font-size: 14px; color: #333333; margin-bottom: 30px; text-align: left; background-color: #fafafa; padding: 20px; border-radius: 6px;">
                    <p style="margin: 0 0 10px;"><strong>Reference ID:</strong> ${body.reference_id}</p>
                    <p style="margin: 0 0 10px;"><strong>Date of Order:</strong> ${body.created_at}</p>
                    <p style="margin: 0;"><strong>Total Amount:</strong> ${body.total_amount}</p>
                </div>
                <p style="font-size: 16px; color: #333333; margin-bottom: 30px;">
                    Your order request has been accepted and added to our processing queue.
                    We will notify you as soon as it moves to the next stage.
                </p>

                <p style="margin-top: 30px; font-size: 13px; color: #999999;">
                    If you have any questions, feel free to contact our support team.
                </p>
            </td>
        </tr>

        <tr>
            <td style="padding: 20px 40px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #888888;">
                If you did not place this order, you can contact support.
            </td>
        </tr>

    </table>
</div>
  `,
        });
        return NextResponse.json({ status: 200 })

    } catch (err) {
        await connection.rollback()
        console.log(err)
        return NextResponse.json({ status: 500 })
    } finally {
        connection.release()
    }
}