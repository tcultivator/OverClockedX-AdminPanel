
import React from 'react'
import Order_list from './components/Orders-list/Order-list'
//card
import Total_Orders from './components/Orders-list/components/card/Total-Orders/Total-Orders'
import Pending_Orders from './components/Orders-list/components/card/Pending-Orders/Pending-Orders'
import Preparing_Orders from './components/Orders-list/components/card/Preparing-Orders/Preparing-Orders'
import On_Delivery_Orders from './components/Orders-list/components/card/On-Delivery-Orders/On-Delivery-Orders'
import Canceled_Orders from './components/Orders-list/components/card/Canceled-Orders/Canceled-Orders'
import Completed_Orders from './components/Orders-list/components/card/Completed-Orders/Completed-Orders'
const OrdersPage = () => {
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
                <Total_Orders />
                <Pending_Orders />
                <Preparing_Orders />
                <On_Delivery_Orders />
                <Canceled_Orders />
                <Completed_Orders />
            </div>
            <Order_list />
        </div>
    )
}

export default OrdersPage
