import React from 'react'

import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'

import { IoListOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import db from '@/lib/db'
import { ProductsType } from '@/types/ProductsType'

import ProductsCard from './components/ProductsCard'
import Search from './components/Search/Search';
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
    return (
        <div className=' rounded bg-[#171717] w-full h-full border border-white/15'>
            <div className='border-b border-white/15 p-2 flex justify-end items-center'>

                <div className='flex gap-5 items-center w-[50%]'>
                    <Search />
                    <div className='flex items-center gap-2'>
                        <Label>View</Label>
                        <div className='flex gap-2 items-center'>
                            <Button><IoListOutline /></Button>
                            <Button><CiGrid41 /></Button>
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
