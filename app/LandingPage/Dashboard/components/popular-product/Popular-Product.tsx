"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { Input } from '@/components/ui/input'
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
    const [popular_product, setPopular_product] = useState<popularProducts[]>([])// this is the state that hold the popular product data
    const [loading, setLoading] = useState(true)
    //this get current date for passing the default value for selectedDate, which is needed to get the popular products of that date
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
                if (popular_product_result.status != 500) {
                    setLoading(false)
                    setPopular_product(popular_product_result)// set the result data from api to state that display the product


                    // animated progress in popular products
                    let start = 0;
                    const end = (popular_product_result[0].stocks / popular_product_result[0].base_stocks) * 100;

                    const duration = 200; // animation duration in ms
                    const stepTime = 10;  // interval speed
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


                }
            } catch (err) {
                console.log(err)
            }
        }
        fetch_popular_product_func()
    }, [selectedDate])//every time selectedDate changes this run the useEffect that has fetch queries to get the popular products


    return (
        <div className="rounded bg-white h-full border border-black/15">

            <div className="w-full p-3 px-5 border-b flex justify-between items-center">
                <div>
                    <Label className="text-[15px] text-primary font-semibold">Popular Product</Label>
                </div>
                <div>
                    <Input type='month' defaultValue={`${selectedDate[0]}-${selectedDate[1]}`} onChange={(e) => {
                        const [year, month] = e.target.value.split("-")
                        setSelectedDate([year, month])
                        console.log("Selected year and month:", [year, month])
                    }} />
                </div>

            </div>


            <div className="box-border">
                {loading ? (
                    <div className="flex  p-2 items-center">
                        <div className="w-[40%]">
                            <Skeleton className="h-50 w-full" />
                        </div>
                        <div className="w-[30%] flex flex-col justify-center gap-3 px-4">
                            <Skeleton className="h-30 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-center gap-2 mt-2 w-[30%] flex-col">

                            <Skeleton className="h-40 w-40 rounded-full" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                ) : popular_product?.length > 0 ? (

                    <div className="flex items-center">
                        <div className="w-[40%]">
                            <Image
                                src={popular_product[0]?.product_image}
                                alt={popular_product[0]?.product_name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover rounded-l-[15px]"
                            />
                        </div>

                        <div className="w-[30%] flex flex-col justify-center">
                            <Label className="text-4xl font-medium font-anton">
                                {popular_product[0]?.product_name}
                            </Label>
                            <Label className="text-black/70 text-sm font-thin">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(popular_product[0]?.price)}
                            </Label>


                        </div>
                        <div className='flex items-center flex-col justify-center gap-2 w-[30%]'>
                            <ProgressCircle size={140} strokeWidth={25} progress={parseFloat(animatedProgress.toFixed(2))} className='text-black/50 ' />
                            <Label className='font-thin text-[12px] text-black/70'>{popular_product[0].total_orders} Sold in {new Date(0, Number(selectedDate[1]) - 1).toLocaleString('en-GB', { month: 'long' })}</Label>
                        </div>
                    </div>
                ) : (
                    // Fallback if no data
                    <div className="flex items-center justify-center h-full  text-gray-400">
                        No popular products found
                    </div>
                )}
            </div>
        </div>

    )
}

export default Popular_Product
