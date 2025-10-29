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
            }
            setLoading(false)
        }
        fetchProductsCount()
    }, [])
    return (
        <div className='p-5 flex bg-white items-center gap-1 rounded-[10px] border border-black/15 shadow-sm h-max w-full'>
            <div className='bg-[#fa6093] flex justify-center items-center p-2.5 rounded-[50%]'>
                <BiStoreAlt className='text-white text-2xl' />
            </div>
            <div>
                <Label className='text-black/50 text-[13px]'>Total Products</Label>
                <Label className='text-black/70 text-[15px]'>{totalProducts}</Label>
            </div>
        </div>
    )
}

export default Total_products_card
