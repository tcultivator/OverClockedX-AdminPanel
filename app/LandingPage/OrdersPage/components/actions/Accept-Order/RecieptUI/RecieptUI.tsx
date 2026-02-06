import React from 'react'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { GroupedOrder } from '@/types/GroupDataType'
type props = {
    orderData: GroupedOrder;
    QRCodeData: string;
}
const RecieptUI = ({ orderData, QRCodeData }: props) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl shadow-inner text-center">
            <div className=' bg-white border border-black w-[500px]'>
                <div className='w-full flex justify-center border-b border-black p-3'>
                    <Label className='font-anton text-xl'>OverClockedX</Label>
                </div>
                <div className='flex items-center'>
                    <div className='flex items-center gap-1 p-3 w-full border-r border-black'>
                        <Label className='font-thin'>ReferenceId :</Label>
                        <Label>{orderData.reference_id}</Label>
                    </div>
                    <div className='flex items-center gap-1 p-3 w-full'>
                        <Label className='font-thin'>OrderId :</Label>
                        <Label>{orderData.order_id}</Label>
                    </div>
                </div>
                {/* buyer section */}
                <div className="flex box-border border-t border-black relative">
                    <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-[100px] flex items-center justify-center rotate-[270deg] border-b-[2.3px] border-black/60 p-3">
                        <Label>BUYER</Label>
                    </div>
                    <div className='h-[100px] ml-11 w-full p-3 flex flex-col gap-2 '>
                        <div className=' flex items-center'>
                            <div className='flex items-center  gap-1 w-full'>
                                <Label className='font-thin'>Reciever :</Label>
                                <Label>{orderData.rname}</Label>
                            </div>
                            <div className='flex items-center gap-1 w-full'>
                                <Label className='font-thin'>Phone number :</Label>
                                <Label>{orderData.phone_number}</Label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 ">

                            <div className='flex gap-2'>
                                <Label>Address :</Label>
                                <div className="flex flex-wrap gap-2">
                                    <Label className="font-thin text-md">{orderData.barangay}</Label>
                                    <Label className="font-thin text-md">{orderData.city_municipality}</Label>
                                    <Label className="font-thin text-md">{orderData.province}</Label>
                                    <Label className="font-thin text-md">{orderData.address_line_1}</Label>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <Label>Trademark :</Label>
                                <Label className="font-thin text-md">{orderData.postal_code}</Label>
                            </div>

                        </div>
                    </div>

                </div>
                {/* seller section */}
                <div className="flex box-border border-t border-black relative">
                    <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-[100px] flex items-center justify-center rotate-[270deg] border-b-[2.3px] border-black/60 p-3">
                        <Label>SELLER</Label>
                    </div>
                    <div className='h-[100px] ml-11 w-full p-3 flex flex-col gap-2 '>
                        <div className=' flex items-center'>
                            <div className='flex items-center  gap-1 w-full'>
                                <Label className='font-thin'>Sender :</Label>
                                <Label>OverClockedX</Label>
                            </div>
                            <div className='flex items-center gap-1 w-full'>
                                <Label className='font-thin'>Phone number :</Label>
                                <Label>{orderData.phone_number}</Label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 ">

                            <div className='flex gap-2'>
                                <Label>Address :</Label>
                                <div className="flex flex-wrap gap-2">
                                    <Label className="font-thin text-md">{orderData.barangay}</Label>
                                    <Label className="font-thin text-md">{orderData.city_municipality}</Label>
                                    <Label className="font-thin text-md">{orderData.province}</Label>
                                    <Label className="font-thin text-md">{orderData.address_line_1}</Label>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <Label>Trademark :</Label>
                                <Label className="font-thin text-md">{orderData.postal_code}</Label>
                            </div>

                        </div>
                    </div>

                </div>

                {/* product details */}

                <div className='border-t border-black'>
                    <div className='p-1 flex items-center justify-between px-2 border-b border-black/20'>
                        <Label className='text-[12px] w-[60%]'>Product Name</Label>
                        <Label className='text-[12px] w-[30%]'>Price</Label>
                        <Label className='text-[12px] w-[10%]'>Quantity</Label>
                    </div>
                    <div className='flex flex-col w-full pb-2'>
                        {
                            orderData.items.map((data, index) => (
                                <div key={index} className='w-full flex items-center justify-between p-1 px-2'>
                                    <div className='w-[60%]'>
                                        <Label>{data.product_name}</Label>
                                    </div>
                                    <div className='w-[30%]'>
                                        <Label>{new Intl.NumberFormat('en-PH', {
                                            style: 'currency',
                                            currency: 'PHP',
                                        }).format(data.price)}</Label>
                                    </div>
                                    <div className='w-[10%]'>
                                        <Label>{data.quantity}</Label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* QRCode */}

                <div className='border-t border-black flex items-center h-[200px]'>
                    <div className='w-[40%] bg-black/70 p-[2px]'>
                        <Image src={QRCodeData} alt='' width={500} height={500} />
                    </div>
                    <div className='w-[60%] flex flex-col h-full'>
                        <div className='w-full h-[50%]  p-4 border-b border-black flex flex-col justify-between'>
                            <Label>Signiture:</Label>
                            <div className='flex w-full items-center justify-center'>
                                <div className='w-[80%] border-b border-black/50'> </div>
                            </div>

                        </div>
                        <div className='w-full h-[50%]  p-4 flex flex-col justify-between'>
                            <Label>Delivery Attemp:</Label>
                            <div className='flex w-full items-center justify-center p-2'>
                                <div className='p-3 border border-black aspect-square flex items-center justify-center w-[50px] h-[50px]'><Label className='text-[20px]'>1</Label></div>
                                <div className='p-3 border-r border-y border-black aspect-square flex items-center justify-center w-[50px] h-[50px]'><Label className='text-[20px]'>2</Label></div>
                                <div className='p-3 border-r border-y border-black aspect-square flex items-center justify-center w-[50px] h-[50px]'><Label className='text-[20px]'>3</Label></div>
                                <div className='p-3 border-r border-y border-black aspect-square flex items-center justify-center w-[50px] h-[50px]'><Label className='text-[20px]'>4</Label></div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default RecieptUI
