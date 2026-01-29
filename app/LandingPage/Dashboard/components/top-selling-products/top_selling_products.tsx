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
import { topSellingProducts } from '@/types/topSellingProductsType'

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
    <div className='w-full h-full '>
      <Card className="pt-0 gap-0  h-full">
        <CardHeader className="flex items-center  space-y-0 border-b py-5 sm:flex-row">
          <div className='flex items-center justify-between w-full'>
            <CardTitle className='text-primary'>Top Selling Products</CardTitle>
            <div>
              <Input type='month' defaultValue={`${selectedDate[0]}-${selectedDate[1]}`} onChange={(e) => {
                const [year, month] = e.target.value.split("-")
                setSelectedDate([year, month])
                console.log("Selected year and month:", [year, month])
              }} />
            </div>
          </div>

        </CardHeader>
        <CardContent className=" flex-1 p-1 ">
          {loading ?
            <div className='flex flex-col gap-1 h-[23.5vh] p-1'>
              <Skeleton className="w-full h-full p-1 rounded" />
              <Skeleton className="w-full h-full p-1 rounded" />
              <Skeleton className="w-full h-full p-1 rounded" />
            </div> : (
              topSellingProducts?.length > 0 ?
                <ScrollArea className="flex flex-col  overflow-y-auto">
                  {topSellingProducts.map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 mb-2 bg-white  shadow-sm hover:shadow-md transition-shadow"
                    >

                      <div className="flex items-center gap-3">
                        <Image
                          src={data.product_image}
                          alt={data.product_name}
                          width={200}
                          height={200}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <Label className="font-semibold text-sm truncate max-w-[150px]">
                            {data.product_name}
                          </Label>
                          <Label className="font-thin text-xs text-gray-500">
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(data.price)}
                          </Label>
                        </div>
                      </div>


                      <div className="flex flex-col items-center gap-2">
                        <div className='w-[130px]  relative h-[30px] bg-[#b2d1ed]'>
                          <div className={`flex items-center justify-center w-[${data.stocks / data.base_stocks * 100}%] max-w-[150px] h-full  bg-primary`} />
                          <Label className={`font-light absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%] ${Math.round(data.stocks / data.base_stocks * 100) > 50 ? 'text-white' : 'text-black'}  text-sm`}>{data.stocks / data.base_stocks * 100}%</Label>
                        </div>
                        <div className="flex flex-col items-end gap-0.5">
                          <Label className="font-thin text-[11px] text-gray-400">
                            {data.sales_count} / {data.base_stocks} Total sold
                          </Label>
                        </div>

                      </div>
                    </div>
                  ))}
                </ScrollArea>


                :
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Top Selling Products Found
                </div>
            )

          }

        </CardContent>
      </Card>
    </div >
  )
}

export default Top_selling_products
