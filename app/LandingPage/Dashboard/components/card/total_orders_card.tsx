"use client"
import React from 'react'
import { BsHandbag } from "react-icons/bs";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const total_orders_card = () => {
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
        <div className='p-2 flex flex-col justify-start bg-white rounded-[10px] border border-black/15 shadow-md h-max w-full'>
            <div className='flex justify-between  border-b border-black/15 p-3 shadow-b-md'>
                <div className='flex items-center gap-2'>
                    <BsHandbag className='bg-primary text-white p-2 text-4xl rounded-[50%]' />
                    <Label className='text-xl text-black/50'>Orders</Label>
                </div>
                <Button onClick={() => router.push('/LandingPage/Orders')} className='cursor-pointer' variant={'secondary'}><BsArrowUpRightCircle className='text-black/50' /></Button>

            </div>

            <div className='flex items-center justify-between p-3 h-max'>
                <div className='w-full items-center flex flex-col justify-center border-r border-black/15'>
                    {loading ? <Label className='text-black/40 py-2'><ClipLoader size={17} /> processing...</Label> : <Label className='text-2xl'>{totalOrders}</Label>}
                    <Label className='text-black/40'>Total</Label>
                </div>
                
                <div className='w-full items-center flex flex-col justify-center border-r border-black/15'>
                    {loading ? <Label className='text-black/40 py-2'><ClipLoader size={17} /> processing...</Label> : <Label className='text-2xl'>{pendingOrders}</Label>}
                    <Label className='text-black/40'>Pending</Label>
                </div>
                
                <div className='w-full items-center flex flex-col justify-center'>
                    {loading ? <Label className='text-black/40 py-2'><ClipLoader size={17} /> processing...</Label> : <Label className='text-2xl'>{proccessedOrders}</Label>}
                    <Label className='text-black/40'>Processed</Label>
                </div>
            </div>
        </div>
    )
}

export default total_orders_card
