'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
import { MdLeaderboard, MdCalendarMonth, MdArrowForward } from "react-icons/md";
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
    <div className='w-full h-full p-6 rounded bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl border border-gray-700/50 flex flex-col'>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <MdLeaderboard className="text-xl text-indigo-400" />
          </div>
          <span className="text-sm font-semibold text-gray-200 tracking-wide">Top Selling</span>
        </div>

        {/* Date Input */}
        <div className="relative group">
          <MdCalendarMonth className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-white transition-colors z-10" />
          <Input
            type='month'
            className="pl-9 bg-gray-800 border-gray-700 text-white h-9 text-xs w-auto focus:border-indigo-500 focus:ring-indigo-500/20 hover:bg-gray-700/80 transition-all"
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
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {loading ? (
          <div className='flex flex-col gap-3 h-full'>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/40 border border-gray-700/30">
                <Skeleton className="w-12 h-12 rounded-lg bg-gray-700/50" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3 bg-gray-700/50" />
                  <Skeleton className="h-3 w-1/4 bg-gray-700/50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          topSellingProducts?.length > 0 ? (
            <ScrollArea className="h-full pr-4 -mr-4">
              <div className="flex flex-col gap-3 pb-2">
                {topSellingProducts.map((data, index) => {
                  const percentage = (data.stocks / data.base_stocks) * 100;

                  return (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-3 rounded-xl bg-gray-800/40 border border-gray-700/30 hover:bg-gray-700/60 hover:border-indigo-500/30 transition-all duration-300"
                    >
                      {/* Product Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative w-12 h-12 shrink-0">
                          <Image
                            src={data.product_image}
                            alt={data.product_name}
                            fill
                            className="rounded-lg object-cover border border-gray-600 group-hover:border-indigo-400/50 transition-colors"
                          />
                          <div className="absolute -top-1 -left-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 text-[10px] font-bold text-indigo-400">
                            #{index + 1}
                          </div>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <h4 className="font-semibold text-sm text-gray-200 truncate group-hover:text-white transition-colors">
                            {data.product_name}
                          </h4>
                          <p className="font-medium text-xs text-indigo-400">
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(data.price)}
                          </p>
                        </div>
                      </div>

                      {/* Stats & Progress */}
                      <div className="flex flex-col items-end gap-1.5 w-[140px] shrink-0 pl-4">
                        <div className="flex justify-between w-full text-[10px] uppercase font-bold tracking-wider">
                          <span className="text-gray-500">Inventory</span>
                          <span className="text-gray-300">{Math.round(percentage)}%</span>
                        </div>

                        {/* Modern Progress Bar */}
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percentage}%` }}
                            className={`h-full rounded-full transition-all duration-500 ${percentage < 20 ? 'bg-red-500' :
                                percentage < 50 ? 'bg-amber-500' :
                                  'bg-gradient-to-r from-indigo-500 to-cyan-400'
                              }`}
                          />
                        </div>

                        <div className="text-[10px] text-gray-400 mt-0.5">
                          <span className="text-white font-bold">{data.sales_count}</span> sold
                          <span className="mx-1 text-gray-600">/</span>
                          {data.base_stocks}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
              <MdLeaderboard className="text-4xl opacity-20" />
              <span className="text-sm">No sales data found</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Top_selling_products