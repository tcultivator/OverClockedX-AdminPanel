"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { recentOrderStatus } from '@/utils/AlertNotificationClass'
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { SlOptions } from "react-icons/sl";
import { useOrderStore } from '@/stores/ordersStore';
import { GroupedOrder } from '@/types/GroupDataType';
import Accept_Order from '../actions/Accept-Order/Accept-Order';
const Order_list = () => {
    const orders_data = useOrderStore((state) => state.orders_data)
    const setOrders_data = useOrderStore((state) => state.setOrders_data)
    const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const res = await fetch("/api/OrdersPage/Orders-list")
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
                            profile_Image: product.profile_Image,
                            reference_id: product.reference_id,
                            total_amount: product.total_amount,
                            payment_method: product.payment_method,
                            payment_status: product.payment_status,
                            order_status: product.order_status,
                            created_at: product.created_at,
                            rname: product.rname,
                            phone_number: product.phone_number,
                            country: product.country,
                            city_municipality: product.city_municipality,
                            barangay: product.barangay,
                            province: product.province,
                            trademark: product.trademark,
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
                setOrders_data(tempGroup)
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
        <div className='flex flex-col h-full w-full bg-white pb-5 rounded-[15px] shadow-sm border border-black/15 text-black/70'>
            <div className='w-full p-3 px-5 border-b flex justify-between items-center'>
                <Label className="text-[15px] font-semibold">Orders</Label>
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
                <div className='w-[15%] flex items-center justify-start '>
                    <Label className='text-black/70 text-[12px]'>Price</Label>
                </div>
                <div className='w-[10%] flex items-center justify-start '>
                    <Label className='text-black/70 text-[12px]'>Payment</Label>
                </div>
                <div className='w-[7%] flex items-center justify-start '>
                    <Label className='text-black/70 text-[12px]'>Quantity</Label>
                </div>
                <div className='w-[9%] flex items-center justify-start'>
                    <Label className='text-black/70 text-[12px]'>Payment Status</Label>
                </div>
                <div className='w-[9%] flex items-center justify-start'>
                    <Label className='text-black/70 text-[12px]'>Order Status</Label>
                </div>
                <div className='w-[7%] flex items-center justify-start'>
                    <Label className='text-black/70 text-[12px]'>Actions</Label>
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
                        <ScrollArea className='h-full  '>
                            {orders_data.map((group, groupIndex) => {
                                const isExpanded = expandedGroups[groupIndex] || false;
                                return (
                                    <div
                                        className='flex flex-col border-b relative'
                                        key={groupIndex}
                                    >
                                        <div
                                            style={{
                                                maxHeight: isExpanded ? 'none' : '60px',
                                                overflow: 'hidden',
                                                transition: 'max-height 0.6s ease',
                                                background: isExpanded ? '#fac1d37c' : ''
                                            }}
                                            className='px-3'
                                        >

                                            {group.items.map((item, itemIndex) => (
                                                <div
                                                    className='flex items-center'
                                                    key={itemIndex}
                                                >
                                                    <div className='flex items-center justify-start w-[6%]   '>
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
                                                    <div className='flex w-[20%] items-center justify-start gap-1'>
                                                        <Image src={group.profile_Image} alt='' width={100} height={100} className='w-8 rounded-[50%] border border-black/15' />
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
                                                            {group.payment_method}
                                                        </Label>
                                                    </div>
                                                    <div className='w-[6%] flex items-center justify-start '>
                                                        <Label className='font-thin'>{item.quantity}</Label>
                                                    </div>
                                                    <div className='w-[9%] flex items-center justify-start'>
                                                        <Label className={`${recentOrderStatus[group.payment_status]}font-thin`}>{group.payment_status}</Label>
                                                    </div>
                                                    <div className='w-[9%] flex items-center justify-start '>
                                                        <Label className={`${recentOrderStatus[group.order_status]}font-thin`}>{group.order_status}</Label>
                                                    </div>
                                                    <div className='w-[7%] flex items-center justify-start'>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-[4%] p-0 cursor-pointer">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <SlOptions className='font-thin text-black/70' />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="sm:max-w-[425px]" align="end">
                                                                <DropdownMenuLabel>Order Action</DropdownMenuLabel>
                                                                <DropdownMenuGroup>
                                                                    <DropdownMenuItem>
                                                                        View Order Details
                                                                    </DropdownMenuItem>
                                                                    <Accept_Order orderData={group} />
                                                                    <DropdownMenuItem>
                                                                        Decline Order
                                                                    </DropdownMenuItem>
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
                                                    className='text-blue-400 text-[12px] cursor-pointer'
                                                >
                                                    {isExpanded ? 'show less' : 'show more'}
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

export default Order_list
