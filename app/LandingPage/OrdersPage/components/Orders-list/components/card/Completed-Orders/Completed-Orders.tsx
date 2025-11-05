"use client"
import React from 'react'
import { TbShoppingCartCopy } from "react-icons/tb";
import { Label } from '@/components/ui/label';
import { useOrderStore } from '@/stores/ordersStore';
const Completed_Orders = () => {
    const orders_data = useOrderStore((state) => state.orders_data)
    const Completed = orders_data.filter((item) => item.order_status == 'success')
    return (
        <div className='flex shadow-sm border border-black/15 bg-white p-2 rounded-[15px] w-full'>
            <div className='flex gap-2 items-center w-full p-3'>
                <div className='bg-green-300 flex justify-center items-center p-2 rounded-[50%]'>
                    <TbShoppingCartCopy className='text-white text-xl' />
                </div>
                <div className='w-full'>
                    <Label className='text-black/50 text-[13px]'>Completed</Label>
                    <Label className='text-black/70 text-[15px]'>{Completed.length}</Label>
                </div>
            </div>
        </div>
    )
}

export default Completed_Orders
