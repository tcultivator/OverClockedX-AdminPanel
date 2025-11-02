"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { IoAlertSharp } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton"
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
        <div className='w-full h-[35%]'>
            <Card className="pt-0 gap-0 border border-black/15">
                <CardHeader className="flex items-center  py-3 sm:flex-row">
                    <div className='flex items-center justify-between w-full gap-1'>
                        <CardTitle className=''>Low Stocks Alert</CardTitle>
                        <div className='bg-red-400 flex justify-center items-center p-2 rounded-[50%]'>
                            <IoAlertSharp className='text-white' />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className=" px-1 pb-0 mb-0 m-0 h-[25.1vh] border-t">
                    {
                        loading ?
                            <div className='flex flex-col max-h-[25.1vh] gap-1 p-1 h-full'>
                                <Skeleton className="w-full h-full p-1 rounded" />
                                <Skeleton className="w-full h-full p-1 rounded" />
                                <Skeleton className="w-full h-full p-1 rounded" />
                                <Skeleton className="w-full h-full p-1 rounded" />
                            </div> : (
                                lowStocksProducts.length > 0 ?
                                    <ScrollArea className='flex flex-col max-h-[25.1vh] text-black/70'>
                                        {lowStocksProducts.map((data, index) => (
                                            <div key={index} className='p-2 px-3 flex flex-col gap-1 w-full border-b border-black/15 items-center'>
                                                <div className='p-1 flex justify-between w-full items-center'>
                                                    <div className='flex items-center gap-1'>
                                                        <Image src={data.product_image} alt='' width={200} height={200} className='w-[40px] rounded aspect-square' />
                                                        <div className='flex flex-col gap-1'>

                                                            <Label className='font-thin '>{data.product_name}</Label>
                                                            <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            }).format(data.price)}</Label>
                                                        </div>
                                                    </div>

                                                    <div className='flex gap-5 items-center'>
                                                        <div className='flex flex-col gap-1'>
                                                            <Label className={`font-thin text-[12px] ${data.stocks <= data.base_stocks / 10 ? 'text-[#fa6093]' : 'text-orange-400'} `}>{data.stocks} / {data.base_stocks}</Label>
                                                        </div>
                                                        <ProgressCircle size={40} progress={(data.stocks / data.base_stocks * 100)} className='text-black/50 ' />
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </ScrollArea> :
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No Low Stocks Products Found
                                    </div>
                            )

                    }

                </CardContent>
            </Card>
        </div>
    )
}

export default Low_Stocks_Alert
