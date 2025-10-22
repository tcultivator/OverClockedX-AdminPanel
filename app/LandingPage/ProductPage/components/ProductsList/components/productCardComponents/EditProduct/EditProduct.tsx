"use client"
import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ProductsType } from '@/types/ProductsType'
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

import { useEdgeStore } from '@/lib/edgestore'
import { useProductsStore } from '@/stores/productsStore'
type Props = {
    data: ProductsType
}

export const EditProduct = ({ data }: Props) => {
    const [currentData, setCurrentData] = useState<ProductsType>(data)
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState<number>(0)

    const UploadNewPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        console.log(uploadedFile)
        if (!uploadedFile) return
        const updateImagePreview = await edgestore.publicFiles.upload({
            file: uploadedFile,
            onProgressChange: (progress: number) => {
                setProgress(progress)
            },
        })
        console.log('test')
        console.log(updateImagePreview)
        setCurrentData({ ...currentData, product_image: updateImagePreview.url })
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Label className='p-2 font-thin cursor-pointer rounded hover:bg-white/5'>Edit Product</Label>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Product</SheetTitle>
                    <SheetDescription>
                        Make changes in product here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Image src={currentData.product_image} width={500} height={500} alt=" " className="w-[70%] m-auto p-0" />
                        <div className='h-[6px] w-full border rounded overflow-hidden '>
                            <div className='h-full bg-white transition-all duration-200'
                                style={{
                                    width: `${progress}%`
                                }} />
                        </div>
                        <Input id="sheet-demo-name" type='file' onChange={(e) => UploadNewPic(e)} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Product Name</Label>
                        <Input id="sheet-demo-username" defaultValue={currentData.product_name} onChange={(e) => {
                            setCurrentData({ ...currentData, product_name: e.target.value })
                        }} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Price</Label>
                        <Input id="sheet-demo-username" type='number' defaultValue={currentData.price} onChange={(e) => {
                            setCurrentData({ ...currentData, price: Number(e.target.value) })
                        }} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Description</Label>
                        <Textarea className='max-h-[100px]' defaultValue={currentData.description} onChange={(e) => {
                            setCurrentData({ ...currentData, description: e.target.value })
                        }} />
                    </div>
                </div>
                <SheetFooter>
                    <DropdownMenuItem className='w-full focus:bg-transparent'>
                        <Button className='w-full' type="button" onClick={() => {
                            useProductsStore.getState().updateProductsDetails(currentData)
                        }}>Save changes</Button>
                    </DropdownMenuItem>

                    <SheetClose asChild>
                        <DropdownMenuItem className='w-full focus:bg-transparent'>
                            <Button className='w-full' variant="outline">Close</Button>
                        </DropdownMenuItem>

                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}


