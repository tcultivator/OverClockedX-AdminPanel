"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { MdTrendingUp, MdCalendarMonth, MdStorefront, MdOutlineInventory2 } from "react-icons/md";
import { Label } from '@/components/ui/label'
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
                const response = await fetch(`/api/Dashboard/popular-product?year=${selectedDate[0]}&month=${selectedDate[1]}`)
                const result = await response.json()

                if (result.status !== 500 && result.length > 0) {
                    setPopular_product(result)
                    setLoading(false)

                    
                    let start = 0;
                    const targetValue = (result[0].stocks / result[0].base_stocks) * 100;
                    const duration = 800; 
                    const stepTime = 15;
                    const increment = targetValue / (duration / stepTime);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= targetValue) {
                            setAnimatedProgress(targetValue);
                            clearInterval(timer);
                        } else {
                            setAnimatedProgress(start);
                        }
                    }, stepTime);

                    return () => clearInterval(timer);
                } else {
                    setLoading(false);
                    setPopular_product([]);
                }
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetch_popular_product_func()
    }, [selectedDate])

    return (
        <div className="w-full flex-1 h-full p-6 rounded bg-white text-slate-900 border border-black/15  transition-all">

           
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/20 rounded-lg border border-primary/30">
                        <MdTrendingUp className="text-xl text-primary" />
                    </div>
                    <div>
                        <Label className="text-sm font-bold text-slate-800 uppercase tracking-tight">Top Performer</Label>
                        <p className="text-[11px] text-slate-500 font-medium">Monthly Best Seller</p>
                    </div>
                </div>

                
                <div className="relative group w-full sm:w-auto">
                    <MdCalendarMonth className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors z-10" />
                    <Input
                        type='month'
                        className="pl-9 bg-slate-50 border-slate-200 text-slate-700 h-10 text-xs w-full sm:w-44 rounded-lg focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 transition-all cursor-pointer"
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

           
            <div className="relative">
                {loading ? (
                    <div className="flex flex-col sm:flex-row gap-6 items-center ">
                        <Skeleton className="h-28 w-28 rounded-2xl bg-slate-200  border border-gray-700/20" />
                        <div className="flex-1 space-y-3 w-full">
                            <Skeleton className="h-7 w-3/4 bg-slate-200 border border-gray-700/20" />
                            <Skeleton className="h-5 w-1/3 bg-slate-200 border border-gray-700/20" />
                            <Skeleton className="h-8 w-full bg-slate-200 border border-gray-700/20" />
                        </div>
                        <Skeleton className="h-20 w-20 rounded-full bg-slate-200 border border-gray-700/20" />
                    </div>
                ) : popular_product?.length > 0 ? (
                    <div className="flex flex-col sm:flex-row items-center gap-8">

                       
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-primary rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-2xl border border-slate-100 shadow-md">
                                <Image
                                    src={popular_product[0]?.product_image}
                                    alt={popular_product[0]?.product_name}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition duration-500"
                                />
                            </div>
                        </div>

                       
                        <div className="flex-1 text-center sm:text-left">
                            <Label className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-1">
                                {popular_product[0]?.product_name}
                            </Label>
                            <Label className="text-emerald-600 font-semibold text-xl mb-4">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(popular_product[0]?.price)}
                            </Label>

                            
                            <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                                <MdStorefront className="text-slate-400 text-lg" />
                                <span className="text-xs text-slate-600 font-medium">
                                    <span className="font-bold text-slate-900">{popular_product[0].total_orders}</span> units sold in {new Date(0, Number(selectedDate[1]) - 1).toLocaleString('default', { month: 'long' })}
                                </span>
                            </div>
                        </div>

                       
                        <div className='flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 min-w-[140px]'>
                            <div className="relative">
                                <ProgressCircle
                                    size={75}
                                    strokeWidth={8}
                                    progress={parseFloat(animatedProgress.toFixed(2))}
                                    className='text-primary'
                                />
                               
                            </div>
                            <div className="flex items-center gap-1.5 mt-3">
                                <MdOutlineInventory2 className="text-slate-400 text-xs" />
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">In Stock</span>
                            </div>
                        </div>
                    </div>
                ) : (
                  
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                            <MdStorefront className="text-4xl text-slate-300" />
                        </div>
                        <span className="text-sm font-medium">No sales data found for this period</span>
                        <p className="text-xs text-slate-400 mt-1">Try selecting a different month</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Popular_Product