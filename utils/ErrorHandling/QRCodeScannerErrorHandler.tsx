import React from "react";

export const QRCodeScannerErrorHandler: Record<
  "success" | "error" | "notUpdated" | "invalidQR" | "default",
  React.FC<{ message?: string }>
> = {
  success: ({ message }) => (
    <div className="p-6 text-center max-w-sm w-full bg-green-50 border border-green-200 rounded-xl shadow-sm animate-fadeIn">
      <div className="flex justify-center mb-3">
        <div className="bg-green-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-green-700 mb-2">Order Updated</h2>
      <p className="text-green-600">
        {message ?? "The order status has been successfully changed to On Delivery."}
      </p>
    </div>
  ),

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

  notUpdated: ({ message }) => (
    <div className="p-6 text-center max-w-sm w-full bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm animate-fadeIn">
      <div className="flex justify-center mb-3">
        <div className="bg-yellow-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
          </svg>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-yellow-700 mb-2">Not Updated</h2>
      <p className="text-yellow-700">
        {message ?? "Unable to update status. This order has already been processed!"}
      </p>
    </div>
  ),

  invalidQR: ({ message }) => (
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
      <p className="text-orange-600">{message ?? "Invalid QR Code! Please scan a valid order code."}</p>
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
        {message ?? "Press Start Scanning to scan the receipt and update order status to On Delivery."}
      </p>
    </div>
  ),
};
