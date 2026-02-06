import React from 'react'
import Total_products_card from './components/card/total_products_card'
import Total_orders_card from './components/card/total_orders_card'
import Revenue_charts from './components/revenue-charts/Revenue-Charts'
import Top_selling_products from './components/top-selling-products/top_selling_products'
import Low_Stocks_Alert from './components/lowStocksAlert/Low-Stocks-Alert'
import Popular_Product from './components/popular-product/Popular-Product'
import Recent_Orders from './components/recent-orders/Recent-Orders'
const Dashboard = () => {
    return (
        <div className="flex w-full h-screen p-1  flex-col">
            <div className="grid grid-cols-1 pb-[50px] md:pb-0 md:grid-cols-[2fr_1fr] gap-1 h-screen">
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-1 h-full">
                    <Revenue_charts />
                    
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-1 ">
                        <div className="flex-1">
                            <Popular_Product />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                            <Total_products_card />
                            <Total_orders_card />
                        </div>

                    </div>
                </div>
                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-1 h-full">
                    {/* Popular Product */}

                    {/* Top Selling Products */}
                    <div className="flex-1">
                        <Top_selling_products />
                    </div>

                    {/* Low Stocks Alert */}
                    <div className="flex-1">
                        <Low_Stocks_Alert />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Dashboard
