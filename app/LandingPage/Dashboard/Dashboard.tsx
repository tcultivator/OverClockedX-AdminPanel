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
        <div className="w-full">
            <div className="grid grid-cols-1 pb-[50px] md:pb-0 md:grid-cols-[65%_35%] gap-1  w-full h-full">
                {/* LEFT COLUMN */}
                <div className="grid grid-cols-1 gap-1 h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
                        <Total_products_card />
                        <Total_orders_card />
                    </div>
                    <Revenue_charts />
                    <Recent_Orders />
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-1 h-full">
                    {/* Popular Product */}
                    <div className="flex-1">
                        <Popular_Product />
                    </div>

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
