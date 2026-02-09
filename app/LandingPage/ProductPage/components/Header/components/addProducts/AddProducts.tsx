"use client"
import React, { useState, useCallback } from 'react'
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
import { useEdgeStore } from '@/lib/edgestore'
import { ProgressCircle } from '@/components/upload/progress-circle'
import { useProductsStore } from '@/stores/productsStore'
import { GoPlus } from "react-icons/go";
import { LucideSettings2, LucideScanBarcode } from "lucide-react"; // Added icons for the toggle
import BarCodeScanner from './BarCodeScanner/BarCodeScanner'

const AddProducts = () => {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [useBarCode, setUseBarCode] = useState(true)

  const [addedProducts, setAddedProducts] = useState({
    product_id: '',
    product_name: '',
    product_image: 'https://www.mentainstruments.com/wp-content/uploads/2022/09/Getimage.png',
    price: 0,
    category: '',
    brand: '',
    stocks: 0,
    description: ''
  })

  const addProductsToDatabase = useProductsStore((state) => state.addProductsToDatabase)

  const uploadFn: UploadFn = useCallback(
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
      <DialogTrigger asChild>
        <Button className='cursor-pointer font-thin'><GoPlus />Add Products</Button>
      </DialogTrigger>


      <DialogContent className="w-full sm:max-w-[850px] h-full sm:max-h-[95vh] sm:h-max overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-xl">Add Products</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new product to your inventory.
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-auto gap-2"
              onClick={() => setUseBarCode(prev => !prev)}
            >
              {useBarCode ? <LucideSettings2 size={16} /> : <LucideScanBarcode size={16} />}
              {useBarCode ? 'Switch to Manual' : 'Switch to Scan'}
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable area for the body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {useBarCode ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <BarCodeScanner setAddedProducts={setAddedProducts} setUseBarCode={setUseBarCode} />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8">
              {/* Form Section */}
              <div className="flex-1 space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="category">Product Category</Label>
                  <Select
                    value={addedProducts.category || ''}
                    onValueChange={(value) => setAddedProducts({ ...addedProducts, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {[
                          "Desktop", "Laptop", "Pc Case", "CPU", "Motherboard", "Memory",
                          "Storage", "GPU", "PowerSupply", "Monitor", "Keyboard",
                          "Mouse", "Headphone", "Microphone", "Router", "Switch"
                        ].map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="barcode">UPC - BarCode</Label>
                  <Input
                    id="barcode"
                    placeholder='Enter BarCode...'
                    value={addedProducts.product_id || ''}
                    onChange={(e) => setAddedProducts({ ...addedProducts, product_id: e.target.value })}
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="pname">Product Name</Label>
                  <Input
                    id="pname"
                    placeholder='Enter Product Name...'
                    value={addedProducts.product_name || ''}
                    onChange={(e) => setAddedProducts({ ...addedProducts, product_name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder='Brand...'
                      value={addedProducts.brand || ''}
                      onChange={(e) => setAddedProducts({ ...addedProducts, brand: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type='number'
                      placeholder='0.00'
                      value={addedProducts.price || ''}
                      onChange={(e) => setAddedProducts({ ...addedProducts, price: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="stocks">Initial Stocks</Label>
                  <Input
                    id="stocks"
                    type='number'
                    placeholder='0'
                    value={addedProducts.stocks || ''}
                    onChange={(e) => setAddedProducts({ ...addedProducts, stocks: Number(e.target.value) })}
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    placeholder='Details about the product...'
                    value={addedProducts.description}
                    onChange={(e) => setAddedProducts({ ...addedProducts, description: e.target.value })}
                    className='min-h-[100px] resize-none'
                  />
                </div>
              </div>

              {/* Upload Section */}
              <div className="flex-1 space-y-4">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed rounded-lg p-1">
                  <UploaderProvider uploadFn={uploadFn} autoUpload>
                    <Dropzone
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 4,
                        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
                      }}
                    />
                  </UploaderProvider>
                </div>

                <div className='relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden border border-black/5'>
                  <Image
                    src={addedProducts.product_image}
                    alt='Preview'
                    fill
                    className='object-contain p-2'
                  />
                  {loading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                      <ProgressCircle progress={progress} size={60} />
                      <span className="text-xs font-medium mt-2">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 md:p-6 border-t bg-gray-50/50 flex-row gap-2">
          <DialogClose asChild>
            <Button variant="ghost" className="flex-1 md:flex-none">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            className="flex-1 md:flex-none px-8"
            disabled={
              useBarCode ||
              addedProducts.product_id === '' ||
              addedProducts.price === 0 ||
              addedProducts.category === '' ||
              addedProducts.description === '' ||
              addedProducts.product_name === '' ||
              loading
            }
            onClick={() => {
              addProductsToDatabase(addedProducts)
            }}
          >
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddProducts;