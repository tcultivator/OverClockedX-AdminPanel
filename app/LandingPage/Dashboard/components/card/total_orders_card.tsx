"use client"
import React from 'react'
import { BsHandbag } from "react-icons/bs";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Total_orders_card = () => {
    const [loading, setLoading] = useState(false)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)
    const [proccessedOrders, setProcessedOrders] = useState(0)
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
                setProcessedOrders(response.proccessedOrders.proccessedOrders)
            }
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className='p-5 flex bg-white items-center gap-1 rounded-[10px] border border-black/15 shadow-sm h-max w-full'>
            <div className='bg-blue-400 flex justify-center items-center p-2.5 rounded-[50%]'>
                <BsHandbag className='text-white text-2xl' />
            </div>
            <div>
                <Label className='text-black/50 text-[13px]'>Total Orders</Label>
                <Label className='text-black/70 text-[15px]'>{totalOrders}</Label>
            </div>
        </div>
    )
}

export default Total_orders_card
