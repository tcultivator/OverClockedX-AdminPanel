import db from "@/lib/db";
import { connect } from "http2";
import { NextResponse, NextRequest } from "next/server";
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
                throw new Error(`Not enough stock for product id : ${item.product_id}`)
            }
            await connection.query('UPDATE products SET stocks = stocks - ?, sales_count = sales_count + ? WHERE product_id = ?', [item.quantity, item.quantity, item.product_id])
        }
        await connection.query(`UPDATE orders SET order_status = 'preparing' WHERE id = ?`, [body.id])

        await connection.commit()
        return NextResponse.json({ status: 200 })

    } catch (err) {
        await connection.rollback()
        return NextResponse.json({ status: 500 })
    } finally {
        connection.release()
    }
}