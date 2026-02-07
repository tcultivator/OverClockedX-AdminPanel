'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
import { MdLeaderboard, MdCalendarMonth, MdTrendingUp } from "react-icons/md";
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
        const response = await fetch(`/api/Dashboard/top-selling-products?year=${selectedDate[0]}&month=${selectedDate[1]}`)
        const result = await response.json()
        if (result.status !== 500) {
          setTopSellingProducts(result)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch_top_selling_products_func()
  }, [selectedDate])

  
  const getRankStyle = (index: number) => {
    switch (index) {
      case 0: return "bg-amber-400 text-white shadow-sm ring-2 ring-amber-100"; 
      case 1: return "bg-slate-300 text-slate-700 shadow-sm ring-2 ring-slate-100"; 
      case 2: return "bg-orange-400 text-white shadow-sm ring-2 ring-orange-100"; 
      default: return "bg-slate-100 text-slate-500 border border-slate-200";
    }
  }

  return (
    <div className='w-full h-full p-6 rounded bg-white text-slate-900 border border-black/15 flex flex-col'>

      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/20 rounded-lg border border-primary/30">
            <MdLeaderboard className="text-xl text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Top Sellings</h3>
            <p className="text-[11px] text-slate-500 font-medium">Ranked by volume</p>
          </div>
        </div>

     
        <div className="relative group w-full sm:w-auto">
          <MdCalendarMonth className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-600 transition-colors z-10" />
          <Input
            type='month'
            className="pl-9 bg-slate-50 border-slate-200 text-slate-700 h-10 text-xs w-full sm:w-44 rounded-lg focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer"
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

      
      <div className="flex-1 min-h-0 relative">
        {loading ? (
          <div className='flex flex-col gap-3 h-full'>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                <Skeleton className="w-12 h-12 rounded-lg bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2 bg-slate-200" />
                  <Skeleton className="h-3 w-1/4 bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          topSellingProducts?.length > 0 ? (
            <ScrollArea className="h-full pr-4 -mr-4">
              <div className="flex flex-col gap-3 pb-2">
                {topSellingProducts.map((data, index) => {
                  const stockPercentage = Math.min((data.stocks / data.base_stocks) * 100, 100);

                  return (
                    <div
                      key={index}
                      className="group flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-300"
                    >
                      
                      <div className="flex items-center gap-4 flex-1 min-w-0 w-full sm:w-auto">
                        <div className="relative w-14 h-14 shrink-0">
                          <Image
                            src={data.product_image}
                            alt={data.product_name}
                            fill
                            className="rounded-xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black z-20 ${getRankStyle(index)}`}>
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <h4 className="font-semibold text-sm text-slate-800 truncate group-hover:text-primary transition-colors">
                            {data.product_name}
                          </h4>
                          <p className="font-semibold text-xs text-emerald-600 mt-0.5">
                            {new Intl.NumberFormat("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            }).format(data.price)}
                          </p>
                        </div>
                      </div>

                    
                      <div className="flex flex-col items-end gap-2 w-full sm:w-[160px] shrink-0 mt-4 sm:mt-0 pl-0 sm:pl-6 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0">
                        <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          <span>Sold {data.sales_count}</span>
                          <span className={stockPercentage < 20 ? 'text-rose-500' : 'text-slate-400'}>
                            {Math.round(stockPercentage)}% Stock
                          </span>
                        </div>

                        
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${stockPercentage}%` }}
                            className={`h-full rounded-full transition-all duration-1000 ${stockPercentage < 20 ? 'bg-rose-500' :
                                stockPercentage < 50 ? 'bg-amber-500' :
                                  'bg-emerald-400'
                              }`}
                          />
                        </div>

                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          Total Stocks: <span className="text-slate-700 font-bold">{data.stocks}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 py-10">
              <div className="p-4 bg-slate-50 rounded-full">
                <MdLeaderboard className="text-4xl opacity-20" />
              </div>
              <p className="text-sm font-medium">No sales performance found for this month</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Top_selling_products