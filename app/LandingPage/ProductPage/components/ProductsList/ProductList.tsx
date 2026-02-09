
import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { IoListOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import db from '@/lib/db'
import ProductsCard from './components/ProductsCard'
import Search from './components/Search/Search';
import Notification from './components/notification/Notification';
import { NotificationType } from '@/types/NotificationType';
type Count = {
    total: number
}
const ProductList = async () => {
    //get total count of products
    const totalCountOfProducts = await db.query('SELECT COUNT(*) AS total FROM products')
    const totalCount = totalCountOfProducts[0] as Count[]

    const limit = 11
    const totalPages = Math.ceil(Number(totalCount[0].total) / limit);

    //i should add socket io to this so its realtime
    const notif = await db.query('SELECT * FROM notification ORDER by id DESC')
    const notificationData = notif[0] as NotificationType[]
    return (
        <div className='flex flex-col flex-1 rounded bg-white w-full border border-black/15 overflow-hidden'>
            <div className='border-b border-black/15 p-2 flex justify-end items-end'>
                
                <div className='flex gap-2 md:gap-5 items-center w-full md:w-[50%]'>
                    <Search />
                    <Notification notificationData={notificationData} />
                    <div className='hidden md:flex items-center gap-2'>
                        <Label>View</Label>
                        <div className='flex gap-2 items-center'>
                            <Button variant={'secondary'} className='border border-black/50 cursor-pointer'><IoListOutline /></Button>
                            <Button variant={'secondary'} className='border border-black/50 cursor-pointer'><CiGrid41 /></Button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductsCard
                totalPages={totalPages}
            />

        </div>
    )
}

export default ProductList
