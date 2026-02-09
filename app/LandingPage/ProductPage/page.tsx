export const dynamic = "force-dynamic";
import React from 'react'
import Header from './components/Header/Header'
import ProductList from './components/ProductsList/ProductList'
import { Suspense } from 'react'
import { Label } from '@/components/ui/label';
import { Skeleton } from "@/components/ui/skeleton"
const ProductPage = () => {
    return (
        <div className='flex w-full h-[100dvh] md:h-screen p-1  flex-col gap-1 overflow-hidden pb-[52px] md:pb-1'>
            <Suspense fallback={
                <>
                    <div className="w-full h-full">
                        <div className="flex flex-col gap-1 h-[98vh]">
                            <Skeleton className="h-[10%] w-full p-1 shadow-sm bg-white/60 rounded" />    
                            <Skeleton className="h-[90%] w-full p-1 shadow-sm bg-white/60 rounded" />
                        </div>
                    </div>
                </>}>
                <Header />
                <div className=' flex-1 w-full flex overflow-hidden'>
                    <ProductList />

                </div>
            </Suspense>

        </div>
    )
}

export default ProductPage
