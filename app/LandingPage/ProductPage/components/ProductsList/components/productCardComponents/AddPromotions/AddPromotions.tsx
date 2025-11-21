"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { ProductPromotions } from "@/types/ProductsThatHasPromotionsType";
import { ProgressCircle } from '@/components/upload/progress-circle'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'

import { PuffLoader } from 'react-spinners'
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useLoading } from '@/stores/loadingStore'
type props = {
    product_id: string;
}
const AddPromotions = ({ product_id }: props) => {
    const [loading, setLoading] = useState(true)
    const [products_data, setProducts_data] = useState<ProductPromotions | null>(null)

    // fetching products + Join data of promotion if have
    useEffect(() => {
        const fetchProductsForAddingPromotionsFunc = async () => {
            const fetchProductsForAddingPromotions = await fetch('/api/Promotions', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product_id: product_id })
            })
            const fetchProductsForAddingPromotionsResult = await fetchProductsForAddingPromotions.json()
            if (fetchProductsForAddingPromotionsResult.status == 500) {
                //handle error in this bracket
                setLoading(false)
                return
            }
            setProducts_data(fetchProductsForAddingPromotionsResult)
            setLoading(false)
        }
        fetchProductsForAddingPromotionsFunc()
    }, [])


    // countdown for end date of promotion
    const [countdown, setCountdown] = useState("");

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


    // cancel the promotion

    const CancelPromotion = async () => {
        useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Removing Promotion...' })
        const cancelPromotion = await fetch('/api/Promotions/CancelPromotions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ product_id: product_id })
        })
        const cancelPromotionResult = await cancelPromotion.json()
        if (cancelPromotionResult.status == 500) {
            // handle error
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Removing Promotion' })
            return
        }

        useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Removing Promotion' })

    }


    //adding promotion
    const [promotion_type, setPromotionType] = useState('')
    const [promotionValue, setPromotionValue] = useState<number>(0)
    const [promotionEndDate, setPromotionendDate] = useState('')

    const now = new Date();
    const pad = (num: number) => num.toString().padStart(2, "0");

    const minDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
        now.getDate()
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;


    const AddingPromotion = async () => {
        const selected = new Date(promotionEndDate);
        const now = new Date();
        if (selected <= now) {
            return alert("Date and time must be in the future!");
        }
        useLoading.getState().setActionLoadingState({ display: true, status: 'loading', loadingMessage: 'Adding Promotion...' })
        const addingPromotion = await fetch('/api/Promotions/AddPromotions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                product_id: product_id,
                promotion_type: promotion_type,
                promotionValue: promotionValue,
                promotionEndDate: promotionEndDate.replace("T", ":") + ":00"
            })
        })

        const addingPromotionResult = await addingPromotion.json()
        if (addingPromotionResult.status == 500) {
            //handle error
            useLoading.getState().setActionLoadingState({ display: true, status: 'error', loadingMessage: 'Error Adding Promotion' })
            return
        }
        useLoading.getState().setActionLoadingState({ display: true, status: 'success', loadingMessage: 'Success Adding Promotion' })



    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Label className='p-2 font-thin cursor-pointer rounded hover:bg-white/5'>Add Promotions</Label>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Promotions</SheetTitle>
                    <SheetDescription>
                        Make changes in product promotions here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className='px-4 w-full h-full'>


                    {products_data && !loading ? (

                        <div className='flex flex-col gap-3'>

                            {/* PRODUCT INFORMATION SECTION */}

                            <div className="space-y-1 p-2 py-4 rounded border shadow-md">
                                <div className="flex justify-between items-center">
                                    <Label className="text-sm text-black/50">Product Information</Label>
                                    <div className={`${products_data.stocks > 0 ? 'bg-[#C5FFC8] text-green-800 ' : 'bg-[#FFD5D8] text-red-500 '} w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]`}>
                                        {products_data.stocks > 0 ? <IoMdCheckmark className='text-[12px]' /> : <RxCross1 className='text-[12px]' />}
                                        <Label className='text-[11px] flex items-center justify-center'>{products_data.stocks > 0 ? 'Available' : 'Out of stock'}</Label>
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <Image
                                        src={products_data.product_image}
                                        width={300}
                                        height={300}
                                        alt=""
                                        className="rounded-lg r w-[30%] object-cover" />
                                    <div className='flex flex-col items-start w-[70%]'>
                                        <Label className="text-xs text-black/50">{products_data.brand}</Label>
                                        <Label className="text-sm font-medium">{products_data.product_name}</Label>
                                        <Label className="text-sm font-medium">{new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", }).format(products_data.price)}</Label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between px-8 py-3  border-y border-black/10">

                                    <div className="flex flex-col justify-center items-center">
                                        <Label className="text-xs text-black/50">Total Sales</Label>
                                        <Label className="text-sm font-semibold">
                                            {products_data.sales_count}
                                        </Label>
                                    </div>

                                    <div className="flex flex-col justify-center items-center">
                                        <Label className="text-xs text-black/50">Stocks</Label>
                                        <Label className="text-sm font-semibold">
                                            {products_data.stocks}
                                        </Label>
                                    </div>

                                    <div className="flex flex-col justify-center items-center">
                                        <ProgressCircle
                                            size={55}
                                            strokeWidth={5}
                                            progress={Math.round(products_data.stocks / products_data.base_stocks * 100)}
                                            className="text-black/40"
                                        />
                                        <Label className="text-[11px] text-black/50 mt-1 tracking-wide">
                                            Remaining
                                        </Label>
                                    </div>
                                </div>

                                {/* PROMOTION SECTION */}
                            </div>
                            {products_data.isActive ? (
                                <div className="space-y-1 p-2 py-4 rounded border shadow-md flex flex-col gap-3">


                                    <div className="flex justify-between items-center">
                                        <Label className="text-sm text-black/50">Promotion Information</Label>
                                        <div className='bg-[#C5FFC8] text-green-800 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]'>
                                            <IoMdCheckmark className='text-[12px]' />
                                            <Label className='text-[11px] flex items-center justify-center'>Active</Label>
                                        </div>
                                    </div>


                                    <div className="flex flex-col">
                                        <Label className="text-xs text-black/50">Promotion Type</Label>
                                        <Select defaultValue={products_data.promotion_type}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Promotion Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Promotion Type</SelectLabel>
                                                    <SelectItem value={products_data.promotion_type}>{products_data.promotion_type}</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* VALUE */}
                                    <div className="flex flex-col">
                                        <Label className="text-xs text-black/50">Promotion Value</Label>
                                        <Input disabled defaultValue={new Intl.NumberFormat("en-PH", {
                                            style: "currency",
                                            currency: "PHP",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        }).format(Number(products_data.value))} />
                                    </div>

                                    {/* END DATE */}
                                    <div className="flex justify-between items-end">
                                        <div className='flex flex-col gap-1'>
                                            <Label className="text-xs text-black/50">End Date</Label>
                                            <Label className="text-sm px-2">
                                                {new Date(products_data.end_date).toLocaleDateString("en-GB")}
                                            </Label>
                                        </div>


                                        <Label className="text-sm mt-1 text-green-400  px-2">
                                            {countdown !== "Expired" ? `Ends in: ${countdown}` : "Promotion expired"}
                                        </Label>
                                    </div>

                                </div>
                            ) : (
                                <div className="space-y-1 p-2 py-4 rounded border shadow-md flex flex-col gap-3">


                                    <div className="flex justify-between items-center">
                                        <Label className="text-sm text-black/50">Promotion Information</Label>
                                        <div className='bg-[#FFD5D8] text-red-500 w-max  rounded-[10px]  flex justify-center items-center px-4 py-[4px]'>
                                            <RxCross1 className='text-[12px]' />
                                            <Label className='text-[11px] flex items-center justify-center'>Not Active</Label>
                                        </div>
                                    </div>


                                    <div className="flex flex-col">
                                        <Label className="text-xs text-black/50">Promotion Type</Label>
                                        <Select onValueChange={(value) => setPromotionType(value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Promotion Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Promotion Type</SelectLabel>
                                                    <SelectItem value='FlashSale'>Flash Sale</SelectItem>
                                                    <SelectItem value='Discounted Products'>Discounted Products</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* VALUE */}
                                    <div className="flex flex-col">
                                        <Label className="text-xs text-black/50">Promotion Value</Label>
                                        <Input type='number' onChange={(e) => setPromotionValue(Number(e.target.value))} />
                                    </div>

                                    {/* END DATE */}
                                    <div className="flex justify-between items-end">
                                        <div className='flex flex-col gap-1 w-full'>
                                            <Label className="text-xs text-black/50">End Date</Label>
                                            <Input
                                                value={promotionEndDate}
                                                min={minDateTime}
                                                type='datetime-local'
                                                className='w-full '
                                                onChange={(e) => setPromotionendDate(e.target.value)} />
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>

                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <PuffLoader />
                        </div>
                    )}
                </div>

                <SheetFooter>
                    <DropdownMenuItem className='w-full focus:bg-transparent'>
                        {
                            products_data && products_data.isActive ?
                                <Button onClick={CancelPromotion} className='w-full' type="button" >Cancel Promotion</Button> :
                                <Button disabled={
                                    promotion_type == '' || promotionValue == 0 || promotionEndDate == ''
                                } onClick={AddingPromotion} className='w-full' type="button" >Add Promotion</Button>
                        }

                    </DropdownMenuItem>

                    <SheetClose asChild>
                        <DropdownMenuItem className='w-full focus:bg-transparent'>
                            <Button className='w-full' variant="outline">Close</Button>
                        </DropdownMenuItem>

                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    )
}

export default AddPromotions
