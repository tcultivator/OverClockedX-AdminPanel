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
import ProductCardLayout from './productCardComponents/ProductCardLayout'
import { SortButton } from './sortByButtonComponents/SortButton'
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



//products store
import { useProductsStore } from '@/stores/productsStore'

type SortField = 'price' | 'stocks' | 'sales_count' | 'created_at'
type SortDirection = 'ASC' | 'DESC'

const ProductsCard = ({ products, totalPages }: Props) => {
    const productsData = useProductsStore((state) => state.productsData)
    const storeProductsData = useProductsStore((state) => state.storeProductsData)
    useEffect(() => {
        storeProductsData(products)
    },[])
    const [currentPage, setCurrentPage] = useState<number>(1)

    const loading = useLoading((state) => state.loading)

    const setLoading = useLoading((state) => state.setLoading)

    const [orderBy, setOrderBy] = useState<string>('')

    const [totalpages] = useState(() => {
        const arr: number[] = []
        for (let index = 1; index <= totalPages; index++) {
            arr.push(index)

        }
        return arr
    })
    const [pagintionDisplayWindow, setPaginationDisplayWindow] = useState(() => {
        return totalpages.slice(currentPage - 1, (currentPage - 1) + 3)
    })
    const navigatePagination = async (page: number) => {
        setLoading(true)
        const getProductsByPage = await fetch(`/api/productListPagination?page=${page}${orderBy}`, {
            method: 'GET'
        })
        const response = await getProductsByPage.json()
        console.log(response)

        storeProductsData(response) 
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
    const [sortField, setSortField] = useState<SortField>('created_at')
    const [sortDirection, setSortDirection] = useState<SortDirection>('ASC')
    const placeOrderBy = async (field: SortField) => {
        setLoading(true)


        const isSameField = sortField === field
        const newDirection: SortDirection = isSameField
            ? sortDirection === 'ASC' ? 'DESC' : 'ASC'
            : 'ASC'

        setSortField(field)
        setSortDirection(newDirection)

        const getProductsByPage = await fetch(`/api/productListPagination?page=${currentPage}&field=${field}&direction=${newDirection}`, {
            method: 'GET'
        })
        const response = await getProductsByPage.json()
        console.log('eto ung sorted',response)
        storeProductsData(response) 
        setOrderBy(`&field=${field}&direction=${newDirection}`)
        console.log('wht is this? ', pagintionDisplayWindow[pagintionDisplayWindow.length - 1])
        if (currentPage < totalpages[totalpages.length - 1] && currentPage != 1) {
            setPaginationDisplayWindow(() => {
                return totalpages.slice(currentPage - 2, (currentPage - 2) + 3)
            })
        }
        if (currentPage == 1) {
            setPaginationDisplayWindow(() => {
                return totalpages.slice(currentPage - 1, (currentPage - 1) + 3)
            })
        }
        if (currentPage == totalpages[totalpages.length - 1]) {
            setPaginationDisplayWindow(() => {
                return totalpages.slice(currentPage - 3, (currentPage - 3) + 3)
            })
        }
        setLoading(false)
    }

    return (
        <div className='flex flex-col h-[80vh] justify-between'>
            <div className=' px-2 max-h-[76vh] overflow-auto sticky'>
                <div className='flex items-center bg-neutral-800 rounded-t p-2 sticky top-0'>
                    <div className='w-[40%] flex justify-start '>Products</div>
                    <div className='w-[13%] flex justify-start gap-2 '>
                        <SortButton
                            label='Price'
                            active={sortField === 'price'}
                            direction={sortDirection}
                            onClick={() => placeOrderBy('price')} />

                    </div>

                    <div className='w-[13%] flex justify-start '>Status</div>

                    <div className='w-[12%] flex justify-start '>
                        <SortButton
                            label='Stocks'
                            active={sortField === 'stocks'}
                            direction={sortDirection}
                            onClick={() => placeOrderBy('stocks')} />
                    </div>
                    <div className='w-[10%] flex justify-start '>
                        <SortButton
                            label='Total Sales'
                            active={sortField === 'sales_count'}
                            direction={sortDirection}
                            onClick={() => placeOrderBy('sales_count')} />
                    </div>
                    <div className='w-[8%] flex justify-start '>
                        <SortButton
                            label='Created at'
                            active={sortField === 'created_at'}
                            direction={sortDirection}
                            onClick={() => placeOrderBy('created_at')} />
                    </div>
                    <div className='w-[4%] flex justify-start '></div>
                </div>
                <div className={`${loading && 'flex flex-col gap-2 full py-2'}`}>
                    {productsData.map((data, index) => (
                        <div key={index}>
                            {loading ?
                                <div className="flex items-center space-x-4 gap-2">
                                    <Skeleton className="h-12 w-full rounded" />

                                </div>

                                :
                                <ProductCardLayout key={index} data={data} />

                            }
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
