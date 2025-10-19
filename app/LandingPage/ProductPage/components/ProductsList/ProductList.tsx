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

const ProductList = async () => {
    const [rows] = await db.query('SELECT * FROM products LIMIT 20 OFFSET 0')
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
            <div className=' px-2 max-h-[76vh] overflow-auto sticky'>
                <div className='flex items-center bg-neutral-800 rounded-t p-2 sticky top-0'>
                    <div className='w-[40%] flex justify-start '>Products</div>
                    <div className='w-[13%] flex justify-start '>Price</div>
                    <div className='w-[13%] flex justify-start '>Status</div>
                    <div className='w-[12%] flex justify-start '>Stocks</div>
                    <div className='w-[12%] flex justify-start '>Total sales</div>
                    <div className='w-[6%] flex justify-start '>Created_at</div>
                    <div className='w-[4%] flex justify-start '></div>
                </div>
                <div className=''>
                    {products.map((data, index) => (
                        <div key={index} className='border-b border-white/15 p-2 flex items-center'>
                            <div className='flex gap-2 w-[40%]'>
                                <Image
                                    src={data.product_image}
                                    width={100}
                                    height={100}
                                    alt=''
                                    className='w-[50px] border border-white/10 rounded h-[50px]' />
                                <div className='flex flex-col justify-center'>
                                    <Label>{data.product_name}</Label>
                                    <Label className='font-thin text-[10px]'>{data.brand}</Label>
                                </div>

                            </div>
                            <div className='w-[13%]'>
                                <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(data.price)}</Label>
                            </div>
                            <div className='w-[13%]'>
                                <Label className={`${data.stocks > 0?'bg-green-600':'bg-red-600'} w-max px-2 py-1 rounded`}>{data.stocks > 0 ? 'Available' : 'Out of stock'}</Label>
                            </div>
                            <div className='w-[12%]'>
                                <Label className='font-thin'>{data.stocks}</Label>
                            </div>
                            <div className='w-[12%]'>
                                <Label className='font-thin'>{data.sales_count}</Label>
                            </div>
                            <div className='w-[6%]'>
                                <Label className='font-thin'>{data.created_at.toLocaleDateString()}</Label>
                            </div>
                            <button className='cursor-pointer'><SlOptions /></button>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProductList
