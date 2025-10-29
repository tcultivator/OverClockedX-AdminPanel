
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label'

import { useProductsStore } from "@/stores/productsStore"
import Image from "next/image"
type product_id = {
    product_id: string
    product_name: string
    product_image: string
}


export const RemoveProduct = ({ product_id, product_name, product_image }: product_id) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Label className='p-2 font-thin cursor-pointer rounded hover:bg-white/5'>Remove Product</Label>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 p-2 border border-white/10 rounded bg-white/10">
                        <Image src={product_image} width={100} height={100} alt=" " className="w-[50px]" />
                        <Label>{product_name}</Label>
                    </div>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete this
                        product and remove this data from our database.</AlertDialogDescription>

                </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="p-0">
                    <DropdownMenuItem className="w-full px-10 cursor-pointer">
                        Cancel
                    </DropdownMenuItem>
                </AlertDialogCancel>
                <AlertDialogAction className="p-0"
                    onClick={() => {
                        useProductsStore.getState().removeProduct(product_id)
                    }}>
                    <DropdownMenuItem className="w-full h-full   px-10 cursor-pointer focus:bg-transparent focus:text-white">
                        Continue
                    </DropdownMenuItem>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)


