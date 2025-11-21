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
    <div className='w-full '>
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
                <ScrollArea className="flex flex-col max-h-[23.5vh] overflow-y-auto">
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

                      
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end gap-0.5">
                          <Label className="font-medium text-xs text-pink-500">
                            {data.total_orders} sold in{" "}
                            {new Date(0, Number(selectedDate[1]) - 1).toLocaleString("en-GB", {
                              month: "long",
                            })}
                          </Label>
                          <Label className="font-thin text-[11px] text-gray-400">
                            {data.sales_count} / {data.base_stocks} Total sold
                          </Label>
                        </div>
                        <ProgressCircle
                          size={50}
                          strokeWidth={5}
                          progress={Math.round(data.stocks / data.base_stocks * 100)}
                          className="text-black/50"
                        />
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
