"use client"
import React, { useState } from 'react'
import { ProductsType } from '@/types/ProductsType'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

type Props = {
    data: ProductsType
}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";
import { MdNewReleases } from "react-icons/md";



import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button'
import { SlOptions } from "react-icons/sl";
import { Badge } from "@/components/ui/badge"
import { RemoveProduct } from './RemoveProduct/RemoveProduct'
import { useProductsStore } from '@/stores/productsStore'

import { EditProduct } from './EditProduct/EditProduct'

import { formatDateYYYYMMDD } from '@/utils/getCurrentDateFunction'
const ProductCardLayout = ({ data }: Props) => {
    const [currentStocks, setCurrentStocks] = useState(data.stocks)
    const editStocks = useProductsStore((state) => state.editStocks)
    const date = new Date()
    return (
        <div className='border-b border-white/15 flex items-center p-2 relative'>

            <div className='flex gap-2 w-[40%] relative'>
                <Image
                    src={data.product_image}
                    width={100}
                    height={100}
                    alt=''
                    className='w-[50px] border border-white/10 rounded h-[50px]' />
                <div className='flex flex-col justify-center'>
                    <Label>{data.product_name}</Label>
                    <Label className='font-thin text-[10px]'>{data.brand}</Label>
                </div>

                {new Date(data.created_at).toLocaleDateString('en-GB') == formatDateYYYYMMDD(date) && <MdNewReleases className='absolute text-green-500 top-[-5px] left-[-10px]' />}

            </div>
            <div className='w-[13%]'>
                <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                }).format(data.price)}</Label>
            </div>
            <div className='w-[13%]'>
                <div className={`${data.stocks > 0 ? (data.stocks <= 10 ? 'Low bg-[#FFFBD3] text-[#F6BB3A] border border-[#F6BB3A]' : 'bg-[#C5FFC8] text-green-800 border border-green-800') : 'bg-[#FFD5D8] text-red-500 border border-red-500'} w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]`}>
                    {data.stocks > 0 ? (data.stocks <= 10 ? <IoIosWarning className='text-[12px]' /> : <IoMdCheckmark className='text-[12px]' />) : <RxCross1 className='text-[12px]' />}
                    <Label className='text-[11px] flex items-center justify-center'>{data.stocks > 0 ? (data.stocks <= 10 ? 'Low Stocks' : 'Available') : 'Out of stock'}</Label>
                </div>

            </div>
            <div className='w-[12%]'>
                <Label className='font-thin'>{data.stocks}</Label>
            </div>
            <div className='w-[10%]'>
                <Label className='font-thin'>{data.sales_count} sold</Label>
            </div>
            <div className='w-[8%]'>
                <Label className='font-thin'>{new Date(data.created_at).toLocaleDateString('en-GB')}</Label>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-[4%] p-0 cursor-pointer">
                        <span className="sr-only">Open menu</span>
                        <SlOptions />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />


                    <EditProduct data={data} />

                    <RemoveProduct product_id={data.product_id} product_name={data.product_name} product_image={data.product_image} />

                    <Dialog>
                        <form>
                            <DialogTrigger className='w-full'>
                                <Label className='p-2 font-thin cursor-pointer rounded hover:bg-white/5'>Edit Stocks</Label>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit Stocks</DialogTitle>
                                    <DialogDescription>
                                        Make changes to product stocks here. Click save when you&apos;re
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 border border-white/10 rounded bg-white/10 p-2">
                                    <div className="flex items-center gap-2  ">
                                        <Image src={data.product_image} width={100} height={100} alt=" " className="w-[100px]" />
                                        <div className='flex flex-col gap-2'>
                                            <Label>{data.product_name}</Label>
                                            <Label>{new Intl.NumberFormat('en-PH', {
                                                style: 'currency',
                                                currency: 'PHP',
                                            }).format(data.price)}</Label>
                                        </div>

                                    </div>
                                    <div className="grid gap-3">
                                        <Label className='font-thin'>Total Sales: <span>{data.sales_count} sold</span></Label>
                                        <Label className='font-thin'>Current Stocks: <span>{data.stocks} products left</span></Label>
                                    </div>
                                    <div className='flex gap-1'>
                                        <button className='bg-red-400 aspect-square w-7 cursor-pointer rounded bg-white/80 text-black flex items-center justify-center' onClick={() => {
                                            if (currentStocks > 0) {
                                                setCurrentStocks(prev => prev - 1)
                                            }
                                        }}><FiMinus /></button>
                                        <input type="number" className='border border-white/15 rounded text-center px-5 w-max ' value={currentStocks || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentStocks(Number(e.target.value))} />
                                        <button className=' aspect-square w-7 cursor-pointer rounded bg-white/80 text-black flex items-center justify-center' onClick={() => { setCurrentStocks(prev => prev + 1) }}><GoPlus /></button>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <DropdownMenuItem>
                                            <Button variant="outline">Cancel</Button>
                                        </DropdownMenuItem>

                                    </DialogClose>
                                    <DropdownMenuItem>
                                        <Button type="button" onClick={() => {
                                            editStocks(data.product_id, currentStocks)
                                        }}>Save changes</Button>
                                    </DropdownMenuItem>

                                </DialogFooter>
                            </DialogContent>
                        </form>
                    </Dialog>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProductCardLayout
