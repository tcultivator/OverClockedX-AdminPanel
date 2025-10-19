import React from 'react'
import Header from './components/Header/Header'
import ProductList from './components/ProductsList/ProductList'

const ProductPage = () => {
    return (
        <div className='flex w-full flex-col gap-2'>
            <Header />
            <div className='flex gap-2 w-full h-full'>
                <ProductList />
                
            </div>
        </div>
    )
}

export default ProductPage
