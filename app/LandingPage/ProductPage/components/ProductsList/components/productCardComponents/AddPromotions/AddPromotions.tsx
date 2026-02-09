"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PuffLoader } from 'react-spinners'
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useProductsStore } from '@/stores/productsStore'
import { ProductPromotions } from "@/types/ProductsThatHasPromotionsType";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu"

type props = {
    product_id: string;
}

const AddPromotions = ({ product_id }: props) => {
    const [loading, setLoading] = useState(true)
    const [products_data, setProducts_data] = useState<ProductPromotions | null>(null)
    const AddingPromotion = useProductsStore((state) => state.AddingPromotion)
    const CancelPromotion = useProductsStore((state) => state.CancelPromotion)

    const [promotion_type, setPromotionType] = useState('')
    const [promotionValue, setPromotionValue] = useState<number>(0)
    const [promotionEndDate, setPromotionendDate] = useState('')
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const fetchProductsForAddingPromotionsFunc = async () => {
            try {
                const res = await fetch('/api/Promotions', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ product_id })
                })
                const result = await res.json()
                if (result.status !== 500) setProducts_data(result)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProductsForAddingPromotionsFunc()
    }, [product_id])

    useEffect(() => {
        if (!products_data?.end_date) return;
        const end = new Date(products_data.end_date).getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = end - now;
            if (distance <= 0) {
                setCountdown("Expired");
                clearInterval(timer);
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return () => clearInterval(timer);
    }, [products_data]);

    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, "0");
    const minDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='p-2 font-thin cursor-pointer rounded hover:bg-black/5 text-sm'>Add Promotions</div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
                <SheetHeader className="text-left">
                    <SheetTitle>Add Promotions</SheetTitle>
                    <SheetDescription>
                        Manage product promotions. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>

                <div className='flex-1 overflow-y-auto my-4 pr-1'>
                    {products_data && !loading ? (
                        <div className='flex flex-col gap-5'>

                            <div className="space-y-4 p-4 rounded-lg border bg-card shadow-sm">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Details</Label>
                                    <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 ${products_data.stocks > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {products_data.stocks > 0 ? <IoMdCheckmark className='text-xs' /> : <RxCross1 className='text-xs' />}
                                        <span className='text-[10px] font-bold uppercase'>{products_data.stocks > 0 ? 'In Stock' : 'Sold Out'}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                                        <Image
                                            src={products_data.product_image}
                                            fill
                                            alt=""
                                            className="rounded-md object-cover border"
                                        />
                                    </div>
                                    <div className='flex flex-col min-w-0'>
                                        <span className="text-[10px] text-muted-foreground uppercase">{products_data.brand}</span>
                                        <h3 className="text-sm font-semibold truncate leading-tight">{products_data.product_name}</h3>
                                        <span className="text-base font-bold text-primary mt-1">
                                            {new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(products_data.price)}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-3 border-y border-dashed">
                                    <div className="flex flex-col items-center justify-center border-r">
                                        <span className="text-[10px] text-muted-foreground uppercase">Sales</span>
                                        <span className="text-sm font-bold">{products_data.sales_count}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center border-r">
                                        <span className="text-[10px] text-muted-foreground uppercase">Stocks</span>
                                        <span className="text-sm font-bold">{products_data.stocks}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <ProgressCircle
                                            size={50}
                                            strokeWidth={4}
                                            progress={(products_data.stocks / products_data.base_stocks) * 100}
                                            className='text-black'
                                        />
                                        <span className="text-[9px] text-muted-foreground uppercase mt-1">Left</span>
                                    </div>
                                </div>
                            </div>


                            <div className="space-y-4 p-4 rounded-lg border bg-card shadow-sm">
                                <div className="flex justify-between items-center">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Promotion Settings</Label>
                                    {products_data.isActive && (
                                        <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1'>
                                            <IoMdCheckmark className='text-xs' />
                                            <span className='text-[10px] font-bold uppercase'>Active</span>
                                        </div>
                                    )}
                                </div>

                                {products_data.isActive ? (
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Type</Label>
                                            <Input disabled value={products_data.promotion_type} className="bg-muted" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Value</Label>
                                            <Input disabled value={`₱${products_data.value} OFF`} className="bg-muted" />
                                        </div>
                                        <div className="pt-2 border-t">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">Ends on:</span>
                                                <span className="font-medium">{new Date(products_data.end_date).toLocaleDateString("en-GB")}</span>
                                            </div>
                                            <div className="mt-1 text-center py-2 bg-green-50 rounded text-green-700 font-bold text-xs">
                                                {countdown !== "Expired" ? `⏳ ${countdown}` : "Expired"}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Select Type</Label>
                                            <Select onValueChange={setPromotionType}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='FlashSale'>Flash Sale</SelectItem>
                                                    <SelectItem value='Discounted Products'>Discounted Products</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">Discount Value (PHP)</Label>
                                            <Input
                                                type='number'
                                                placeholder="e.g. 50"
                                                onChange={(e) => setPromotionValue(Number(e.target.value))}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs text-muted-foreground">End Date & Time</Label>
                                            <Input
                                                value={promotionEndDate}
                                                min={minDateTime}
                                                type='datetime-local'
                                                onChange={(e) => setPromotionendDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-40 flex flex-col justify-center items-center gap-3">
                            <PuffLoader size={40} color="#000" />
                            <span className="text-xs text-muted-foreground">Loading product data...</span>
                        </div>
                    )}
                </div>

                <SheetFooter className="flex-col gap-2 pt-4 border-t sm:flex-col">
                    {products_data && products_data.isActive ? (
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => CancelPromotion({
                                product_image: products_data.product_image,
                                product_name: products_data.product_name,
                                product_id: product_id
                            })}
                        >
                            Cancel Promotion
                        </Button>
                    ) : (
                        <Button
                            className="w-full"
                            disabled={!promotion_type || promotionValue <= 0 || !promotionEndDate || loading}
                            onClick={() => AddingPromotion({
                                product_image: products_data?.product_image || '',
                                product_name: products_data?.product_name || '',
                                price: products_data?.price || 0,
                                product_id: product_id,
                                promotion_type: promotion_type,
                                promotionValue: promotionValue,
                                promotionEndDate: promotionEndDate
                            })}
                        >
                            Activate Promotion
                        </Button>
                    )}
                    <SheetClose asChild>
                        <DropdownMenuItem className='w-full focus:bg-transparent'>
                            <Button variant="outline" className="w-full">Close</Button>
                        </DropdownMenuItem>
                        
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default AddPromotions;