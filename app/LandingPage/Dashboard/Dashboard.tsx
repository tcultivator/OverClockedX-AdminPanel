import React from 'react'
import Total_products_card from './components/card/total_products_card'
import Total_orders_card from './components/card/total_orders_card'
import Revenue_charts from './components/revenue-charts/Revenue-Charts'
import Top_selling_products from './components/top-selling-products/top_selling_products'
import Low_Stocks_Alert from './components/lowStocksAlert/Low-Stocks-Alert'
import Popular_Product from './components/popular-product/Popular-Product'
const Dashboard = () => {
    return (
        <div className='w-full'>
            <div className='flex gap-2 w-full '>
                <div className='w-[65%] flex flex-col gap-2'>
                    <div className='flex gap-2 w-full'>
                        <Total_products_card />
                        <Total_orders_card />
                        <Total_products_card />
                        <Total_products_card />
                    </div>
                    <Revenue_charts />
                    <Top_selling_products />
                </div>
                <div className='flex flex-col gap-2 p-0 w-[35%]  '>
                    
                    <Popular_Product />
                    <Low_Stocks_Alert />
                    <Low_Stocks_Alert />
                </div>
            </div>


        </div>
    )
}

export default Dashboard
