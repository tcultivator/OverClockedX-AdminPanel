"use client"
import React from 'react'
import { BiStoreAlt } from "react-icons/bi";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TbPackageOff } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { LuPackageX } from "react-icons/lu";


const Total_products_card = () => {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalOutOfStocks, setTotalOutOfStocks] = useState(0)
    const [totalDeleted, setTotalDeleted] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
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
        <div className=' p-7 flex bg-white items-center gap-1 rounded-[10px] border border-black/15 shadow-sm h-max w-full px-9'>
            <div className='flex gap-1 items-center w-full '>
                <div className='bg-[#fa6093] flex justify-center items-center p-2.5 rounded-[50%]'>
                    <LuPackageCheck className='text-white text-2xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Total Products</Label>
                    <Label className='text-black/70 text-[15px]'>{totalProducts}</Label>
                </div>
            </div>
            <div className='flex gap-1 items-center w-full '>
                <div className='bg-[#fa6093] flex justify-center items-center p-2.5 rounded-[50%]'>
                    <LuPackageX className='text-white text-2xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Out of Stocks</Label>
                    <Label className='text-black/70 text-[15px]'>{totalOutOfStocks}</Label>
                </div>
            </div>
            <div className='flex gap-1 items-center w-full '>
                <div className='bg-[#fa6093] flex justify-center items-center p-2.5 rounded-[50%]'>
                    <TbPackageOff className='text-white text-2xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Deleted Products</Label>
                    <Label className='text-black/70 text-[15px]'>{totalDeleted}</Label>
                </div>
            </div>

        </div>
    )
}

export default Total_products_card
