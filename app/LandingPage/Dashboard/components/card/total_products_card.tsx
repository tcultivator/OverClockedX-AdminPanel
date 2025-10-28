"use client"
import React from 'react'
import { BiStoreAlt } from "react-icons/bi";
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const Total_products_card = () => {
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalSoldOut, setTotalSoldOut] = useState(0)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        const fetchProductsCount = async () => {
            const totalCountInCard = await fetch('/api/Dashboard/card', {
                method: 'GET'
            })
            const response = await totalCountInCard.json()
            if (response.status != 500) {
                console.log(response)
                setTotalProducts(response.totalProducts.totalProducts)
                setTotalSoldOut(response.totalSoldOut.totalSoldOut)
            }
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className='p-2 flex flex-col justify-start bg-white rounded-[10px] border border-black/15 shadow-md h-max w-full'>
            <div className='flex justify-between  border-b border-black/15 p-3 shadow-b-md'>
                <div className='flex items-center gap-2'>
                    <BiStoreAlt className='bg-primary text-white p-2 text-4xl rounded-[50%]' />
                    <Label className='text-xl text-black/50'>Products</Label>
                </div>
                <Button onClick={()=>router.push('/LandingPage/ProductPage')} className='cursor-pointer' variant={'secondary'}><BsArrowUpRightCircle className='text-black/50'/></Button>
                
            </div>

            <div className='flex items-center justify-between p-3'>
                <div className='w-full items-center flex flex-col justify-center border-r border-black/15'>
                    {loading ? <Label className='text-black/40 py-2'><ClipLoader size={17} /> processing...</Label> : <Label className='text-2xl'>{totalProducts}</Label>}
                    <Label className='text-black/40'>Total</Label>
                </div>
                <div className='w-full items-center flex flex-col justify-center'>
                    {loading ? <Label className='text-black/40 py-2'><ClipLoader size={17} /> processing...</Label> : <Label className='text-2xl'>{totalSoldOut}</Label>}
                    <Label className='text-black/40'>Sold out</Label>
                </div>
            </div>
        </div>
    )
}

export default Total_products_card
