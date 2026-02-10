"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { recentOrderStatus } from '@/utils/AlertNotificationClass'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { SlOptions } from "react-icons/sl";
import { useOrderStore } from '@/stores/ordersStore';
import Accept_Order from '../actions/Accept-Order/Accept-Order';
import View_Order_Details from '../actions/View-Order-Details/View-Order-Details';
import { BsArrowDownSquareFill } from "react-icons/bs";
import { BsArrowUpSquareFill } from "react-icons/bs";
import OrderListHeader from './components/header/OrderListHeader';
import { socket } from '@/lib/socket-io'
import { GroupOrdersData } from '@/utils/GroupOrderData';
import Decline_Order from '../actions/Decline-Order/Decline-Order';
import { useSearchParams } from 'next/navigation';
import { useLoading } from '@/stores/loadingStore';

// sample raw order data
import { orderRawData } from '@/utils/orderRawData';
const Order_list = () => {
    const orders_data = useOrderStore((state) => state.orders_data)
    const setOrders_data = useOrderStore((state) => state.setOrders_data)
    const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})
    const [loading, setLoading] = useState(true)
    const updateStatusOnDelivery = useOrderStore((state) => state.updateStatusOnDelivery)
    const searchParams = useSearchParams();
    const setSearchLoading = useLoading((state) => state.setSearchLoading)
    useEffect(() => {
        const fetchRecentOrders = async () => {
            const query = new URLSearchParams();
            const paymentMethod = searchParams.get('paymentMethod')
            const paymentStatus = searchParams.get('paymentStatus')
            const orderStatus = searchParams.get('orderStatus')
            const searchOrder = searchParams.get('searchOrder')

            if (searchOrder) {
                query.set('searchOrder', searchOrder)
                setSearchLoading(true)
            } else {
                if (paymentMethod) query.append('paymentMethod', paymentMethod)
                if (paymentStatus) query.append('paymentStatus', paymentStatus)
                if (orderStatus) query.append('orderStatus', orderStatus)
            }

            setLoading(true)
            try {
                const res = await fetch(`/api/OrdersPage/Orders-list?${query.toString()}`)
                const result = await res.json()

                if (result.status === 500) {
                    console.error("Server error while fetching orders")
                    return
                }
                setOrders_data(GroupOrdersData(result)) // this is the reusable function that turn raw data to group data and pass the group data to orders store
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setLoading(false)
                setSearchLoading(false)
            }
        }

        fetchRecentOrders()
    }, [searchParams])



    const toggleExpand = (index: number) => {
        setExpandedGroups(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    useEffect(() => {

        socket.on("update-data", (data) => {
            updateStatusOnDelivery(data)
        });
        return () => {
            socket.off("update-data");
        };
    }, []);
    return (
        <div className='flex flex-1 overflow-hidden flex-col h-full w-full bg-white rounded border border-black/15 text-black/70'>
            <OrderListHeader />
            <div className='hidden w-full border-b md:flex items-center px-3 bg-black/10 py-2 text-black/60 border-x-[4px]'>
                <div className='w-[6%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Id</Label>
                </div>
                <div className='w-[24%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Product</Label>
                </div>
                <div className='w-[20%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Customer</Label>
                </div>
                <div className='w-[15%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Price</Label>
                </div>
                <div className='w-[10%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Payment</Label>
                </div>
                <div className='w-[7%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Quantity</Label>
                </div>
                <div className='w-[9%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Payment Status</Label>
                </div>
                <div className='w-[9%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Order Status</Label>
                </div>
                <div className='w-[7%] flex items-center justify-start pr-2'>
                    <Label className='text-black/70 text-[12px] block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>Actions</Label>
                </div>
            </div>
            {loading ?
                <div className='h-full flex flex-col gap-1 p-1 '>
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                </div> :
                (
                    orders_data.length > 0 ?
                        <>
                            {/* desktop layout */}
                            <ScrollArea className='hidden md:block flex-1 overflow-hidden w-full h-full   '>
                                {orders_data.map((group, groupIndex) => {
                                    const isExpanded = expandedGroups[groupIndex] || false;
                                    return (
                                        <div
                                            className={`flex flex-col border-b relative ${group.updated_at == group.created_at && ' bg-indigo-50/30'} `}
                                            key={groupIndex}
                                        >

                                            <div
                                                style={{
                                                    maxHeight: isExpanded ? `${group.items.length * 60}px` : '60px',
                                                    overflow: 'hidden',
                                                    transition: 'max-height 0.3s ease-out',
                                                    borderLeft: isExpanded ? '4px solid #104254' : '4px solid white',
                                                    borderRight: isExpanded ? '4px solid #104254' : '4px solid white',
                                                    paddingLeft: '8px'
                                                }}
                                                className='px-3'
                                            >

                                                {group.items.map((item, itemIndex) => (
                                                    <div
                                                        className='flex items-center'
                                                        key={itemIndex}
                                                    >
                                                        <div className='flex flex-col items-start justify-start w-[6%]   '>
                                                            <Label className='font-thin'>{group.order_id}</Label>
                                                            {group.updated_at == group.created_at && itemIndex === 0 && (
                                                                <div className="flex items-center gap-1 mt-1">
                                                                    <span className="relative flex h-2 w-2">
                                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                                                    </span>
                                                                    <span className="text-[10px] font-bold text-indigo-600 uppercase">New</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex gap-1 items-center justify-start w-[24%] pr-2'>
                                                            <Image
                                                                src={item.product_image}
                                                                alt=""
                                                                className='w-15 aspect-square'
                                                                width={100}
                                                                height={100}
                                                            />
                                                            <Label className='block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>{item.product_name}</Label>
                                                        </div>
                                                        <div className='flex w-[20%] items-center justify-start gap-1 pr-2'>
                                                            <Image src={group.profile_Image} alt='' width={100} height={100} className='w-8 rounded-[50%] border border-black/15' />
                                                            <Label className='block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>
                                                                {group.email}
                                                            </Label>
                                                        </div>
                                                        <div className='w-[15%] flex items-center justify-start '>
                                                            <Label className='font-thin'>
                                                                {new Intl.NumberFormat('en-PH', {
                                                                    style: 'currency',
                                                                    currency: 'PHP',
                                                                    maximumFractionDigits: 0
                                                                }).format(item.price)}
                                                            </Label>
                                                        </div>
                                                        <div className='w-[10%] flex items-center justify-start pr-2'>
                                                            <Label className='block min-w-0 overflow-hidden whitespace-nowrap overflow-ellipsis font-thin'>
                                                                {group.payment_method}
                                                            </Label>
                                                        </div>
                                                        <div className='w-[6%] flex items-center justify-start '>
                                                            <Label className='font-thin'>{item.quantity}</Label>
                                                        </div>
                                                        <div className='w-[9%] flex items-center justify-start'>
                                                            <div className={`${recentOrderStatus[group.payment_status]}`}>
                                                                <Label className='text-[11px] flex items-center justify-center'>{group.payment_status}</Label>
                                                            </div>

                                                        </div>
                                                        <div className='w-[9%] flex items-center justify-start '>
                                                            <div className={`${recentOrderStatus[group.order_status]}`}>
                                                                <Label className='text-[11px] flex items-center justify-center'>{group.order_status}</Label>
                                                            </div>

                                                        </div>
                                                        <div className='w-[7%] flex items-center justify-start'>
                                                            <DropdownMenu >
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" className="h-8 w-[4%] p-0 cursor-pointer">
                                                                        <span className="sr-only">Open menu</span>
                                                                        <SlOptions className='font-thin text-black/70' />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent className="sm:max-w-[425px]" align="end">
                                                                    <DropdownMenuLabel className='border-b text-[12px]'>Order Action</DropdownMenuLabel>
                                                                    <DropdownMenuGroup>
                                                                        <View_Order_Details orderData={group} />
                                                                        <Accept_Order orderData={group} />
                                                                        <Decline_Order
                                                                            order_id={group.order_id}
                                                                            email={group.email}
                                                                            reference_id={group.reference_id}
                                                                            total_amount={group.total_amount}
                                                                            created_at={new Date(group.created_at).toLocaleString("en-US", { month: "long", day: 'numeric', year: "numeric" })}

                                                                        />
                                                                    </DropdownMenuGroup>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={` flex justify-center items-center absolute ${isExpanded ? 'bottom-5' : 'top-5'} right-4`}>
                                                {group.items.length > 1 && (
                                                    <button
                                                        onClick={() => toggleExpand(groupIndex)}
                                                        className='text-blue-400 text-[21px] cursor-pointer'
                                                    >
                                                        {isExpanded ? <BsArrowUpSquareFill /> : <BsArrowDownSquareFill />}
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    );
                                })}
                            </ScrollArea >

                            {/* mobile layout */}
                            <ScrollArea className="block md:hidden flex-1 w-full h-full bg-slate-50 pb-[50px]">
                                <div className="p-2 flex flex-col gap-2 pb-[50px]">
                                    {orders_data.map((group, groupIndex) => {
                                        const isExpanded = expandedGroups[groupIndex] || false;
                                        const hasMultipleItems = group.items.length > 1;

                                        return (
                                            <div
                                                key={groupIndex}
                                                className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                                            >
                                                
                                                <div className="p-4 border-b border-slate-100">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-900">#{group.order_id}</span>
                                                                <div className={`${recentOrderStatus[group.order_status]} px-2 py-0.5 rounded-full`}>
                                                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                                                        {group.order_status}
                                                                    </span>
                                                                </div>
                                                                {group.updated_at === group.created_at && (
                                                                    <span className="flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-full">
                                                                        <span className="relative flex h-2 w-2">
                                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                                                        </span>
                                                                        <span className="text-[10px] font-bold text-indigo-600 uppercase">New</span>
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-slate-500">
                                                                {new Date(group.created_at).toLocaleString("en-US", {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </p>
                                                        </div>

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="-mr-2 h-8 w-8 p-0">
                                                                    <SlOptions className="text-slate-500" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48">
                                                                <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                                                                <DropdownMenuGroup>
                                                                    <View_Order_Details orderData={group} />
                                                                    <Accept_Order orderData={group} />
                                                                    <Decline_Order
                                                                        order_id={group.order_id}
                                                                        email={group.email}
                                                                        reference_id={group.reference_id}
                                                                        total_amount={group.total_amount}
                                                                        created_at={group.created_at}
                                                                    />
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>

                                                
                                                <div className="px-4 py-3 bg-slate-50/50 flex items-center gap-3 border-b border-slate-100">
                                                    <Image
                                                        src={group.profile_Image}
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 rounded-full border border-white shadow-sm object-cover"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-slate-900 truncate">{group.email}</p>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <span>{group.payment_method}</span>
                                                            <span className="text-slate-300">•</span>
                                                            <span className={group.payment_status === 'success' ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                                                                {group.payment_status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                                <div
                                                    className="transition-all duration-300 ease-in-out overflow-hidden"
                                                    style={{ maxHeight: isExpanded ? '1000px' : '95px' }}
                                                >
                                                    <div className="p-4 flex flex-col gap-4">
                                                        {group.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="flex gap-3">
                                                                <div className="relative h-16 w-16 flex-shrink-0">
                                                                    <Image
                                                                        src={item.product_image}
                                                                        alt=""
                                                                        fill
                                                                        className="object-cover rounded-lg border border-slate-200"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col justify-center min-w-0">
                                                                    <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
                                                                        {item.product_name}
                                                                    </p>
                                                                    <p className="text-xs text-slate-500 mt-1">
                                                                        {item.quantity}x • {new Intl.NumberFormat('en-PH', {
                                                                            style: 'currency',
                                                                            currency: 'PHP',
                                                                            maximumFractionDigits: 0
                                                                        }).format(item.price)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                
                                                <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Total Amount</span>
                                                        <span className="text-sm font-bold text-indigo-600">
                                                            {new Intl.NumberFormat('en-PH', {
                                                                style: 'currency',
                                                                currency: 'PHP'
                                                            }).format(group.total_amount)}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-slate-400">{group.items.length} items</span>
                                                        {hasMultipleItems && (
                                                            <button
                                                                onClick={() => toggleExpand(groupIndex)}
                                                                className="p-1 hover:bg-slate-100 rounded-md transition-colors"
                                                            >
                                                                {isExpanded ? (
                                                                    <BsArrowUpSquareFill className="text-slate-400 text-xl" />
                                                                ) : (
                                                                    <BsArrowDownSquareFill className="text-indigo-500 text-xl" />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </>
                        :
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Orders Found
                        </div>
                )

            }


        </div>
    )
}

export default Order_list
