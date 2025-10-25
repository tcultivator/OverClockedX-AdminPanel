import React from 'react'

import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'

import { IoListOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import db from '@/lib/db'
import { ProductsType } from '@/types/ProductsType'

import ProductsCard from './components/ProductsCard'
import Search from './components/Search/Search';
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiStackLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator"
type Count = {
    total: number
}
const ProductList = async () => {
    const totalCountOfProducts = await db.query('SELECT COUNT(*) AS total FROM products')
    const totalCount = totalCountOfProducts[0] as Count[]

    const limit = 11
    const totalPages = Math.ceil(Number(totalCount[0].total) / limit);

    const [rows] = await db.query(`SELECT * FROM products LIMIT ${limit} OFFSET 0`)
    const products = rows as ProductsType[];
    const totalCountOfDeletedProducts = await db.query('SELECT COUNT(*) AS total FROM deleted_products')
    const totalCountDeleted = totalCountOfDeletedProducts[0] as Count[]
    return (
        <div className=' rounded bg-white shadow-xl w-full h-full border border-black/15'>
            <div className='border-b border-black/15 p-2 flex justify-between items-end'>
                <div className='flex gap-2 h-5 items-center'>
                    <div className='px-2'>
                        <div className='p-1 flex items-center gap-1'>
                            <div className='flex gap-1 items-center '>
                                <RiStackLine className='text-[12px] text-black/60' />
                                <Label className='text-[12px] text-black/60 '>Total Products</Label>
                            </div>

                            <Label className='text-[12px] text-black/60'>/ {totalCount[0].total}</Label>

                        </div>
                    </div>
                    <Separator orientation="vertical" className='text-red-400'/>
                    <div className='p-1 flex items-center gap-1'>
                        <div className='flex gap-1 items-center '>
                            <RiStackLine className='text-[12px] text-black/60' />
                            <Label className='text-[12px] text-black/60 '>Deleted Products</Label>
                        </div>

                        <Label className='text-[12px] text-black/60'>/ {totalCountDeleted[0].total}</Label>

                    </div>
                </div>
                <div className='flex gap-5 items-center w-[50%]'>
                    <Search />
                    <Button variant={'secondary'} className='border border-black/50 cursor-pointer'><IoIosNotificationsOutline /></Button>
                    <div className='flex items-center gap-2'>
                        <Label>View</Label>
                        <div className='flex gap-2 items-center'>
                            <Button variant={'secondary'} className='border border-black/50 cursor-pointer'><IoListOutline /></Button>
                            <Button variant={'secondary'} className='border border-black/50 cursor-pointer'><CiGrid41 /></Button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductsCard products={products}
                totalPages={totalPages}
            />

        </div>
    )
}

export default ProductList
