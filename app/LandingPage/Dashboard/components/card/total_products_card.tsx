"use client"
import React from 'react'
import { BiStoreAlt } from "react-icons/bi";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TbPackageOff } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { LuPackageX } from "react-icons/lu";
import { GoArrowSwitch } from "react-icons/go";
import { useMobileControllerStore } from '@/stores/mobileControllerStore';
const Total_products_card = () => {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOutOfStocks, setTotalOutOfStocks] = useState(0)
    const [totalDeleted, setTotalDeleted] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

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
            setTotalDeleted(response.totalDeletedProducts.totalDeletedProducts)
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className={`${cardDisplaySwitcher ? 'hidden md:flex' : 'flex-1'} p-3 md:p-7  flex-col  bg-white items-center gap-3 justify-start rounded border border-black/15  w-full md:px-4 border border-black/15`}>
            <div className='flex md:hidden items-center justify-between w-full'>
                <Label className=' '>Products</Label>
                <button onClick={() => setCardDisplaySwitcher(true)} type='button' className=' p-1'>
                    <GoArrowSwitch className='text-black' />
                </button>

            </div>
            <div className='flex items-center justify-start w-full gap-1'>
                <div className='flex gap-1 items-center w-full '>
                    <div className='bg-primary flex justify-center items-center p-1 md:p-2.5 rounded-[50%]'>
                        <LuPackageCheck className='text-white text-lg md:text-2xl' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <Label className='text-black/50 text-[13px]'>Total<span className='hidden md:block'>Products</span></Label>
                        <Label className='text-black/70 text-[15px]'>{totalProducts}</Label>
                    </div>
                </div>
                <div className='flex gap-1 items-center w-full '>
                    <div className='bg-primary flex justify-center items-center p-1 md:p-2.5 rounded-[50%]'>
                        <LuPackageX className='text-white text-lg md:text-2xl' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <Label className='text-black/50 text-[13px]'>Out of Stocks</Label>

                        <Label className='text-black/70 text-[15px]'>{totalOutOfStocks}</Label>
                    </div>
                </div>
                <div className='flex gap-1 items-center w-full '>
                    <div className='bg-primary flex justify-center items-center p-1 md:p-2.5 rounded-[50%]'>
                        <TbPackageOff className='text-white text-lg md:text-2xl' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <Label className='text-black/50 text-[13px]'>Deleted <span className='hidden md:block'>Products</span></Label>
                        <Label className='text-black/70 text-[15px]'>{totalDeleted}</Label>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Total_products_card
