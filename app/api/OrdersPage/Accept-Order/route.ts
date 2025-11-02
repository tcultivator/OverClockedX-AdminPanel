import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import QRCode from "qrcode";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const query = `UPDATE orders SET order_status = 'preparing' WHERE id = ?`
        await db.query(query, [body.id])
        const QRCodeData = await QRCode.toDataURL(`http://192.168.100.60:3000/LandingPage/ReadyToShip?order_id=${body.id}`)
        console.log('eto laman ng qr code', QRCodeData)
        return NextResponse.json({ QRCodeData: QRCodeData })

    } catch (err) {
        return NextResponse.json({ status: 500 })
    }   
}