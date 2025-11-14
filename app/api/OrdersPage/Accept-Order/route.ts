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
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>Thank you for your order!</h2>
                        <p>Your order request has been accepted.</p>
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