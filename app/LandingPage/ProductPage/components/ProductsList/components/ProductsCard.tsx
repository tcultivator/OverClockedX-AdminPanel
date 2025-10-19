"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { ProductsType } from '@/types/ProductsType'
import { SlOptions } from "react-icons/sl";
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLoading } from '@/stores/loadingStore'
import { Skeleton } from '@/components/ui/skeleton'
type Props = {
    products: ProductsType[]
    totalPages: number
}

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const ProductsCard = ({ products, totalPages }: Props) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [productsPage, setProductsPage] = useState(products)

    const loading = useLoading((state) => state.loading)
    const setLoading = useLoading((state) => state.setLoading)
    const [totalpages] = useState(() => {
        const arr: number[] = []
        for (let index = 1; index < totalPages; index++) {
            console.log(index)
            arr.push(index)

        }
        return arr
    })
    const [pagintionDisplayWindow, setPaginationDisplayWindow] = useState(() => {
        return totalpages.slice(currentPage - 1, (currentPage - 1) + 3)
    })
    const navigatePagination = async (page: number) => {
        setLoading(true)
        const getProductsByPage = await fetch(`/api/productListPagination?page=${page}`, {
            method: 'GET'
        })
        const response = await getProductsByPage.json()
        console.log(response)
        setProductsPage(response)
        setCurrentPage(page)
        console.log('wht is this? ', pagintionDisplayWindow[pagintionDisplayWindow.length - 1])
        if (page < totalpages[totalpages.length - 1] && page != 1) {
            setPaginationDisplayWindow(() => {
                return totalpages.slice(page - 2, (page - 2) + 3)
            })
        }
        if (page == 1) {
            setPaginationDisplayWindow(() => {
                return totalpages.slice(page - 1, (page - 1) + 3)
            })
        }
        if (page == totalpages[totalpages.length - 1]) {
            setPaginationDisplayWindow(() => {
                return totalpages.slice(page - 3, (page - 3) + 3)
            })
        }
        setLoading(false)


    }
    return (
        <div className='flex flex-col h-[80vh] justify-between'>
            <div className=' px-2 max-h-[76vh] overflow-auto sticky'>
                <div className='flex items-center bg-neutral-800 rounded-t p-2 sticky top-0'>
                    <div className='w-[40%] flex justify-start '>Products</div>
                    <div className='w-[13%] flex justify-start '>Price</div>
                    <div className='w-[13%] flex justify-start '>Status</div>
                    <div className='w-[12%] flex justify-start '>Stocks</div>
                    <div className='w-[12%] flex justify-start '>Total sales</div>
                    <div className='w-[6%] flex justify-start '>Created_at</div>
                    <div className='w-[4%] flex justify-start '></div>
                </div>
                <div className={`${loading && 'flex flex-col gap-2 full py-2'}`}>
                    {productsPage.map((data, index) => (
                        <div>
                            {loading ?
                                <div className="flex items-center space-x-4 gap-2">
                                    <Skeleton className="h-12 w-full rounded" />
                                   
                                </div>

                                : <div key={index} className='border-b border-white/15 p-2 flex items-center'>
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
                                    <div className='w-[12%]'>
                                        <Label className='font-thin'>{data.sales_count}</Label>
                                    </div>
                                    <div className='w-[6%]'>
                                        <Label className='font-thin'>{new Date(data.created_at).toLocaleDateString()}</Label>
                                    </div>
                                    <button className='cursor-pointer'><SlOptions /></button>

                                </div>}
                        </div>

                    ))}
                </div>
            </div>
            <div className='bg-red-400 items-end flex justify-start relative'>
                <Pagination className=' w-max right-10 absolute '>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className='cursor-pointer' onClick={() => {
                                if (currentPage > 1) {
                                    navigatePagination(currentPage - 1)
                                }

                            }} />
                        </PaginationItem>
                        {currentPage > 2 && <PaginationItem>
                            <PaginationEllipsis onClick={() => {
                                navigatePagination(1)
                            }} />
                        </PaginationItem>}
                        {pagintionDisplayWindow.map((data, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    className="cursor-pointer"
                                    onClick={() => navigatePagination(data)}
                                    isActive={currentPage === data}
                                >
                                    {data}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {currentPage < totalpages[totalpages.length - 2] && <PaginationItem>
                            <PaginationEllipsis onClick={() => {
                                navigatePagination(totalpages[totalpages.length - 1])
                            }} />
                        </PaginationItem>}
                        <PaginationItem>
                            <PaginationNext className='cursor-pointer' onClick={() => {
                                if (currentPage < totalpages[totalpages.length - 1]) {
                                    navigatePagination(currentPage + 1)
                                }

                            }} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </div>

    )
}

export default ProductsCard
