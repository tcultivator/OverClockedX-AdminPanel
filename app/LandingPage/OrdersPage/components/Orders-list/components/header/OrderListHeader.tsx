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
import { useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IoFilterOutline } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";

const OrderListHeader = () => {
    const [searchInput, setSearchInput] = useState('')
    const setOrders_data = useOrderStore((state) => state.setOrders_data)
    const [tempOrdersData, setTempOrdersData] = useState<GroupedOrder[]>([])
    const orders_data = useOrderStore((state) => state.orders_data)
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams();
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
        ClearAllFilter()

    }

    const clearSearch = () => {
        setSearchInput('')
        setOrders_data(tempOrdersData)
        setTempOrdersData([])
    }


    // payment method filter
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('')
    const AddPaymentMethodFilter = (value: string) => {
        clearSearch()
        setPaymentMethodFilter(value)
        const params = new URLSearchParams(searchParams.toString());
        params.set('paymentMethod', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    const ClearAddPaymentMethodFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('paymentMethod');
        setPaymentMethodFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }



    //payment status filter
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('')
    const AddPaymentStatusFilter = (value: string) => {
        clearSearch()
        setPaymentStatusFilter(value)
        const params = new URLSearchParams(searchParams.toString());
        params.set('paymentStatus', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    const ClearAddPaymentStatusFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('paymentStatus');
        setPaymentStatusFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }




    //order status filter

    const [orderStatusFilter, setOrderStatusFilter] = useState('')
    const AddOrderStatusFilter = (value: string) => {
        clearSearch()
        setOrderStatusFilter(value)
        const params = new URLSearchParams(searchParams.toString());
        params.set('orderStatus', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    const ClearAddOrderStatusFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('orderStatus');
        setOrderStatusFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }


    //clear all filter
    const ClearAllFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('paymentMethod');
        params.delete('paymentStatus');
        params.delete('orderStatus');
        setPaymentMethodFilter('')
        setPaymentStatusFilter('')
        setOrderStatusFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }

    return (
        <div className='w-full p-3 px-5 border-b flex justify-between items-center'>
            <div className='flex items-center gap-3 '>
                <Label className="text-[15px] font-semibold">Orders</Label>
                <div className='flex items-center gap-2'>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-[4%] p-0 cursor-pointer">
                                <span className="sr-only">Open menu</span>
                                <IoFilterOutline className='font-thin text-black/70 mb-[-3px]' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="sm:max-w-[425px]" align="end">
                            <DropdownMenuLabel className='border-b text-[12px]'>Filter</DropdownMenuLabel>
                            <DropdownMenuGroup className='flex flex-col gap-1'>
                                <Select onValueChange={(value) => AddPaymentMethodFilter(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Payment Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Payment Method</SelectLabel>
                                            <SelectItem value="Gcash">Gcash</SelectItem>
                                            <SelectItem value="Maya">Maya</SelectItem>
                                            <SelectItem value="Cash On Deliver">Cash On Deliver</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(value) => AddPaymentStatusFilter(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Payment Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Payment Status</SelectLabel>
                                            <SelectItem value="success">Success</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={(value) => AddOrderStatusFilter(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Order Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Order Status</SelectLabel>
                                            <SelectItem value="success">Success</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="cancel">Cancel</SelectItem>
                                            <SelectItem value="preparing">Preparing</SelectItem>
                                            <SelectItem value="On Delivery">On Delivery</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className='flex items-center'>
                        {paymentMethodFilter && <div className='flex items-center border-l px-3 gap-1'>
                            <Label className='text-[12px]'>Payment Method</Label>
                            <Button onClick={ClearAddPaymentMethodFilter} className='text-[12px] cursor-pointer' variant={'outline'}><FaTimesCircle className='text-red-400 text-[10px]' />{paymentMethodFilter}</Button>
                        </div>}
                        {paymentStatusFilter && <div className='flex items-center border-l px-3 gap-1'>
                            <Label className='text-[12px]'>Payment Status</Label>
                            <Button onClick={ClearAddPaymentStatusFilter} className='text-[12px] cursor-pointer' variant={'outline'}><FaTimesCircle className='text-red-400 text-[10px]' />{paymentStatusFilter}</Button>
                        </div>}
                        {orderStatusFilter && <div className='flex items-center border-l px-3 gap-1'>
                            <Label className='text-[12px]'>Order Status</Label>
                            <Button onClick={ClearAddOrderStatusFilter} className='text-[12px] cursor-pointer' variant={'outline'}><FaTimesCircle className='text-red-400 text-[10px]' />{orderStatusFilter}</Button>
                        </div>}
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                {
                    loading ? <Label className='text-black/50 flex items-center'><ClipLoader size={15} color='black/50' />Searching...</Label> :
                        tempOrdersData.length > 0 && < Button onClick={clearSearch} className='text-black/50 focus:bg-transparent cursor-pointer' variant={'outline'}><IoCloseCircleSharp className='text-red-400' />clear search</Button>}
                <Input value={searchInput || ''} type='text' placeholder='Reference_id/Email' onChange={(e) => setSearchInput(e.target.value)} className='w-[350px] p-5' />
                <Button disabled={loading} onClick={Submit_Search} variant={'default'} className='cursor-pointer h-[40px] w-[40px] p-0'>{loading ? <ClipLoader size={15} color='white' /> : <CiSearch />}</Button>
            </div>
        </div >
    )
}

export default OrderListHeader