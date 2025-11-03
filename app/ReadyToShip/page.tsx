"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { DotLoader } from 'react-spinners'
import { useOrderStore } from '@/stores/ordersStore'
import { socket } from '@/lib/socket-io'
const ReadyToShip = () => {
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id') || null
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setLoading(true)
    if (order_id == null) {
      setLoading(false)
      setError(true)
      return
    }
    const updateStatusToOnDelivery = async () => {
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
    updateStatusToOnDelivery()

  }, [])
  console.log(order_id)
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center animate-fadeIn">
          <DotLoader speedMultiplier={2} color="#1E3A8A" />
          <p className="mt-6 text-gray-600 text-base font-medium">
            Updating order status...
          </p>
        </div>
      )}

      {/* Success State */}
      {!loading && success && (
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-sm w-full animate-fadeIn border border-green-200">
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

      {/* Error State */}
      {!loading && error && (
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-sm w-full animate-fadeIn border border-red-200">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-red-700 mb-2">Update Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>


  )
}

export default ReadyToShip
