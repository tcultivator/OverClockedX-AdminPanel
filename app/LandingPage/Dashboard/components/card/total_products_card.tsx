"use client"
import React from 'react'
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { LuPackageCheck } from "react-icons/lu";
import { LuPackageX } from "react-icons/lu";
import { GoArrowSwitch } from "react-icons/go";
import { useMobileControllerStore } from '@/stores/mobileControllerStore';
import { MdInventory, MdShoppingBag, MdWarning, MdPendingActions } from "react-icons/md";
const Total_products_card = () => {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOutOfStocks, setTotalOutOfStocks] = useState(0)
    const [loading, setLoading] = useState(false)


    // zustand state for switching display of card in mobile view
    const cardDisplaySwitcher = useMobileControllerStore((state) => state.cardDisplaySwitcher)
    const setCardDisplaySwitcher = useMobileControllerStore((state) => state.setCardDisplaySwitcher)

    // fetch the products data in initial reload/page reload
    useEffect(() => {
        setLoading(true)
        const fetchProductsCount = async () => {
            const totalCountInCard = await fetch('/api/Dashboard/card', {
                method: 'GET'
            })
            const response = await totalCountInCard.json()
            if (response.status == 500) return

            setTotalProducts(response.totalProducts.totalProducts)
            setTotalOutOfStocks(response.totalSoldOut.totalSoldOut)
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className="w-full max-w-sm p-6 rounded bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700/50">
            <div className="flex justify-between items-center mb-4">

                <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded-full border border-gray-700">Inventory</span>
            </div>
            <div className='flex items-start gap-4'>
                <div className="p-3 bg-gray-700/50 rounded-xl backdrop-blur-sm">
                    <MdInventory className="text-2xl text-emerald-400" />
                </div>
                <div className="mb-4">
                    <h3 className="text-4xl font-bold">{totalProducts}</h3>
                    <p className="text-gray-400 text-sm">Total items</p>
                </div>
            </div>


            {/* Out of stock alert */}
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                <MdWarning className="text-red-400 text-xl shrink-0" />
                <div>
                    <p className="text-sm font-bold text-red-400">{totalOutOfStocks} Items</p>
                    <p className="text-[10px] text-red-300/70 uppercase tracking-wide">Currently Out of Stock</p>
                </div>
            </div>
        </div>
    )
}

export default Total_products_card
