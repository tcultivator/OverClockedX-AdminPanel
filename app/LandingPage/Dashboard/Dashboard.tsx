import React from 'react'
import Total_products_card from './components/card/total_products_card'
import Total_orders_card from './components/card/total_orders_card'
import Revenue_charts from './components/revenue-charts/Revenue-Charts'
import Top_selling_products from './components/top-selling-products/top_selling_products'
const Dashboard = () => {
    return (
        <div className='w-full'>
            <div className='flex gap-2 w-full '>
                <div className='w-[70%] flex flex-col gap-2'>
                    <div className='flex gap-2 w-full'>
                        <Total_products_card />
                        <Total_orders_card />
                        <Total_products_card />
                        <Total_products_card />
                    </div>
                    <Revenue_charts />
                    <Top_selling_products />
                </div>
                <div className='flex gap-2 p-0 w-[30%] bg-white rounded-[15px] border border-black/15 shadow-sm'>
                    {/* <Top_selling_products /> */}
                </div>
            </div>


        </div>
    )
}

export default Dashboard
