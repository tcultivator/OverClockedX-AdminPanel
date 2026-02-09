import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { useProductsStore } from '@/stores/productsStore'
import { Html5QrcodeScanner } from "html5-qrcode";
import { PulseLoader } from 'react-spinners'
import { QRCodeScannerErrorHandler } from '@/utils/ErrorHandling/QRCodeScannerErrorHandler'
import { BarCodeScannerErrorHandler } from '@/utils/ErrorHandling/BarCodeScannerErrorHandling'
type addedProductsType = {
    product_id: string;
    product_name: string;
    product_image: string;
    price: number;
    category: string;
    brand: string;
    stocks: number;
    description: string;
}
const BarCodeScanner = ({ setAddedProducts, setUseBarCode }: { setAddedProducts: React.Dispatch<React.SetStateAction<addedProductsType>>, setUseBarCode: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false)
    const [errorHandlingMessage, setErrorHandlingMessage] = useState<"error" | "invalidBarCode" | "default">("default")
    const BarCodeScannerErrorHandlerComponents = BarCodeScannerErrorHandler[errorHandlingMessage] ?? BarCodeScannerErrorHandler.default
    useEffect(() => {
        if (isScanning) {
            const newScanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 400, height: 150 }, rememberLastUsedCamera: true, },
                false
            );

            const onScanSuccess = (decodedText: string) => {
                console.log(decodedText)

                if (decodedText) {
                    addProductsUsingBarCode(decodedText)

                } else {
                    setErrorHandlingMessage('invalidBarCode')
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

    const addProductsUsingBarCode = async (product_id: string) => {
        setLoadingScan(true)
        console.log('eto ung laman ng barcode: ', product_id)
        const addUsingBarCode = await fetch('/api/addProducts/addProductsUsingBarCode', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ UPC: product_id })
        })
        const addUsingBarCode_result = await addUsingBarCode.json()
        if (addUsingBarCode_result.status == 500) {
            setLoadingScan(false)
            alert('error scan')
        }
        setLoadingScan(false)
        setAddedProducts({
            product_id: addUsingBarCode_result.data.product_id,
            product_name: addUsingBarCode_result.data.product_name,
            product_image: addUsingBarCode_result.data.product_image,
            price: addUsingBarCode_result.data.price,
            category: addUsingBarCode_result.data.category,
            brand: addUsingBarCode_result.data.brand,
            stocks: 0,
            description: addUsingBarCode_result.data.description
        })
        setUseBarCode(false)


    }
    return (
        <div className="flex flex-col items-center justify-center p-4 items-center w-full gal-2">
            {!isScanning && (
                <div className="bg-white p-2 rounded-[15px] flex flex-col gap-2 shadow-md max-w-[400px]">
                    {loadingScan ? (
                        <div className="flex flex-col items-center animate-fadeIn p-4   ">
                            <PulseLoader speedMultiplier={2} color="#fa8eb2" />
                            <p className="mt-6 text-gray-600 text-base font-medium">
                                Fetch Products Data...
                            </p>
                        </div>
                    ) :
                        <BarCodeScannerErrorHandlerComponents />
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
            {isScanning && <div id="reader" className="w-full h-full max-w-[600px] max-h-[600px]" />}
        </div>
    )
}

export default BarCodeScanner
