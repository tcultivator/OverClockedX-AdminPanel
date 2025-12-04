"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

import { Button } from "@/components/ui/button";
import { socket } from '@/lib/socket-io'
import { PulseLoader } from 'react-spinners'
import { QRCodeScannerErrorHandler } from '@/utils/ErrorHandling/QRCodeScannerErrorHandler'
const QRCodeScanner = () => {
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorHandlingMessage, setErrorHandlingMessage] = useState<"success" | "error" | "notUpdated" | "invalidQR" | "default">("default")
    useEffect(() => {
        if (isScanning) {
            const newScanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 }, rememberLastUsedCamera: true, },
                false
            );

            const onScanSuccess = (decodedText: string) => {
                console.log(decodedText)
                const checkQR = decodedText.split('order_id')
                if (checkQR.length > 1) {
                    const splitData = decodedText.split('=')
                    updateStatusToOnDelivery(splitData[1])
                } else {
                    setErrorHandlingMessage('invalidQR')
                }
                setScannedCode(decodedText)
                setIsScanning(false); // hide scanner
                newScanner.clear();   // stop the camera
            };

            const onScanFailure = () => { }; 
            newScanner.render(onScanSuccess, onScanFailure);
            setScanner(newScanner);

            // cleanup
            return () => {
                newScanner.clear().catch(() => { });
            };
        }
    }, [isScanning]);

    const StartScan = () => {
        setScannedCode(null);
        setIsScanning(true);
    };

    const updateStatusToOnDelivery = async (order_id: string) => {
        setLoading(true)
        const update_status_on_delivery = await fetch('/api/OrdersPage/Update-status-on-delivery', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ order_id: order_id })
        })
        const update_status_on_delivery_result = await update_status_on_delivery.json()
        setErrorHandlingMessage(update_status_on_delivery_result.message)
        if (update_status_on_delivery_result.message == 'success') {
            socket.emit('QrCodeScan', order_id)
            setLoading(false)
        }
        setLoading(false)


    }
    const QRCodeScannerErrorHandlerComponents = QRCodeScannerErrorHandler[errorHandlingMessage] ?? QRCodeScannerErrorHandler.default



    return (
        <div className="flex flex-col items-center justify-center p-4 items-center w-full gal-2">
            {!isScanning && (
                <div className="bg-white p-2 rounded-[15px] flex flex-col gap-2 shadow-md w-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center animate-fadeIn p-4   ">
                            <PulseLoader speedMultiplier={2} color="#fa8eb2" />
                            <p className="mt-6 text-gray-600 text-base font-medium">
                                Updating order status...
                            </p>
                        </div>
                    ) :
                        <QRCodeScannerErrorHandlerComponents />
                    }


                    <Button
                        onClick={StartScan}
                        className="cursor-pointer"
                    >
                        {scannedCode ? "Scan Again" : "Start Scanning"}
                    </Button>
                </div>
            )}

            {/* Only show scanner when active */}
            {isScanning && <div id="reader" className="w-[600px] h-[600px]" />}
        </div>
    );
};

export default QRCodeScanner;
