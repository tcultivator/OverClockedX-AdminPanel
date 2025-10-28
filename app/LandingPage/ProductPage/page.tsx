export const dynamic = "force-dynamic";
import React from 'react'
import Header from './components/Header/Header'
import ProductList from './components/ProductsList/ProductList'
import { Suspense } from 'react'
const ProductPage = () => {
    return (
        <div className='flex w-full flex-col gap-2'>
            <Suspense fallback={<>waiting...</>}>
                <Header />
                <div className='flex gap-2 w-full'>
                    <ProductList />

                </div>
            </Suspense>

        </div>
    )
}

export default ProductPage
