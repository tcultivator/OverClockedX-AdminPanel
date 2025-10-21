"use client"
import React from 'react'
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


import { Button } from '@/components/ui/button'
import { SlOptions } from "react-icons/sl";

import { RemoveProduct } from './RemoveProduct/RemoveProduct'
const ProductCardLayout = ({ data }: Props) => {
    return (
        <div className='border-b border-white/15 flex items-center p-2'>
            <div className='flex gap-2 w-[40%]'>
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

            </div>
            <div className='w-[13%]'>
                <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                }).format(data.price)}</Label>
            </div>
            <div className='w-[13%]'>
                <Label className={`${data.stocks > 0 ? 'bg-green-600' : 'bg-red-600'} w-max px-2 py-1 rounded`}>{data.stocks > 0 ? 'Available' : 'Out of stock'}</Label>
            </div>
            <div className='w-[12%]'>
                <Label className='font-thin'>{data.stocks}</Label>
            </div>
            <div className='w-[10%]'>
                <Label className='font-thin'>{data.sales_count}</Label>
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
                    <Label className='p-2 font-thin cursor-pointer rounded hover:bg-white/5'>Edit Product</Label>

                    <RemoveProduct product_id={data.product_id} product_name={data.product_name} product_image={data.product_image} />

                    <Label className='p-2 font-thin cursor-pointer rounded hover:bg-white/5'>Add Stocks</Label>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProductCardLayout
