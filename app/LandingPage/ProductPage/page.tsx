export const dynamic = "force-dynamic";
import React from 'react'
import Header from './components/Header/Header'
import ProductList from './components/ProductsList/ProductList'
import { Suspense } from 'react'
import { Label } from '@/components/ui/label';
import { Skeleton } from "@/components/ui/skeleton"
const ProductPage = () => {
    return (
        <div className='flex w-full flex-col gap-2'>
            <Suspense fallback={
                <>
                    <div className="w-full h-full">
                        <div className="flex flex-col gap-2 h-[98vh]">
                            <Skeleton className="h-[10%] w-full p-1 shadow-sm bg-white/60 rounded-[15px]" />    
                            <Skeleton className="h-[90%] w-full p-1 shadow-sm bg-white/60 rounded-[15px]" />
                        </div>
                    </div>
                </>}>
                <Header />
                <div className='flex gap-2 w-full'>
                    <ProductList />

                </div>
            </Suspense>

        </div>
    )
}

export default ProductPage
