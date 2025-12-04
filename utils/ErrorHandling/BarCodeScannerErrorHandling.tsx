import React from "react";

export const BarCodeScannerErrorHandler: Record<
    "error" | "invalidBarCode" | "default",
    React.FC<{ message?: string }>
> = {

    error: ({ message }) => (
        <div className="p-6 text-center max-w-sm w-full bg-red-50 border border-red-200 rounded-xl shadow-sm animate-fadeIn">
            <div className="flex justify-center mb-3">
                <div className="bg-red-100 p-3 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <h2 className="text-lg font-semibold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{message ?? "Something went wrong! Please try again."}</p>
        </div>
    ),


    invalidBarCode: ({ message }) => (
        <div className="p-6 text-center max-w-sm w-full bg-orange-50 border border-orange-200 rounded-xl shadow-sm animate-fadeIn">
            <div className="flex justify-center mb-3">
                <div className="bg-orange-100 p-3 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 5a7 7 0 110 14 7 7 0 010-14z" />
                    </svg>
                </div>
            </div>
            <h2 className="text-lg font-semibold text-orange-700 mb-2">Invalid QR Code</h2>
            <p className="text-orange-600">{message ?? "Invalid Bar Code! Please scan a valid order code."}</p>
        </div>
    ),

    default: ({ message }) => (
        <div className="p-6 text-center max-w-sm w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm animate-fadeIn">
            <div className="flex justify-center mb-3">
                <div className="bg-gray-100 p-3 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                    </svg>
                </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Ready to Scan</h2>
            <p className="text-gray-600">
                {message ?? "Press Start Scanning to scan the BarCode and fetch products data"}
            </p>
        </div>
    ),
};
