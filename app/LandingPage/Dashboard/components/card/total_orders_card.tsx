"use client"
import React from 'react'
import { TbShoppingCartPin } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { GoArrowSwitch } from "react-icons/go";
import { useMobileControllerStore } from '@/stores/mobileControllerStore';
import { MdInventory, MdShoppingBag, MdWarning, MdPendingActions } from "react-icons/md";

const Total_orders_card = () => {
    const [loading, setLoading] = useState(false)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)


    // zustand state for switching display of card in mobile view
    const cardDisplaySwitcher = useMobileControllerStore((state) => state.cardDisplaySwitcher)
    const setCardDisplaySwitcher = useMobileControllerStore((state) => state.setCardDisplaySwitcher)


    // fetch the orders count in initial page/ reload page
    useEffect(() => {
        setLoading(true)
        const fetchProductsCount = async () => {
            const totalCountInCard = await fetch('/api/Dashboard/card/orders', {
                method: 'GET'
            })
            const response = await totalCountInCard.json()
            if (response.status != 500) {
                setTotalOrders(response.totalOrders.totalOrders)
                setPendingOrders(response.pendingOrders.pendingOrders)

            }
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className="w-full max-w-sm p-6 rounded  bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700/50 ">
            <div className="flex justify-between items-center mb-4">

                <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded-full border border-gray-700">Sales</span>
            </div>
            <div className='flex items-start gap-4'>
                <div className="p-3 bg-gray-700/50 rounded-xl backdrop-blur-sm">
                    <MdShoppingBag className="text-2xl text-emerald-400" />
                </div>
                <div className="mb-4">
                    <h3 className="text-4xl font-bold">{totalOrders}</h3>
                    <p className="text-indigo-200 text-sm">Total orders</p>
                </div>
            </div>


            {/* Pending alert */}
            <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 p-2 rounded-lg">
                <MdPendingActions className="text-orange-400 text-xl shrink-0" />
                <div>
                    <p className="text-sm font-bold text-orange-400">{pendingOrders} Orders</p>
                    <p className="text-[10px] text-orange-300/70 uppercase tracking-wide">Waiting for process</p>
                </div>
            </div>
        </div>
    )
}

export default Total_orders_card
