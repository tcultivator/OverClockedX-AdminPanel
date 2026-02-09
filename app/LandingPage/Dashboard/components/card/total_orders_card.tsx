"use client"
import React, { useState, useEffect } from 'react'
import { MdShoppingBag, MdPendingActions } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import {Label} from '@/components/ui/label';
const Total_orders_card = () => {
    const [loading, setLoading] = useState(true)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)

    useEffect(() => {
        const fetchProductsCount = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/Dashboard/card/orders')
                const response = await res.json()
                if (response.status !== 500) {
                    setTotalOrders(response.totalOrders.totalOrders)
                    setPendingOrders(response.pendingOrders.pendingOrders)
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
                        Sales Overview
                    </span>
                </div>

                <div className='flex items-center gap-5 mb-4'>
                    <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <MdShoppingBag className="text-3xl text-primary" />
                    </div>
                    <div>
                        {loading ? (
                            <Skeleton className="h-10 w-20 bg-slate-100 mb-1" />
                        ) : (
                            <Label className="text-4xl font-bold  text-slate-900 tracking-tight">{totalOrders}</Label>
                        )}
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Total orders</p>
                    </div>
                </div>
            </div>

            
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 p-3 rounded-xl transition-all hover:bg-orange-100/50">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <MdPendingActions className="text-orange-500 text-xl shrink-0" />
                </div>
                <div>
                    <p className="text-sm font-bold text-orange-700 leading-none">
                        {loading ? "..." : pendingOrders} Pending
                    </p>
                    <p className="text-[10px] text-orange-600/80 font-medium mt-1 uppercase tracking-tight">Needs processing</p>
                </div>
            </div>
        </div>
    )
}

export default Total_orders_card