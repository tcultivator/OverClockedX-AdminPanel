"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ProgressCircle } from '@/components/upload/progress-circle'
import { MdWarning, MdInventory2, MdChevronRight } from "react-icons/md";

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
                const response = await fetch('/api/Dashboard/low-stocks-products')
                const results = await response.json()
                if (results.status !== 500) {
                    setLowStocksProducts(results)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchLowStocksProductsFunc()
    }, [])

    return (
        <div className='w-full h-full p-6 rounded bg-white text-slate-900 border border-black/15 flex flex-col'>

          
            <div className="flex justify-between items-start mb-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-100 relative">
                        <MdWarning className="text-xl text-rose-600 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Stock Alerts</h3>
                        <p className="text-[11px] text-slate-500 font-medium">Items requiring attention</p>
                    </div>
                </div>

               
                {!loading && lowStocksProducts.length > 0 && (
                    <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded-md border border-rose-200 uppercase tracking-wider">
                        {lowStocksProducts.length} Flagged
                    </span>
                )}
            </div>

            
            <div className="flex-1 min-h-0 relative">
                {loading ? (
                    <div className='flex flex-col gap-3'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100">
                                <Skeleton className="w-10 h-10 rounded-lg bg-slate-100" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-3/4 bg-slate-100" />
                                    <Skeleton className="h-2 w-1/4 bg-slate-100" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-full bg-slate-100" />
                            </div>
                        ))}
                    </div>
                ) : (
                    lowStocksProducts.length > 0 ? (
                        <ScrollArea className='h-full pr-4 -mr-4'>
                            <div className="flex flex-col gap-2.5 pb-2">
                                {lowStocksProducts.map((data, index) => {
                                    const percentage = (data.stocks / data.base_stocks) * 100;
                                    const isCritical = percentage <= 10;

                                    return (
                                        <div
                                            key={index}
                                            className={`
                                                group flex flex-col md:flex-row items-start gap-2 md:gap-0 md:items-center justify-start md:justify-between p-3 rounded-xl border transition-all duration-200
                                                ${isCritical
                                                    ? 'bg-rose-100 border-rose-200 hover:bg-rose-100 hover:border-rose-300'
                                                    : 'bg-amber-100 border-amber-200 hover:border-amber-300'
                                                }
                                            `}
                                        >
                                            
                                            <div className='flex items-center gap-3 flex-1 min-w-0'>
                                                <div className="relative shrink-0">
                                                    <div className={`absolute -inset-1 rounded-lg blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity ${isCritical ? 'bg-rose-400/20' : 'bg-amber-400/20'}`}></div>
                                                    <Image
                                                        src={data.product_image}
                                                        alt={data.product_name}
                                                        width={40}
                                                        height={40}
                                                        className={`relative w-10 h-10 rounded-lg object-cover border bg-white ${isCritical ? 'border-rose-200' : 'border-slate-200'}`}
                                                    />
                                                </div>

                                                <div className='flex flex-col min-w-0'>
                                                    <span className='font-semibold text-sm text-slate-800 truncate leading-tight'>
                                                        {data.product_name}
                                                    </span>
                                                    <span className='text-[11px] font-semibold text-slate-400 mt-0.5'>
                                                        {new Intl.NumberFormat('en-PH', {
                                                            style: 'currency',
                                                            currency: 'PHP',
                                                        }).format(data.price)}
                                                    </span>
                                                </div>
                                            </div>

                                            
                                            <div className='flex gap-4 items-center pl-2  w-full md:w-max justify-between md:justify-end '>
                                                <div className='flex flex-col items-end'>
                                                    <span className={`text-xs font-bold ${isCritical ? 'text-rose-600' : 'text-amber-600'}`}>
                                                        {data.stocks} left
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium">
                                                        of {data.base_stocks}
                                                    </span>
                                                </div>

                                                <div className="relative flex items-center justify-center">
                                                    <ProgressCircle
                                                        size={38}
                                                        progress={percentage}
                                                        strokeWidth={4}
                                                        className={isCritical ? 'text-rose-500' : 'text-amber-500'}
                                                    />
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-10">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                                <MdInventory2 className="text-3xl text-emerald-500" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800">All sets healthy</h4>
                            <p className="text-xs text-slate-500 mt-1 max-w-[180px]">No products are currently below the safety threshold.</p>
                        </div>
                    )
                )}
            </div>

            
            {!loading && lowStocksProducts.length > 0 && (
                <button className="mt-4 w-full py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2 group">
                    View Inventory Report
                    <MdChevronRight className="text-lg group-hover:translate-x-0.5 transition-transform" />
                </button>
            )}
        </div>
    )
}

export default Low_Stocks_Alert