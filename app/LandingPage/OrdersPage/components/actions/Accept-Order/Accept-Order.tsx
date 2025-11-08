"use client"
import React, { useEffect, useRef } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { GroupedOrder } from '@/types/GroupDataType'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { LuUserRound } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { PiAddressBookTabs } from "react-icons/pi";
import { useOrderStore } from '@/stores/ordersStore'
import { ClipLoader } from 'react-spinners'
import { useLoading } from '@/stores/loadingStore'
import { useReactToPrint } from "react-to-print";
import RecieptUI from './RecieptUI/RecieptUI'

import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
type props = {
    orderData: GroupedOrder
}

const Accept_Order = ({ orderData }: props) => {
    const acceptOrder = useOrderStore((state) => state.acceptOrder)
    const buttonLoading = useLoading((state) => state.buttonLoading)
    const QRCodeData = useOrderStore((state) => state.QRCodeData)
    const GenerateQR = useOrderStore((state) => state.GenerateQR)
    const RecieptComponentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        GenerateQR(orderData.order_id, orderData.items[0].product_id)
    }, [])

    const PrintReciept = useReactToPrint({
        contentRef: RecieptComponentRef,
        documentTitle: "Receipt_1234",
    })
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='w-full text-start flex justify-start items-center p-2 font-regular cursor-pointer' variant='ghost'>Accept Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[90vh]'>
                <AlertDialogHeader>
                    {orderData.order_status == 'pending' ? <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> : <AlertDialogTitle>Please review order reciept before printing</AlertDialogTitle>}
                    {orderData.order_status == 'pending' ? <AlertDialogDescription>
                        Once accepted, the order status will be updated and the customer will be notified.
                    </AlertDialogDescription> : <AlertDialogDescription>
                        Once Review, you can print the reciept for preparing the order.
                    </AlertDialogDescription>}
                </AlertDialogHeader>
                <>
                    {
                        orderData.order_status == 'pending' || orderData.order_status == 'cancel' ?
                            <>
                                <div className='flex flex-col'>
                                    <Label className='text-md'>Order Id:{orderData.order_id}</Label>
                                    <Label className='text-black/60 text-sm'>{new Date(orderData.created_at).toLocaleString("en-US", { month: "long", day: 'numeric', year: "numeric" })}</Label>
                                </div>
                                <div className='flex gap-2'>
                                    <div className=' flex flex-col gap-2 w-full'>
                                        <div className='p-3 border rounded-[10px] border-black/15 flex flex-col gap-2'>
                                            <div className='flex items-center gap-3'>
                                                <Label>Order Item</Label>
                                                <Label className='font-thin flex items-center justify-center p-1 rounded bg-red-400/30 text-red-400 w-max px-2'>Order {orderData.order_status}</Label>
                                            </div>
                                            <Label className="text-sm text-gray-500">These are the products in the order.</Label>

                                            <div className='flex flex-col gap-1'>
                                                {
                                                    orderData.items.map((data, index) => (
                                                        <div key={index} className='flex gap-1 items-center'>
                                                            <Image src={data.product_image} alt='' width={100} height={100} className='w-20 rounded bg-black/15' />
                                                            <div className='flex flex-col gap-1'>
                                                                <Label>{data.product_name}</Label>
                                                                <Label>{new Intl.NumberFormat('en-PH', {
                                                                    style: 'currency',
                                                                    currency: 'PHP',
                                                                }).format(data.price)}</Label>
                                                                <Label className='text-[11px] text-black/70'>x{data.quantity}</Label>
                                                            </div>

                                                        </div>

                                                    ))
                                                }



                                            </div>
                                        </div>
                                        <div className='p-3 border rounded-[10px] border-black/15 flex flex-col gap-2'>
                                            <div className='flex items-center gap-3'>
                                                <Label>Order Summary</Label>
                                                <Label className='font-thin flex items-center justify-center p-1 rounded bg-green-400/30 text-green-400 w-max'>Payment {orderData.payment_status}</Label>
                                            </div>
                                            <Label className="text-sm text-gray-500">A summary of the customer's order details.</Label>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center justify-between text-black/70'>
                                                    <Label className='font-thin'>Payment</Label>
                                                    <Label className='font-thin'>{orderData.payment_method}</Label>
                                                </div>
                                                <div className='flex items-center justify-between text-black/70'>
                                                    <Label className='font-thin'>Subtotal</Label>
                                                    <div className='flex items-center gap-5'>
                                                        <Label className='font-thin'>{orderData.items.length} items</Label>
                                                        <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                                                            style: 'currency',
                                                            currency: 'PHP',
                                                        }).format(orderData.total_amount)}</Label>
                                                    </div>

                                                </div>
                                                <div className='flex items-center justify-between text-black/70'>
                                                    <Label className='font-thin'>Shipping</Label>
                                                    <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                                                        style: 'currency',
                                                        currency: 'PHP',
                                                    }).format(0)}</Label>
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <Label>Total</Label>
                                                    <Label>{new Intl.NumberFormat('en-PH', {
                                                        style: 'currency',
                                                        currency: 'PHP',
                                                    }).format(orderData.total_amount)}</Label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-col gap-2'>
                                        <div className='border border-black/15 rounded-[10px] p-3 flex flex-col gap-2'>
                                            <Label>Customer</Label>
                                            <div>
                                                <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                    <LuUserRound className='mb-[3px]' />
                                                    <Label className='text-[13px] '>{orderData.rname}</Label>
                                                </div>
                                                <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                    <HiOutlineMail className='mb-[2px]' />
                                                    <Label className='text-[13px] '>{orderData.email}</Label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border border-black/15 rounded-[10px] p-3 flex flex-col gap-2'>
                                            <Label>Contact Information</Label>
                                            <div>
                                                <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                    <HiOutlineMail className='mb-[2px]' />
                                                    <Label className='text-[13px] '>{orderData.email}</Label>
                                                </div>
                                                <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                    <MdOutlineLocalPhone className='mb-[2px]' />
                                                    <Label className='text-[13px] '>{orderData.phone_number}</Label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border border-black/15 rounded-[10px] p-3 flex flex-col gap-2'>
                                            <Label>Shipping address</Label>
                                            <div>
                                                <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                    <LuUserRound className='mb-[3px]' />
                                                    <Label className='text-[13px] '>{orderData.rname}</Label>
                                                </div>
                                                <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                    <FaRegFlag className='mb-[2px]' />
                                                    <Label className='text-[13px] '>{orderData.country}</Label>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='flex items-center  justify-start text-black/70 gap-1'>
                                                        <PiAddressBookTabs />
                                                        <Label className='text-[13px] '>{orderData.barangay}</Label>,
                                                        <Label className='text-[13px] '>{orderData.city_municipality}</Label>,
                                                        <Label className='text-[13px] '>{orderData.province}</Label>
                                                    </div>
                                                    <Button>View In Map</Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                            : <div ref={RecieptComponentRef}>
                                <RecieptUI orderData={orderData} QRCodeData={QRCodeData} />
                            </div>



                    }
                </>
                {/* the accept order button should be change to print button if admin accept order and start generating the order reciept */}
                <AlertDialogFooter className='flex items-center'>

                    <DropdownMenuItem>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </DropdownMenuItem>

                    {
                        orderData.order_status == 'pending' || orderData.order_status == 'cancel' ?
                            <Button disabled={buttonLoading || orderData.order_status == 'cancel'} className='cursor-pointer' onClick={() => acceptOrder(orderData.order_id, orderData.items[0].product_id)}>{buttonLoading ? (
                                <>
                                    <ClipLoader size={16} color="#fff" /> Please wait...
                                </>
                            ) : (
                                'Accept Order'
                            )}</Button> :
                            <Button disabled={buttonLoading} className='cursor-pointer' onClick={() => PrintReciept()}>{buttonLoading ? (
                                <>
                                    <ClipLoader size={16} color="#fff" /> Please wait...
                                </>
                            ) : (
                                'Print Reciept'
                            )}</Button>
                    }

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

export default Accept_Order
