"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { TbShoppingCartQuestion } from "react-icons/tb";
import { useOrderStore } from '@/stores/ordersStore';
const Pending_Orders = () => {
    const orders_data = useOrderStore((state) => state.orders_data)
    const order_requests = orders_data.filter((item) => item.order_status == 'pending')
    return (
        <div className='flex shadow-sm border border-black/15 bg-white p-2 rounded-[15px] w-full'>
            <div className='flex gap-2 items-center w-full p-3'>
                <div className='bg-primary flex justify-center items-center p-2 rounded-[50%]'>
                    <TbShoppingCartQuestion className='text-white text-xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Order Request</Label>
                    <Label className='text-black/70 text-[15px]'>{order_requests.length}</Label>
                </div>
            </div>
        </div>
    )
}

export default Pending_Orders
