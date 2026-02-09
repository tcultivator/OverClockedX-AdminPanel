"use client"
import React, { useState, useEffect } from 'react'
import { MdInventory, MdWarning } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import {Label} from '@/components/ui/label';
const Total_products_card = () => {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOutOfStocks, setTotalOutOfStocks] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProductsCount = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/Dashboard/card')
                const response = await res.json()
                if (response.status !== 500) {
                    setTotalProducts(response.totalProducts.totalProducts)
                    setTotalOutOfStocks(response.totalSoldOut.totalSoldOut)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProductsCount()
    }, [])

    return (
        <div className="w-full max-w-sm p-2 md:p-5 rounded bg-white text-slate-900 border border-black/15 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        Stock Inventory
                    </span>
                </div>

                <div className='flex items-center gap-5 mb-4'>
                    <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <MdInventory className="text-3xl text-primary" />
                    </div>
                    <div>
                        {loading ? (
                            <Skeleton className="h-10 w-20 bg-slate-100 mb-1" />
                        ) : (
                            <Label className="text-4xl font-bold  text-slate-900 tracking-tight">{totalProducts}</Label>
                        )}
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Unique Items</p>
                    </div>
                </div>
            </div>

           
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${totalOutOfStocks > 0 ? 'bg-rose-50 border border-rose-100' : 'bg-slate-50 border border-slate-100'}`}>
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <MdWarning className={`${totalOutOfStocks > 0 ? 'text-rose-500' : 'text-slate-400'} text-xl shrink-0`} />
                </div>
                <div>
                    <p className={`text-sm font-bold leading-none ${totalOutOfStocks > 0 ? 'text-rose-700' : 'text-slate-700'}`}>
                        {loading ? "..." : totalOutOfStocks} Out of Stock
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-tight">Stock replenishment</p>
                </div>
            </div>
        </div>
    )
}

export default Total_products_card