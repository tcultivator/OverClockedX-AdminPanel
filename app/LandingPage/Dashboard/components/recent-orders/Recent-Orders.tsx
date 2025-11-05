"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton"
import { recentOrderStatus } from '@/utils/AlertNotificationClass'
import { GroupOrdersData } from '@/utils/GroupOrderData';
import { GroupedOrder } from '@/types/GroupDataType';
const Recent_Orders = () => {
    const [groupedData, setGroupedData] = useState<GroupedOrder[]>([])
    const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const res = await fetch("/api/Dashboard/recent-orders")
                const result = await res.json()

                if (result.status === 500) {
                    console.error("Server error while fetching orders")
                    return
                }
                setGroupedData(GroupOrdersData(result))
            } catch (error) {
                console.error("Error fetching orders:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecentOrders()
    }, [])
    const toggleExpand = (index: number) => {
        setExpandedGroups(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    return (
        <div className='flex flex-col w-full bg-white pb-5 rounded-[15px] shadow-sm border border-black/15 text-black/70'>
            <div className='w-full p-3 px-5 border-b flex justify-between items-center'>
                <Label className="text-[15px] font-semibold">Recent Orders</Label>
            </div>
            <div className='w-full border-b flex items-center px-3 bg-black/10 py-2 text-black/60'>
                <div className='w-[6%] flex items-center justify-start '>
                    <Label className='text-black/70 text-[12px]'>Order id</Label>
                </div>
                <div className='w-[24%] flex items-center justify-start '>
                    <Label className='text-black/70 text-[12px]'>Product</Label>
                </div>
                <div className='w-[20%] flex items-center justify-start '>
                    <Label className='text-black/70 text-[12px]'>Customer</Label>
                </div>
                <div className='w-[15%] flex items-center justify-center '>
                    <Label className='text-black/70 text-[12px]'>Price</Label>
                </div>
                <div className='w-[10%] flex items-center justify-center '>
                    <Label className='text-black/70 text-[12px]'>Payment</Label>
                </div>
                <div className='w-[7%] flex items-center justify-center '>
                    <Label className='text-black/70 text-[12px]'>Quantity</Label>
                </div>
                <div className='w-[9%] flex items-center justify-center'>
                    <Label className='text-black/70 text-[12px]'>Payment Status</Label>
                </div>
                <div className='w-[9%] flex items-center justify-center'>
                    <Label className='text-black/70 text-[12px]'>Order Status</Label>
                </div>
            </div>
            {loading ?
                <div className='h-[28.5vh] flex flex-col gap-1 p-1 '>
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                    <Skeleton className="w-full h-full p-1 rounded" />
                </div> :
                (
                    groupedData.length > 0 ?
                        <ScrollArea className='h-[28.5vh] '>
                            {groupedData.map((group, groupIndex) => {
                                const isExpanded = expandedGroups[groupIndex] || false;
                                return (
                                    <div
                                        className='flex flex-col border-b relative '
                                        key={groupIndex}
                                    >
                                        <div
                                            style={{
                                                maxHeight: isExpanded ? 'none' : '60px',
                                                overflow: 'hidden',
                                                transition: 'max-height 0.6s ease',
                                            }}
                                            className=''
                                        >

                                            {group.items.map((item, itemIndex) => (
                                                <div
                                                    className='flex items-center'
                                                    key={itemIndex}
                                                >
                                                    <div className='flex items-center justify-center w-[6%]   '>
                                                        <Label className='font-thin'>{group.order_id}</Label>
                                                    </div>
                                                    <div className='flex gap-1 items-center justify-start w-[24%] pr-1'>
                                                        <Image
                                                            src={item.product_image}
                                                            alt=""
                                                            className='w-15 border border-white/50'
                                                            width={100}
                                                            height={100}
                                                        />
                                                        <Label className='font-thin'>{item.product_name}</Label>
                                                    </div>
                                                    <div className='flex w-[20%] items-center justify-start'>
                                                        <Label className='font-thin'>
                                                            {group.email}
                                                        </Label>
                                                    </div>
                                                    <div className='w-[15%] flex items-center justify-center '>
                                                        <Label className='font-thin'>
                                                            {new Intl.NumberFormat('en-PH', {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            }).format(item.price)}
                                                        </Label>
                                                    </div>
                                                    <div className='w-[10%] flex items-center justify-center '>
                                                        <Label className='font-thin'>
                                                            {group.payment_method}
                                                        </Label>
                                                    </div>
                                                    <div className='w-[6%] flex items-center justify-center '>
                                                        <Label className='font-thin'>{item.quantity}</Label>
                                                    </div>
                                                    <div className='w-[9%] flex items-center justify-center'>
                                                        <Label className={`${recentOrderStatus[group.payment_status]}font-thin`}>{group.payment_status}</Label>
                                                    </div>
                                                    <div className='w-[9%] flex items-center justify-center '>
                                                        <Label className={`${recentOrderStatus[group.order_status]}font-thin`}>{group.order_status}</Label>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>

                                        <div className=' flex justify-center items-center absolute bottom-2 right-4'>
                                            {group.items.length > 1 && (
                                                <button
                                                    onClick={() => toggleExpand(groupIndex)}
                                                    className='text-blue-400 text-[17px] cursor-pointer'
                                                >
                                                    {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                );
                            })}
                        </ScrollArea > :
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No Recent Orders Found
                        </div>
                )

            }


        </div>
    )
}

export default Recent_Orders
