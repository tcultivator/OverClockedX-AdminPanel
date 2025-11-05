"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CiSearch } from "react-icons/ci";
import { Button } from '@/components/ui/button';
const OrderListHeader = () => {
    return (
        <div className='w-full p-3 px-5 border-b flex justify-between items-center'>
            <Label className="text-[15px] font-semibold">Orders</Label>
            <div className='flex items-center gap-2'>
                <Input type='text' />
                <Button variant={'secondary'}><CiSearch /></Button>
            </div>
        </div>
    )
}

export default OrderListHeader
