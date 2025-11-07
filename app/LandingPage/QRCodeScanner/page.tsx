"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { socket } from '@/lib/socket-io'
import { DotLoader } from 'react-spinners'
const QRCodeScanner = () => {
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (isScanning) {
            const newScanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 }, rememberLastUsedCamera: true, },
                false
            );

            const onScanSuccess = (decodedText: string) => {
                const splitData = decodedText.split('=')
                //authenticate the order id first, if has order id then do put request, then if no order id and authetication failed, display an error message
                updateStatusToOnDelivery(splitData[1])
                setScannedCode(decodedText)
                setIsScanning(false); // hide scanner
                newScanner.clear();   // stop the camera
            };

            const onScanFailure = () => { }; // silence errors
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
        if (update_status_on_delivery_result.status == 500) return
        socket.emit('QrCodeScan', order_id)
        setSuccess(true)
        setError(false)
        setLoading(false)

    }

    return (
        <div className="flex flex-col items-center justify-center p-4 items-center w-full gal-2">
            {!isScanning && (
                <>
                    {loading && (
                        <div className="flex flex-col items-center animate-fadeIn">
                            <DotLoader speedMultiplier={2} color="#1E3A8A" />
                            <p className="mt-6 text-gray-600 text-base font-medium">
                                Updating order status...
                            </p>
                        </div>
                    )}
                    {!loading && success && (
                        <div className="p-8 text-center max-w-sm w-full animate-fadeIn">
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h1 className="text-2xl font-semibold text-green-700 mb-2">
                                Order Updated!
                            </h1>
                            <p className="text-gray-600 mb-6">
                                The order status has been successfully changed to <strong>On Delivery</strong>.
                            </p>

                        </div>
                    )}

                    <Button
                        onClick={StartScan}
                        className="cursor-pointer"
                    >
                        {scannedCode ? "Scan Again" : "Start Scanning"}
                    </Button>
                </>
            )}

            {/* Only show scanner when active */}
            {isScanning && <div id="reader" className="w-[600px] h-[600px]" />}
        </div>
    );
};

export default QRCodeScanner;
