"use client"
import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CiSearch } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { ClipLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IoFilterOutline } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";
import { useLoading } from '@/stores/loadingStore';

const OrderListHeader = () => {
    const [searchInput, setSearchInput] = useState('')
    const searchLoading = useLoading((state) => state.searchLoading)
    const searchParams = useSearchParams();
    const Submit_Search = () => {
        if (searchInput == '') return
        const params = new URLSearchParams(window.location.search);

        // Clear filters
        params.delete('paymentMethod');
        params.delete('paymentStatus');
        params.delete('orderStatus');
        setPaymentMethodFilter('')
        setPaymentStatusFilter('')
        setOrderStatusFilter('')
        params.set('searchOrder', searchInput.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }


    const clearSearch = () => {
        setSearchInput('')
        const params = new URLSearchParams(window.location.search);
        params.delete('searchOrder');
        window.history.pushState({}, '', `?${params.toString()}`);
    }


    // payment method filter
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('')
    const AddPaymentMethodFilter = (value: string) => {
        clearSearch()
        setPaymentMethodFilter(value)
        const params = new URLSearchParams(window.location.search);
        params.set('paymentMethod', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    const ClearAddPaymentMethodFilter = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete('paymentMethod');
        setPaymentMethodFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }



    //payment status filter
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('')
    const AddPaymentStatusFilter = (value: string) => {
        clearSearch()
        setPaymentStatusFilter(value)
        const params = new URLSearchParams(window.location.search);
        params.set('paymentStatus', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    const ClearAddPaymentStatusFilter = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete('paymentStatus');
        setPaymentStatusFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }




    //order status filter

    const [orderStatusFilter, setOrderStatusFilter] = useState('')
    const AddOrderStatusFilter = (value: string) => {
        clearSearch()
        setOrderStatusFilter(value)
        const params = new URLSearchParams(window.location.search);
        params.set('orderStatus', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    const ClearAddOrderStatusFilter = () => {
        const params = new URLSearchParams(window.location.search);
        params.delete('orderStatus');
        setOrderStatusFilter('')
        window.history.pushState({}, '', `?${params.toString()}`);
    }



    // prevent the filter to be clear when reloading the page
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentMethod = params.get('paymentMethod');
        const paymentStatus = params.get('paymentStatus');
        const orderStatus = params.get('orderStatus');
        const searchOrder = params.get('searchOrder');

        if (paymentMethod) {
            setPaymentMethodFilter(paymentMethod);
        }
        if (paymentStatus) {
            setPaymentStatusFilter(paymentStatus);
        }
        if (orderStatus) {
            setOrderStatusFilter(orderStatus);
        }
        if (searchOrder) {
            setSearchInput(searchOrder);
        }
    }, [])

    return (
        <div className='w-full p-3 px-5 border-b gap-2 flex flex-col md:flex-row justify-between items-start md:items-center'>
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

                    <div className="px-4 pb-3 flex items-center gap-2 w-full md:w-auto">
                        <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">
                            Active:
                        </span>

                        <div className=" w-full flex-1 max-w-40 md:max-w-full flex items-center gap-1 md:gap-2 overflow-x-auto flex-nowrap no-scrollbar">
                            {paymentMethodFilter && (
                                <ActiveBadge
                                    label="Method"
                                    value={paymentMethodFilter}
                                    onClick={ClearAddPaymentMethodFilter}
                                />
                            )}

                            {paymentStatusFilter && (
                                <ActiveBadge
                                    label="Payment"
                                    value={paymentStatusFilter}
                                    onClick={ClearAddPaymentStatusFilter}
                                />
                            )}

                            {orderStatusFilter && (
                                <ActiveBadge
                                    label="Status"
                                    value={orderStatusFilter}
                                    onClick={ClearAddOrderStatusFilter}
                                />
                            )}
                        </div>
                    </div>


                </div>
            </div>
            <div className='flex items-center gap-2 w-full justify-end'>
                {
                    searchLoading ? <Label className='text-black/50 flex items-center'><ClipLoader size={15} color='black/50' />Searching...</Label> :
                        searchParams.get('searchOrder') && < Button onClick={clearSearch} className='text-black/50 focus:bg-transparent cursor-pointer' variant={'outline'}><IoCloseCircleSharp className='text-red-400' />clear search</Button>}
                <Input value={searchInput || ''} type='text' placeholder='Reference_id/Email' onChange={(e) => setSearchInput(e.target.value)} className='w-full md:w-[350px] p-5' />
                <Button disabled={searchLoading} onClick={Submit_Search} variant={'default'} className='cursor-pointer h-[40px] w-[40px] p-0'>{searchLoading ? <ClipLoader size={15} color='white' /> : <CiSearch />}</Button>
            </div>
        </div >
    )
}

const ActiveBadge = ({ label, value, onClick }: { label: string, value: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className='flex items-center gap-1.5 px-2 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors rounded-md border text-xs whitespace-nowrap group'
    >
        <span className='text-slate-500 group-hover:text-red-400'>{label}:</span>
        <span className='font-medium'>{value}</span>
        <FaTimesCircle className='text-[10px] text-slate-400 group-hover:text-red-500' />
    </button>
)

export default OrderListHeader