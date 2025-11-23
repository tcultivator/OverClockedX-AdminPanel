"use client"
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dropzone } from '@/components/upload/dropzone'
import { UploaderProvider, UploadFn } from '@/components/upload/uploader-provider'
import { useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore'

import { ProgressCircle } from '@/components/upload/progress-circle'
import { useProductsStore } from '@/stores/productsStore'

import { GoPlus } from "react-icons/go";

import { ProductsType } from '@/types/ProductsType'


const AddProducts = () => {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const [addedProducts, setAddedProducts] = useState({
    product_name: '',
    product_image: 'https://files.edgestore.dev/ntg08iryivwbq4r2/publicFiles/_public/799c96fb-ea95-45d5-b927-f045fc56ec4f.png',
    price: 0,
    category: '',
    brand: '',
    stocks: 0,
    description: ''
  })

  const addProductsToDatabase = useProductsStore((state) => state.addProductsToDatabase)
  const uploadFn: UploadFn = React.useCallback(

    async ({ file, onProgressChange, signal }) => {
      setLoading(true)
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange: (progress: number) => {
          setProgress(progress)
        },
      });
      
      setAddedProducts((prev) => ({ ...prev, product_image: res.url }))
      setLoading(false)
      setProgress(0)
      return res;
    },
    [edgestore],
  );
  return (
    <Dialog>
      <div>
        <DialogTrigger asChild className='w-full'>
          <Button className='cursor-pointer font-thin'><GoPlus />Add Products</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Add Products</DialogTitle>
            <DialogDescription>
              Add Products in store here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className='flex gap-1 justify-between'>
            <div className='flex flex-col gap-5 p-4 w-full'>
              <div className='flex flex-col gap-1'>
                <Select onValueChange={(value) => setAddedProducts({ ...addedProducts, category: value })}>
                  <Label>Product Category</Label>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Desktop">Desktop</SelectItem>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Pc Case">Pc Case</SelectItem>
                      <SelectItem value="CPU">CPU</SelectItem>
                      <SelectItem value="Motherboard">Motherboard</SelectItem>
                      <SelectItem value="Memory">Memory</SelectItem>
                      <SelectItem value="Storage">Storage</SelectItem>
                      <SelectItem value="GPU">GPU</SelectItem>
                      <SelectItem value="PowerSupply">PowerSupply</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Keyboard">Keyboard</SelectItem>
                      <SelectItem value="Mouse">Mouse</SelectItem>
                      <SelectItem value="Headphone">Headphone</SelectItem>
                      <SelectItem value="Microphone">Microphone</SelectItem>
                      <SelectItem value="Router">Router</SelectItem>
                      <SelectItem value="Switch">Switch</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Product Name</Label>
                <Input placeholder='Enter Product Name here...' onChange={(e) => setAddedProducts({ ...addedProducts, product_name: e.target.value })} />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Product Brand</Label>
                <Input placeholder='Enter Brand here...' onChange={(e) => setAddedProducts({ ...addedProducts, brand: e.target.value })} />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Product Price</Label>
                <Input type='number' placeholder='Enter Price here...' onChange={(e) => setAddedProducts({ ...addedProducts, price: Number(e.target.value) })} />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Product Stocks</Label>
                <Input type='number' placeholder='Enter Stocks here...' onChange={(e) => setAddedProducts({ ...addedProducts, stocks: Number(e.target.value) })} />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Product Description</Label>
                <Textarea placeholder='Enter Description here...' onChange={(e) => setAddedProducts({ ...addedProducts, description: e.target.value })} />
              </div>
            </div>
            <div className='flex flex-col gap-2 p-5 w-full border-l border-white/20'>
              <UploaderProvider uploadFn={uploadFn} autoUpload>
                <Dropzone
                  dropzoneOptions={{
                    maxFiles: 5,
                    maxSize: 1024 * 1024 * 4,
                    accept: {
                      'image/*': ['.jpeg', '.jpg', '.png'],
                    },
                  }}
                />

              </UploaderProvider>

              <div className='relative flex justify-center items-center aspect-square'>
                <Image src={addedProducts.product_image} alt='' width={2000} height={2000} className='w-full border border-black/15 shadow-md' />
                {loading && <div className="flex items-center space-x-4 p-4 absolute bg-black/50 top-0 left-0 w-full h-full justify-center">
                  <ProgressCircle progress={progress} />
                </div>}
              </div>

            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => {
                  console.log(addedProducts)
                  addProductsToDatabase(addedProducts)
                }}
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default AddProducts
