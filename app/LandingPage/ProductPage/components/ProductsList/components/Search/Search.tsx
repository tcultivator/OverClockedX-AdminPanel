"use client"
import React from 'react'
//ui components
import { GoSearch } from "react-icons/go";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import Image from 'next/image';

import { useState } from 'react';
import { ProductsType } from '@/types/ProductsType';
import { ScrollArea } from "@/components/ui/scroll-area"
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoIosWarning } from "react-icons/io";

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import { RiStackLine } from "react-icons/ri";
const Search = () => {
    const [searchValu, setSearchVal] = useState('')
    const [searchResults, setSearchResults] = useState<ProductsType[]>([])
    let isTimeoutActive: ReturnType<typeof setTimeout> | null = null;
    const inputRef = useRef<HTMLInputElement>(null);

    const searchParams = useSearchParams();
    const searchProducts = (value: string) => {
        if (isTimeoutActive != null) {
            clearTimeout(isTimeoutActive)
        }
        isTimeoutActive = setTimeout(() => {

            setSearchVal(value)
            if (value != '') {
                searchFunction(value)
            } else {
                setSearchResults([])
            }
        }, 1500)

    }

    const searchFunction = async (value: string) => {
        console.log('eto ung search payload,', value)
        const searchproduct = await fetch('/api/searchProducts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ searchValue: value })
        })
        const result = await searchproduct.json()
        if (result.status !== 500) {
            console.log('eto ung result ng search! ', result)
            setSearchResults(result)
        } else {
            console.log('something went wrong')
        }
    }

    // const handleClear = () => {
    //     if (inputRef.current) {
    //         console.log(inputRef.current.value)
    //         inputRef.current.value = "";
    //         searchProducts('')
    //     }

    // };

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputRef.current) {
            if (inputRef.current.value != '') {
                const params = new URLSearchParams(searchParams.toString());
                console.log(inputRef.current.value)
                params.set('category', inputRef.current.value.toString());
                params.set('type', 'search')
                window.history.pushState({}, '', `?${params.toString()}`);
                inputRef.current.value = "";
                searchProducts('')
            }

        }
    }

    return (
        <div className='w-full relative'>
            <form onSubmit={submitSearch} className='flex gap-1 items-center w-full '>
                <Input type="text" placeholder="Search" ref={inputRef} onChange={(e) => searchProducts(e.target.value)} />
                <Button variant={'secondary'} className='text-black/80 border border-black/50 cursor-pointer' type='submit'><GoSearch /></Button>
            </form>
            <div className={` bg-[#F1F0EE] max-h-[50vh] shadow-2xl border border-black/15 overflow-auto mt-1 rounded w-full absolute z-50  flex-col ${searchResults.length != 0 ? 'flex' : 'hidden'}`}>
                <div className='flex bg-white text-black p-1 rounded-t sticky top-0 border-b border-black/30'>
                    <Label className='text-[11px] w-[50%]'>Products</Label>
                    <Label className='text-[11px] w-[15%]'>Price</Label>
                    <Label className='text-[11px] w-[10%]'>Stocks</Label>
                    <Label className='text-[11px] w-[10%]'>Sold</Label>
                    <Label className='text-[11px] w-[15%]'>Status</Label>
                </div>
                <div className='flex flex-col gap-1 p-1'>
                    {searchResults.map((data, index) => (
                        <div key={index} className='flex items-center bg-[#FFFFFF] text-black shadow-sm p-1 rounded border border-black/15'>
                            <div className='flex items-center  rounded  cursor-pointer  w-[50%]'>
                                <Image src={data.product_image} width={100} height={100} alt='' className='w-[50px]' />
                                <div className='flex flex-col cursor-pointer'>
                                    <Label className='text-[12px] font-thin'>{data.product_name}</Label>
                                </div>
                            </div>
                            <Label className='w-[15%] text-[13px] font-thin'>{new Intl.NumberFormat('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(data.price)}</Label>
                            <div className='w-[10%] flex items-center gap-1'>
                                <RiStackLine className='text-[12px]' />
                                <Label className='text-[13px]  font-thin'>{data.stocks}</Label>
                            </div>

                            <Label className='text-[13px] w-[10%] font-thin'>{data.sales_count}</Label>
                            <div className='w-[15%]'>
                                <div className={`${data.stocks > 0 ? (data.stocks <= 10 ? 'Low bg-[#FFFBD3] text-[#F6BB3A] border border-[#F6BB3A]' : 'bg-[#C5FFC8] text-green-800 border border-green-800') : 'bg-[#FFD5D8] text-red-500 border border-red-500'} w-max  rounded-[10px]  flex justify-center items-center px-2 py-[2px]`}>
                                    {data.stocks > 0 ? (data.stocks <= 10 ? <IoIosWarning className='text-[12px]' /> : <IoMdCheckmark className='text-[12px]' />) : <RxCross1 className='text-[12px]' />}
                                    <Label className='text-[10px] flex items-center justify-center'>{data.stocks > 0 ? (data.stocks <= 10 ? 'Low Stocks' : 'Available') : 'Out of stock'}</Label>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </div>

    )
}

export default Search
