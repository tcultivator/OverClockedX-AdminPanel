"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CiSearch } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useOrderStore } from '@/stores/ordersStore';
import { GroupOrdersData } from '@/utils/GroupOrderData';
import { GroupedOrder } from '@/types/GroupDataType';
import { IoCloseCircleSharp } from "react-icons/io5";
import { ClipLoader } from 'react-spinners';
const OrderListHeader = () => {
    const [searchInput, setSearchInput] = useState('')
    const setOrders_data = useOrderStore((state) => state.setOrders_data)
    const [tempOrdersData, setTempOrdersData] = useState<GroupedOrder[]>([])
    const orders_data = useOrderStore((state) => state.orders_data)
    const [loading, setLoading] = useState(false)
    const Submit_Search = async () => {
        console.log(searchInput)
        if (searchInput == '') return
        setLoading(true)
        const searchRequest = await fetch('/api/OrdersPage/Search', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ searchInput: searchInput })
        })
        const searchRequest_result = await searchRequest.json()
        if (searchRequest_result.status == 500) return
        if (tempOrdersData.length == 0) {
            setTempOrdersData(orders_data)
        }
        setOrders_data(GroupOrdersData(searchRequest_result))// this is the reusable function that turn raw data to group data
        setLoading(false)
    }

    const clearSearch = () => {
        setSearchInput('')
        setOrders_data(tempOrdersData)
        setTempOrdersData([])
    }
    return (
        <div className='w-full p-3 px-5 border-b flex justify-between items-center'>
            <Label className="text-[15px] font-semibold">Orders</Label>
            <div className='flex items-center gap-2'>

                {
                    loading ? <Label className='text-black/50 flex items-center'><ClipLoader size={15} color='black/50' />Searching...</Label> :

                        tempOrdersData.length > 0 && < Button onClick={clearSearch} className='text-black/50 focus:bg-transparent cursor-pointer' variant={'outline'}><IoCloseCircleSharp className='text-red-400' />clear search</Button>}
                <Input value={searchInput || ''} type='text' placeholder='Reference_id/Email' onChange={(e) => setSearchInput(e.target.value)} className='w-[350px] p-5' />
                <Button disabled={loading} onClick={Submit_Search} variant={'default'} className='cursor-pointer h-[40px] w-[40px] p-0'>{loading ? <ClipLoader  size={15} color='white' /> : <CiSearch />}</Button>
            </div>
        </div >
    )
}

export default OrderListHeader
