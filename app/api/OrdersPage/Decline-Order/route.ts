import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from '@/lib/sendGrid'
type ResultInAuthenticateQueryType = {
    selectedOrders: number
}
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const authenticateQuery = 'SELECT COUNT(*) AS selectedOrders FROM orders WHERE id = ? && order_status = ?'
        const [rows] = await db.query(authenticateQuery, [body.order_id, 'pending'])
        const selectedOrders = rows as ResultInAuthenticateQueryType[]
        if (selectedOrders[0].selectedOrders == 0) {
            return NextResponse.json({ type: 'warning', message: 'Warning! this order is already proccessed and unable to decline!' })
        }
        const query = `UPDATE orders SET order_status = 'cancel' WHERE id = ?`
        await db.query(query, [body.order_id])

        await sendMail({
            to: [body.email],
            sub: "Order Request Declined",
            message: `
                    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%"
        style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

        <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #8b0000; color: #ffffff;">
                <h1 style="margin: 0 0 10px; font-size: 24px;">Order Request Declined</h1>
                <p style="margin: 0; font-size: 14px; color: #ffdddd;">
                    Unfortunately, we could not process your order.
                </p>
            </td>
        </tr>

        <tr>
            <td style="padding: 40px; text-align: center;">

                <!-- Order Information Section -->
                <div style="font-size: 14px; color: #333333; margin-bottom: 30px; text-align: left; background-color: #fafafa; padding: 20px; border-radius: 6px;">
                    <p style="margin: 0 0 10px;"><strong>Reference ID:</strong> ${body.reference_id}</p>
                    <p style="margin: 0 0 10px;"><strong>Date of Order:</strong> ${body.created_at}</p>
                    <p style="margin: 0;"><strong>Total Amount:</strong> ${body.total_amount}</p>
                </div>

                <p style="font-size: 16px; color: #333333; margin-bottom: 30px;">
                    We’re sorry, but your order request has been declined. This may occur due to invalid information, unavailable items, or other processing issues.
                </p>

                <p style="font-size: 16px; color: #333333; margin-bottom: 30px;">
                    If you believe this is a mistake or would like to try again, please contact our support team for assistance.
                </p>

                <p style="margin-top: 30px; font-size: 13px; color: #999999;">
                    We’re here to help if you need further clarification.
                </p>
            </td>
        </tr>

        <tr>
            <td style="padding: 20px 40px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #888888;">
                If you did not place an order, no further action is required.
            </td>
        </tr>

    </table>
</div>
  `,
        });
        return NextResponse.json({ type: 'success', message: 'The order Request is successfuly decline!' })
    }
    catch (err) {
        return NextResponse.json({ type: 'error', message: 'Something went wrong in our end!' })
    }
}