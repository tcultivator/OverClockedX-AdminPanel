"use client"
import React from 'react'
import { TbShoppingCartPin } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { GoArrowSwitch } from "react-icons/go";
import { useMobileControllerStore } from '@/stores/mobileControllerStore';


const Total_orders_card = () => {
    const [loading, setLoading] = useState(false)
    const [totalOrders, setTotalOrders] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)
    const [cancelOrders, setCancelOrders] = useState(0)
    const router = useRouter()

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
                setCancelOrders(response.cancelOrders.cancelOrders)
            }
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className={`${cardDisplaySwitcher ? 'flex' : 'hidden md:flex'} p-3 md:p-7  flex-col md:flex-row bg-white items-center gap-3 justify-start rounded md:rounded-[10px] border border-black/15  h-max w-full md:px-4 border border-black/15`}>
            <div className='flex md:hidden items-center justify-between w-full'>
                <Label className=' '>Orders</Label>
                <button onClick={() => setCardDisplaySwitcher(false)} type='button' className=' p-1'>
                    <GoArrowSwitch className='text-black' />
                </button>

            </div>

            <div className='flex items-center justify-start w-full gap-1'>
                <div className='flex gap-1 items-center w-full '>
                    <div className='bg-blue-300 flex justify-center items-center p-1 md:p-2.5 rounded-[50%]'>
                        <TbShoppingCart className='text-white text-lg md:text-2xl' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <Label className='text-black/50 text-[13px]'>Total <span className='hidden md:block'>Orders</span></Label>

                        <Label className='text-black/70 text-[15px]'>{totalOrders}</Label>
                    </div>
                </div>
                <div className='flex gap-1 items-center w-full '>
                    <div className='bg-blue-300 flex justify-center items-center p-1 md:p-2.5 rounded-[50%]'>
                        <TbShoppingCartPin className='text-white text-lg md:text-2xl' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <Label className='text-black/50 text-[13px]'>Pending <span className='hidden md:block'>Orders</span></Label>

                        <Label className='text-black/70 text-[15px]'>{pendingOrders}</Label>
                    </div>
                </div>
                <div className='flex gap-1 items-center w-full '>
                    <div className='bg-blue-300 flex justify-center items-center p-1 md:p-2.5 rounded-[50%]'>
                        <TbShoppingCartExclamation className='text-white text-lg md:text-2xl' />
                    </div>
                    <div className='w-full flex flex-col'>
                        <Label className='text-black/50 text-[13px]'>Cancel <span className='hidden md:block'>Orders</span></Label>

                        <Label className='text-black/70 text-[15px]'>{cancelOrders}</Label>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default Total_orders_card
