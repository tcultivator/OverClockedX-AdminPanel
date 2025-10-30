"use client"
import React from 'react'
import { TbShoppingCartPin } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Total_orders_card = () => {
    const [loading, setLoading] = useState(false)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)
    const [cancelOrders, setCancelOrders] = useState(0)
    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        const fetchProductsCount = async () => {
            const totalCountInCard = await fetch('/api/Dashboard/card/orders', {
                method: 'GET'
            })
            const response = await totalCountInCard.json()
            if (response.status != 500) {
                console.log(response)
                setTotalOrders(response.totalOrders.totalOrders)
                setPendingOrders(response.pendingOrders.pendingOrders)
                setCancelOrders(response.cancelOrders.cancelOrders)
            }
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className=' p-7 flex bg-white items-center gap-1 rounded-[10px] border border-black/15 shadow-sm h-max w-full px-9 border border-black/15'>
            <div className='flex gap-1 items-center w-full '>
                <div className='bg-blue-300 flex justify-center items-center p-2.5 rounded-[50%]'>
                    <TbShoppingCart className='text-white text-2xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Total Orders</Label>
                    <Label className='text-black/70 text-[15px]'>{totalOrders}</Label>
                </div>
            </div>
            <div className='flex gap-1 items-center w-full '>
                <div className='bg-blue-300 flex justify-center items-center p-2.5 rounded-[50%]'>
                    <TbShoppingCartPin className='text-white text-2xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Pending Orders</Label>
                    <Label className='text-black/70 text-[15px]'>{pendingOrders}</Label>
                </div>
            </div>
            <div className='flex gap-1 items-center w-full '>
                <div className='bg-blue-300 flex justify-center items-center p-2.5 rounded-[50%]'>
                    <TbShoppingCartExclamation className='text-white text-2xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Cancel Orders</Label>
                    <Label className='text-black/70 text-[15px]'>{cancelOrders}</Label>
                </div>
            </div>

        </div>
    )
}

export default Total_orders_card
