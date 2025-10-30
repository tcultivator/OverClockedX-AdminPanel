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

import { ScrollArea } from "@/components/ui/scroll-area"

//products store
import { useProductsStore } from '@/stores/productsStore'

type SortField = 'price' | 'stocks' | 'sales_count' | 'created_at'
type SortDirection = 'ASC' | 'DESC'
import { useSearchParams } from 'next/navigation'
import { usePaginationStore } from '@/stores/paginationPageStore'
const ProductsCard = ({ products, totalPages }: Props) => {
    const productsData = useProductsStore((state) => state.productsData)
    const storeProductsData = useProductsStore((state) => state.storeProductsData)
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || ''
    const type = searchParams.get('type') || ''

    const pagintionDisplayWindow = usePaginationStore((state) => state.pagintionDisplayWindow)
    const setTotalPage = usePaginationStore((state) => state.setTotalPage)
    const totalPage = usePaginationStore((state) => state.totalPage)
    const currentPage = usePaginationStore((state) => state.currentPage)
    const setCurrentPage = usePaginationStore((state) => state.setCurrentPage)
    useEffect(() => {
        storeProductsData(products)
        setTotalPage({ totalPage: totalPages, currentPage: currentPage })
    }, [])





    const loading = useLoading((state) => state.loading)

    const setLoading = useLoading((state) => state.setLoading)

    const [orderBy, setOrderBy] = useState<string>('')

    const [selectedCategory, setSelectedCategory] = useState('')

    const [noProductMessage, setNoProductMessage] = useState(false)

    //navigate through pagination
    const navigatePagination = async (page: number) => {
        setLoading(true)
        const getProductsByPage = await fetch(`/api/productListPagination?page=${page}${orderBy}${selectedCategory}`, {
            method: 'GET'
        })
        const response = await getProductsByPage.json()

        storeProductsData(response.result)
        setTotalPage({ totalPage: response.totalPages, currentPage: page })
        setCurrentPage(page)


        setLoading(false)


    }
    const [sortField, setSortField] = useState<SortField>('created_at')
    const [sortDirection, setSortDirection] = useState<SortDirection>('ASC')

    //select order by
    const placeOrderBy = async (field: SortField) => {
        setLoading(true)


        const isSameField = sortField === field
        const newDirection: SortDirection = isSameField
            ? sortDirection === 'ASC' ? 'DESC' : 'ASC'
            : 'ASC'

        setSortField(field)
        setSortDirection(newDirection)

        const getProductsByPage = await fetch(`/api/productListPagination?page=${currentPage}&field=${field}&direction=${newDirection}${selectedCategory}`, {
            method: 'GET'
        })
        const response = await getProductsByPage.json()


        storeProductsData(response.result)
        setTotalPage({ totalPage: response.totalPages, currentPage: currentPage })

        setOrderBy(`&field=${field}&direction=${newDirection}`)


        setLoading(false)
    }



    //select category filter
    useEffect(() => {
        if (category !== '') {
            console.log(type)
            console.log(category)
            const getCategoryFilter = async () => {
                setLoading(true)
                const getProductsByPage = await fetch(`/api/productListPagination?page=${currentPage}${orderBy}&category=${category}&type=${type}`, {
                    method: 'GET'
                })
                const response = await getProductsByPage.json()

                storeProductsData(response.result)
                setCurrentPage(response.currentPages || 1)
                setSelectedCategory(`&category=${category}&type=${type}`)
                setTotalPage({ totalPage: response.totalPages, currentPage: response.currentPages || 1 })

                if (response.totalPages == 0) {
                    setNoProductMessage(true)
                } else {
                    setNoProductMessage(false)
                }
                setLoading(false)


            }
            getCategoryFilter()
        }

    }, [searchParams])









    return (
        <div className='flex flex-col h-[82.5vh] justify-between'>
            <ScrollArea className="px-2 max-h-[78vh] overflow-auto sticky">

                <div className='flex items-center bg-[#F1F0EE] rounded-t p-2 sticky top-0 z-30 border-b border-black/15 text-black/70 text-[14px]'>
                    <div className='w-[10%] flex justify-start '>Id</div>
                    <div className='w-[33%] flex justify-start '>Products</div>
                    <div className='w-[10%] flex justify-start gap-2 '>
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
                <div className={`${loading && 'flex flex-col gap-2 py-2'}`}>
                    {productsData && productsData.length > 0 && (
                        productsData.map((data, index) => (
                            <div key={index}>
                                {loading ? (
                                    <div className="flex items-center space-x-4 gap-2">
                                        <Skeleton className="h-12 w-full rounded" />
                                    </div>
                                ) : (
                                    <ProductCardLayout key={index} data={data} />
                                )}
                            </div>
                        ))
                    )}
                    {noProductMessage &&
                        <div className=' p-10 flex justify-center items-center text-black/50'>
                            No Products Found
                        </div>
                    }
                </div>

            </ScrollArea>

            <div className='items-end flex justify-start relative font-thin text-black/70'>
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

                        {currentPage < totalPage[totalPage.length - 2] && <PaginationItem>
                            <PaginationEllipsis onClick={() => {
                                navigatePagination(totalPage[totalPage.length - 1])
                            }} />
                        </PaginationItem>}
                        <PaginationItem>
                            <PaginationNext className='cursor-pointer' onClick={() => {
                                if (currentPage < totalPage[totalPage.length - 1]) {
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
