"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { MdTrendingUp, MdCalendarMonth, MdStorefront } from "react-icons/md";

type popularProducts = {
    product_id: string;
    product_name: string;
    product_image: string;
    price: number;
    stocks: number;
    base_stocks: number;
    sales_count: number;
    total_orders: number;
}

const Popular_Product = () => {
    const [popular_product, setPopular_product] = useState<popularProducts[]>([])
    const [loading, setLoading] = useState(true)

    const now = new Date()
    const currentYear = now.getFullYear().toString()
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0")
    const [selectedDate, setSelectedDate] = useState<[string, string]>([currentYear, currentMonth])
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const fetch_popular_product_func = async () => {
            try {
                setLoading(true)
                setAnimatedProgress(0)
                const fetch_popular_product = await fetch(`/api/Dashboard/popular-product?year=${selectedDate[0]}&month=${selectedDate[1]}`, {
                    method: 'GET'
                })
                const popular_product_result = await fetch_popular_product.json()

                if (popular_product_result.status != 500 && popular_product_result.length > 0) {
                    setLoading(false)
                    setPopular_product(popular_product_result)

                    // Animation logic
                    let start = 0;
                    const end = (popular_product_result[0].stocks / popular_product_result[0].base_stocks) * 100;
                    const duration = 200;
                    const stepTime = 10;
                    const increment = end / (duration / stepTime);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setAnimatedProgress(parseFloat(start.toFixed(2)));
                    }, stepTime);

                    return () => clearInterval(timer);
                } else {
                    // Handle empty or error
                    setLoading(false);
                    setPopular_product([]);
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        fetch_popular_product_func()
    }, [selectedDate])

    return (
        <div className="w-full flex-1 h-full p-6 rounded bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl border border-gray-700/50">

            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <MdTrendingUp className="text-xl text-amber-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Top Performer</span>
                </div>

                {/* Styled Date Input */}
                <div className="relative group">
                    <MdCalendarMonth className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-white transition-colors z-10" />
                    <Input
                        type='month'
                        className="pl-9 bg-gray-800 border-gray-700 text-white h-9 text-xs w-auto focus:border-amber-500 focus:ring-amber-500/20 hover:bg-gray-700/80 transition-all"
                        defaultValue={`${selectedDate[0]}-${selectedDate[1]}`}
                        onChange={(e) => {
                            if (e.target.value) {
                                const [year, month] = e.target.value.split("-")
                                setSelectedDate([year, month])
                            }
                        }}
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="box-border">
                {loading ? (
                    <div className="flex gap-4 items-center">
                        <Skeleton className="h-24 w-24 rounded-xl bg-gray-700/50" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-3/4 bg-gray-700/50" />
                            <Skeleton className="h-4 w-1/2 bg-gray-700/50" />
                        </div>
                        <Skeleton className="h-16 w-16 rounded-full bg-gray-700/50" />
                    </div>
                ) : popular_product?.length > 0 ? (
                    <div className="flex flex-col sm:flex-row items-center gap-6">

                        {/* Image Section */}
                        <div className="relative w-full sm:w-[35%] aspect-square max-w-[120px]">
                            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-20"></div>
                            <Image
                                src={popular_product[0]?.product_image}
                                alt={popular_product[0]?.product_name}
                                width={500}
                                height={500}
                                className="relative w-full h-full object-cover rounded-xl border border-gray-600 shadow-2xl"
                            />
                        </div>

                        {/* Text Details */}
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-white tracking-tight leading-tight mb-1">
                                {popular_product[0]?.product_name}
                            </h3>
                            <p className="text-amber-400 font-medium text-lg mb-3">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(popular_product[0]?.price)}
                            </p>

                            {/* Stats Badge */}
                            <div className="inline-flex items-center gap-2 bg-gray-700/40 px-3 py-1.5 rounded-lg border border-gray-600/50">
                                <MdStorefront className="text-gray-400" />
                                <span className="text-xs text-gray-300">
                                    <span className="font-bold text-white">{popular_product[0].total_orders}</span> Sold in {new Date(0, Number(selectedDate[1]) - 1).toLocaleString('en-GB', { month: 'short' })}
                                </span>
                            </div>
                        </div>

                        {/* Progress Circle Section */}
                        <div className='flex flex-col items-center justify-center sm:w-[25%]'>
                            <div className="relative">
                                <ProgressCircle
                                    size={80}
                                    strokeWidth={8}
                                    progress={parseFloat(animatedProgress.toFixed(2))}
                                    className='text-[#ffbb00] font-bold'
                                />
                            </div>
                            <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wide font-medium">Stock Level</span>
                        </div>
                    </div>
                ) : (
                    // Fallback State
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                        <MdStorefront className="text-4xl mb-2 opacity-50" />
                        <span className="text-sm">No data available for this month</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Popular_Product