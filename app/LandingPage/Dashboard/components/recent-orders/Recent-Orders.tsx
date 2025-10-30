"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton"
type GroupedOrder = {
    order_id: number;
    email: string;
    reference_id: string;
    total_amount: number;
    payment_status: string;
    order_status: string;
    created_at: string;
    items: {
        product_id: string;
        product_name: string;
        product_image: string;
        quantity: number;
        price: number;
        sub_total: number;
    }[];
};
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

                const tempGroup: GroupedOrder[] = []

                for (const product of result) {
                    const index = tempGroup.findIndex(
                        (g) => g.order_id === product.order_id
                    )

                    if (index === -1) {
                        tempGroup.push({
                            order_id: product.order_id,
                            email: product.email,
                            reference_id: product.reference_id,
                            total_amount: product.total_amount,
                            payment_status: product.payment_status,
                            order_status: product.order_status,
                            created_at: product.created_at,
                            items: [
                                {
                                    product_id: product.product_id,
                                    product_name: product.product_name,
                                    product_image: product.product_image,
                                    quantity: product.quantity,
                                    price: product.price,
                                    sub_total: product.sub_total,
                                },
                            ],
                        })
                    } else {
                        tempGroup[index].items.push({
                            product_id: product.product_id,
                            product_name: product.product_name,
                            product_image: product.product_image,
                            quantity: product.quantity,
                            price: product.price,
                            sub_total: product.sub_total,
                        })
                    }
                }
                console.log('eto ung laman ng tempGroup', tempGroup)
                setGroupedData(tempGroup)
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
        <div className='flex flex-col w-full bg-white pb-5 rounded-[15px] shadow-sm'>
            <div className='w-full p-3 px-5 border-b flex justify-between items-center'>
                <Label className="text-[15px] font-semibold">Recent Orders</Label>
            </div>
            <div className='w-full border-b flex items-center px-3 bg-primary/30 py-2'>
                <div className='w-[6%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Order id</Label>
                </div>
                <div className='w-[24%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Product</Label>
                </div>
                <div className='w-[20%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Customer</Label>
                </div>
                <div className='w-[15%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Price</Label>
                </div>
                <div className='w-[10%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Payment</Label>
                </div>
                <div className='w-[7%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Quantity</Label>
                </div>
                <div className='w-[9%] flex items-center justify-start '>
                    <Label className='font-thin text-[12px]'>Payment Status</Label>
                </div>
                <div className='w-[9%] flex items-center justify-start'>
                    <Label className='font-thin text-[12px]'>Order Status</Label>
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
                                            <div className='flex w-[20%]'>
                                                <Label className='font-thin'>
                                                    {group.email}
                                                </Label>
                                            </div>
                                            <div className='w-[15%] flex items-center justify-start '>
                                                <Label className='font-thin'>
                                                    {new Intl.NumberFormat('en-PH', {
                                                        style: 'currency',
                                                        currency: 'PHP',
                                                    }).format(item.price)}
                                                </Label>
                                            </div>
                                            <div className='w-[10%] flex items-center justify-start '>
                                                <Label className='font-thin'>
                                                    Gcash
                                                </Label>
                                            </div>
                                            <div className='w-[7%] flex items-center justify-start '>
                                                <Label className='font-thin'>{item.quantity}</Label>
                                            </div>
                                            <div className='w-[9%] flex items-center justify-start '>
                                                <Label className='font-thin'>{group.payment_status}</Label>
                                            </div>
                                            <div className='w-[9%] flex items-center justify-start '>
                                                <Label className='font-thin'>{group.order_status}</Label>
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
                </ScrollArea >
            }


        </div>
    )
}

export default Recent_Orders
