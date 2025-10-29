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

    useEffect(() => {
        const fetch_popular_product_func = async () => {
            try {
                setLoading(true)
                const fetch_popular_product = await fetch(`/api/Dashboard/popular-product?year=${selectedDate[0]}&month=${selectedDate[1]}`, {
                    method: 'GET'
                })
                const popular_product_result = await fetch_popular_product.json()
                if (popular_product_result.status != 500) {
                    setLoading(false)
                    setPopular_product(popular_product_result)// set the result data from api to state that display the product
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetch_popular_product_func()
    }, [selectedDate])//every time selectedDate changes this run the useEffect that has fetch queries to get the popular products


    return (
        <div className="rounded-[15px] shadow-sm bg-white h-[31%]">

            <div className="w-full p-3 px-5 border-b flex justify-between items-center">
                <div>
                    <Label className="text-[15px] font-semibold">Popular Products</Label>
                </div>
                <div>
                    <Input type='month' defaultValue={`${selectedDate[0]}-${selectedDate[1]}`} onChange={(e) => {
                        const [year, month] = e.target.value.split("-")
                        setSelectedDate([year, month])
                        console.log("Selected year and month:", [year, month])
                    }} />
                </div>

            </div>


            <div className="h-[75%] box-border">
                {loading ? (

                    <div className="flex h-[23vh]">
                        <div className="w-[40%]">
                            <Skeleton className="w-full h-full rounded-l-[15px]" />
                        </div>
                        <div className="w-[60%] flex flex-col justify-center gap-3 px-4">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/3" />
                            <div className="flex items-center gap-2 mt-2">
                                <Skeleton className="h-3 w-1/2" />
                                <Skeleton className="h-30 w-30 rounded-full" />
                            </div>
                        </div>
                    </div>
                ) : popular_product?.length > 0 ? (

                    <div className="flex h-[23vh]">
                        <div className="w-[40%]">
                            <Image
                                src={popular_product[0]?.product_image}
                                alt={popular_product[0]?.product_name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover rounded-l-[15px]"
                            />
                        </div>

                        <div className="w-[60%] flex flex-col justify-center">
                            <Label className="text-lg font-medium">
                                {popular_product[0]?.product_name}
                            </Label>
                            <Label className="text-gray-600 text-sm">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(popular_product[0]?.price)}
                            </Label>

                            <div className='flex items-center justify-start gap-2 pr-5'>
                                <Label className='font-thin text-[12px]'>{popular_product[0].sales_count} sold, out of {popular_product[0].base_stocks}</Label>
                                <ProgressCircle size={100} strokeWidth={15} progress={(popular_product[0].sales_count / popular_product[0].base_stocks * 100)} className='text-black/50 ' />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Fallback if no data
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No popular products found
                    </div>
                )}
            </div>
        </div>

    )
}

export default Popular_Product
