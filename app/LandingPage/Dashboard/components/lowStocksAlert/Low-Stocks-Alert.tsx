"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ProgressCircle } from '@/components/upload/progress-circle'
import { MdWarning, MdInventory2, MdArrowForward } from "react-icons/md";

type lowStocksProducts = {
    product_id: string;
    product_name: string;
    product_image: string;
    price: number;
    stocks: number;
    base_stocks: number;
}

const Low_Stocks_Alert = () => {
    const [lowStocksProducts, setLowStocksProducts] = useState<lowStocksProducts[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLowStocksProductsFunc = async () => {
            setLoading(true)
            try {
                const fetchLowStocksProducts = await fetch('/api/Dashboard/low-stocks-products', {
                    method: 'GET'
                })
                const low_stocks_products_results = await fetchLowStocksProducts.json()
                if (low_stocks_products_results.status != 500) {
                    setLowStocksProducts(low_stocks_products_results)
                }
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        fetchLowStocksProductsFunc()
    }, [])

    return (
        <div className='w-full h-full p-6 rounded bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl border border-gray-700/50 flex flex-col'>

            {/* Header Section */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 animate-pulse">
                        <MdWarning className="text-xl text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wide">Low Stock Alert</h3>
                        <p className="text-[10px] text-gray-400">Restock recommended</p>
                    </div>
                </div>

                {/* Count Badge */}
                {!loading && lowStocksProducts.length > 0 && (
                    <span className="bg-red-500/20 text-red-300 text-xs font-bold px-2.5 py-1 rounded-full border border-red-500/30">
                        {lowStocksProducts.length} Items
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
                {loading ? (
                    <div className='flex flex-col gap-3 h-full'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-2 rounded-xl border border-gray-800">
                                <Skeleton className="w-10 h-10 rounded-lg bg-gray-700/50" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-3/4 bg-gray-700/50" />
                                    <Skeleton className="h-2 w-1/2 bg-gray-700/50" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-full bg-gray-700/50" />
                            </div>
                        ))}
                    </div>
                ) : (
                    lowStocksProducts.length > 0 ? (
                        <ScrollArea className='h-full pr-4 -mr-4'>
                            <div className="flex flex-col gap-3 pb-2">
                                {lowStocksProducts.map((data, index) => {
                                    const percentage = (data.stocks / data.base_stocks) * 100;
                                    const isCritical = percentage <= 10;

                                    return (
                                        <div
                                            key={index}
                                            className={`
                                                group flex items-center justify-between p-3 rounded-xl border transition-all duration-300
                                                ${isCritical
                                                    ? 'bg-red-950/20 border-red-500/30 hover:bg-red-900/30'
                                                    : 'bg-gray-800/40 border-gray-700/30 hover:bg-gray-700/60'
                                                }
                                            `}
                                        >
                                            {/* Left: Image & Text */}
                                            <div className='flex items-center gap-3 flex-1 min-w-0'>
                                                <div className="relative shrink-0">
                                                    <Image
                                                        src={data.product_image}
                                                        alt={data.product_name}
                                                        width={200}
                                                        height={200}
                                                        className={`w-10 h-10 rounded-lg object-cover border ${isCritical ? 'border-red-500/40' : 'border-gray-600'}`}
                                                    />
                                                    {isCritical && (
                                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-gray-900"></div>
                                                    )}
                                                </div>

                                                <div className='flex flex-col min-w-0'>
                                                    <span className='font-medium text-sm text-gray-200 truncate group-hover:text-white transition-colors'>
                                                        {data.product_name}
                                                    </span>
                                                    <span className='font-medium text-xs text-gray-500'>
                                                        {new Intl.NumberFormat('en-PH', {
                                                            style: 'currency',
                                                            currency: 'PHP',
                                                        }).format(data.price)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right: Stats & Circle */}
                                            <div className='flex gap-4 items-center pl-2'>
                                                <div className='flex flex-col items-end'>
                                                    <span className={`text-xs font-bold ${isCritical ? 'text-red-400' : 'text-orange-400'}`}>
                                                        {data.stocks} Left
                                                    </span>
                                                    <span className="text-[10px] text-gray-500">
                                                        of {data.base_stocks}
                                                    </span>
                                                </div>

                                                {/* 
                                                    Adjusted ProgressCircle styles for Dark Mode.
                                                    Assuming className allows text color changes for the stroke.
                                                */}
                                                <div className="relative">
                                                    <ProgressCircle
                                                        size={40}
                                                        progress={percentage}
                                                        strokeWidth={4}
                                                        className={isCritical ? 'text-red-500' : 'text-orange-400'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
                            <MdInventory2 className="text-4xl opacity-20 text-emerald-500" />
                            <span className="text-sm">Stock levels are healthy</span>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Low_Stocks_Alert