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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ProductsType } from '@/types/ProductsType'
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'

import { useEdgeStore } from '@/lib/edgestore'
import { useProductsStore } from '@/stores/productsStore'
import { Loader2, Upload } from 'lucide-react'

type Props = {
    data: ProductsType
}

export const EditProduct = ({ data }: Props) => {
    const [currentData, setCurrentData] = useState<ProductsType>(data)
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState<number>(0)
    const [isUploading, setIsUploading] = useState(false)

    const UploadNewPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) return

        setIsUploading(true)
        try {
            const updateImagePreview = await edgestore.publicFiles.upload({
                file: uploadedFile,
                onProgressChange: (progress: number) => {
                    setProgress(progress)
                },
            })
            setCurrentData({ ...currentData, product_image: updateImagePreview.url })
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setIsUploading(false)
            setProgress(0)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>

                <div className='p-2 text-sm font-thin cursor-pointer rounded hover:bg-black/5'>
                    Edit Product
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg flex flex-col h-full p-0">
                <SheetHeader className="p-6 pb-2 text-left">
                    <SheetTitle>Edit Product</SheetTitle>
                    <SheetDescription>
                        Modify product details below. Changes are saved to the database.
                    </SheetDescription>
                </SheetHeader>


                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

                    <div className="space-y-3">

                        <div className="relative group aspect-square w-full max-w-[250px] mx-auto overflow-hidden rounded-lg border border-black/10 bg-gray-50">
                            <Image
                                src={currentData.product_image}
                                fill
                                alt="Product"
                                className="object-contain p-2"
                            />
                            {isUploading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                                    <Loader2 className="animate-spin mb-2" />
                                    <span className="text-xs font-bold">{progress}%</span>
                                </div>
                            )}
                        </div>


                        {isUploading && (
                            <div className='h-1.5 w-full bg-gray-100 rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-black transition-all duration-300'
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <Label
                                htmlFor="file-upload"
                                className="flex items-center justify-center gap-2 border border-dashed border-black/20 p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors text-sm"
                            >
                                <Upload size={16} />
                                {isUploading ? 'Uploading...' : 'Change Image'}
                            </Label>
                            <Input
                                id="file-upload"
                                type='file'
                                className="hidden"
                                accept="image/*"
                                onChange={UploadNewPic}
                                disabled={isUploading}
                            />
                        </div>
                    </div>


                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Product Name</Label>
                            <Input
                                id="edit-name"
                                value={currentData.product_name}
                                onChange={(e) => setCurrentData({ ...currentData, product_name: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-price">Price (PHP)</Label>
                            <Input
                                id="edit-price"
                                type='number'
                                value={currentData.price}
                                onChange={(e) => setCurrentData({ ...currentData, price: Number(e.target.value) })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-desc">Description</Label>
                            <Textarea
                                id="edit-desc"
                                className='min-h-[120px] resize-none'
                                value={currentData.description}
                                onChange={(e) => setCurrentData({ ...currentData, description: e.target.value })}
                            />
                        </div>
                    </div>
                </div>


                <SheetFooter className="p-6 border-t bg-gray-50 sm:flex-col gap-2">
                    <Button
                        className='w-full'
                        type="button"
                        disabled={isUploading}
                        onClick={() => {
                            useProductsStore.getState().updateProductsDetails(currentData)
                        }}
                    >
                        Save changes
                    </Button>
                    <SheetClose asChild>
                        <DropdownMenuItem className='w-full focus:bg-transparent'>
                            <Button className='w-full' variant="outline">
                                Cancel
                            </Button>
                        </DropdownMenuItem>

                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}