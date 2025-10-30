'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
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
  useEffect(() => {
    const fetch_top_selling_products_func = async () => {
      setLoading(true)
      try {
        const fetch_top_selling_products = await fetch('/api/Dashboard/top-selling-products', {
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
  }, [])
  return (
    <div className='w-full'>
      <Card className="pt-0 gap-0 border border-black/15">
        <CardHeader className="flex items-center  space-y-0 border-b py-5 sm:flex-row">
          <div className='flex items-center justify-between w-full'>
            <CardTitle className=''>Top Selling Products</CardTitle>
            <Select>
              <SelectTrigger
                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                aria-label="Select a range"
              >
                <SelectValue placeholder="2025" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </CardHeader>
        <CardContent className=" px-1 pb-0 mb-0 m-0 h-[23.5vh]">
          {loading ?
            <div className='flex flex-col gap-1 h-[23.5vh] p-1'>
              <Skeleton className="w-full h-full p-1 rounded" />
              <Skeleton className="w-full h-full p-1 rounded" />
              <Skeleton className="w-full h-full p-1 rounded" />
            </div> :
            <ScrollArea className='flex flex-col max-h-[23.5vh]'>
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
          }

        </CardContent>
      </Card>
    </div >
  )
}

export default Top_selling_products
