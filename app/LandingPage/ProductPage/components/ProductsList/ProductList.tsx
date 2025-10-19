import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GoSearch } from "react-icons/go";
import { IoListOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import db from '@/lib/db'
import { ProductsType } from '@/types/ProductsType'
import Image from 'next/image'
import { SlOptions } from "react-icons/sl";
import ProductsCard from './components/ProductsCard'
type Count = {
    total: Number
}
const ProductList = async () => {
    const totalCountOfProducts = await db.query('SELECT COUNT(*) AS total FROM products')
    const totalCount = totalCountOfProducts[0] as Count[]
    const limit = 2
    const totalPages = Math.ceil(Number(totalCount[0].total) / limit);
    const [rows] = await db.query('SELECT * FROM products LIMIT 2 OFFSET 0')
    const products = rows as ProductsType[];
    return (
        <div className=' rounded bg-[#171717] w-full h-full border border-white/15'>
            <div className='border-b border-white/15 p-2 flex justify-between items-center'>
                <div className='flex gap-2'>
                    <div className='flex gap-1 items-center'>
                        <Select>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Order by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Order by</SelectLabel>
                                    <SelectItem value="highStocks">High Stocks</SelectItem>
                                    <SelectItem value="lowStocks">Low Stocks</SelectItem>
                                    <SelectItem value="bestSelling">Best Selling</SelectItem>
                                    <SelectItem value="leastSelling">Least Selling</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex gap-5 items-center'>
                    <div className='flex gap-1 items-center'>
                        <Input type="email" placeholder="Email" />
                        <Button><GoSearch /></Button>
                    </div>
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
                totalPages={totalPages} />

        </div>
    )
}

export default ProductList
