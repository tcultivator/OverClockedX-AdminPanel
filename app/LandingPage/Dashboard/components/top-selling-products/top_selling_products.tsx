'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
type topSellingProducts = {
  product_name: string;
  product_image: string;
  price: number;
  base_stocks: number;
  stocks: number;
  sales_count: number;
  created_at: Date
}
const Top_selling_products = () => {
  const [topSellingProducts, setTopSellingProducts] = useState<topSellingProducts[]>([])
  const [loading, setLoading] = useState(true)
  const now = new Date()
  const currentYear = now.getFullYear().toString()
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0")
  const [selectedDate, setSelectedDate] = useState<[string, string]>([currentYear, currentMonth])
  useEffect(() => {
    const fetch_top_selling_products_func = async () => {
      setLoading(true)
      try {
        const fetch_top_selling_products = await fetch(`/api/Dashboard/top-selling-products?year=${selectedDate[0]}&month=${selectedDate[1]}`, {
          method: 'GET'
        })
        const fetch_top_selling_products_result = await fetch_top_selling_products.json()
        if (fetch_top_selling_products_result.status == 500) return
        setTopSellingProducts(fetch_top_selling_products_result)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetch_top_selling_products_func()
  }, [selectedDate])
  return (
    <div className='w-full'>
      <Card className="pt-0 gap-0 border border-black/15">
        <CardHeader className="flex items-center  space-y-0 border-b py-5 sm:flex-row">
          <div className='flex items-center justify-between w-full'>
            <CardTitle className=''>Top Selling Products</CardTitle>
            <div>
              <Input type='month' defaultValue={`${selectedDate[0]}-${selectedDate[1]}`} onChange={(e) => {
                const [year, month] = e.target.value.split("-")
                setSelectedDate([year, month])
                console.log("Selected year and month:", [year, month])
              }} />
            </div>
          </div>

        </CardHeader>
        <CardContent className=" px-1 pb-0 mb-0 m-0 h-[23.5vh]">
          {loading ?
            <div className='flex flex-col gap-1 h-[23.5vh] p-1'>
              <Skeleton className="w-full h-full p-1 rounded" />
              <Skeleton className="w-full h-full p-1 rounded" />
              <Skeleton className="w-full h-full p-1 rounded" />
            </div> : (
              topSellingProducts?.length > 0 ?
                < ScrollArea className='flex flex-col max-h-[23.5vh] text-black/70'>
                  {topSellingProducts.map((data, index) => (
                    <div key={index} className='p-2 px-3 flex flex-col gap-1 w-full border-b border-black/15 items-center'>
                      <div className='flex justify-between w-full items-center'>
                        <div className='flex items-center gap-1'>
                          <Image src={data.product_image} alt='' width={200} height={200} className='w-[60px] rounded aspect-square' />
                          <div className='flex flex-col gap-1'>
                            <Label className='font-thin'>{data.product_name}</Label>
                            <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                              style: 'currency',
                              currency: 'PHP',
                            }).format(data.price)}</Label>
                          </div>
                        </div>

                        <div className='flex gap-5'>
                          <div className='flex flex-col gap-1'>
                            <Label className='font-thin text-[12px]'>{data.sales_count} sold</Label>
                            <Label className='font-thin text-[12px] text-black/70'>{data.stocks} left of {data.base_stocks}</Label>
                          </div>
                          <ProgressCircle size={40} progress={(data.stocks / data.base_stocks * 100)} className='text-black/50' />
                        </div>
                      </div>

                    </div>
                  ))}
                </ScrollArea>
                :
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Top Selling Products found
                </div>
            )

          }

        </CardContent>
      </Card>
    </div >
  )
}

export default Top_selling_products
