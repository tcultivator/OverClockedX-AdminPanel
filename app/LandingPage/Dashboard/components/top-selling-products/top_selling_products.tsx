import React from 'react'
import db from '@/lib/db'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type topSellingProducts = {
  product_name: string;
  product_image: string;
  price: number;
  sales_count: number;
  created_at: Date
}
const top_selling_products = async () => {
  const [rows] = await db.query('SELECT products.product_name,products.product_image,products.price,products.sales_count,products.created_at FROM products WHERE YEAR(created_at) = 2025 AND sales_count > 0 ORDER BY sales_count DESC LIMIT 10')
  const topSellingProducts = rows as topSellingProducts[]
  console.log(topSellingProducts)
  return (
    <div className='w-[900px]'>
      <Card className="pt-0 gap-0">
        <CardHeader className="flex items-center  space-y-0 border-b py-5 sm:flex-row">
          <div className='flex items-center justify-between w-full'>
            <CardTitle className=''>Top Selling Products</CardTitle>
            <Select>
              <SelectTrigger
                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                aria-label="Select a range"
              >
                <SelectValue placeholder="2025" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </CardHeader>
        <CardContent className=" px-1 pb-0 mb-0 m-0 max-h-[50.5vh] overflow-y-auto">
          <div className='flex flex-col gap-1'>
            {topSellingProducts.map((data, index) => (
              <div key={index} className='p-2 flex justify-between w-full items-center border border-black/15 rounded'>

                <div className='flex items-center gap-1'>
                  <Image src={data.product_image} alt='' width={200} height={200} className='w-[60px] rounded shadow-md bg-white aspect-square' />
                  <div className='flex flex-col gap-1'>
                    <Label className='font-thin'>{data.product_name}</Label>
                    <Label className='font-thin'>{new Intl.NumberFormat('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    }).format(data.price)}</Label>
                  </div>
                </div>

                <div>
                  <Label className='font-thin'>{data.sales_count} sold</Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div >
  )
}

export default top_selling_products
