"use client"
import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useLoading } from '@/stores/loadingStore'
import { ClipLoader } from 'react-spinners'
import { useOrderStore } from '@/stores/ordersStore'
import { OrderActionsErrorHandling } from '@/utils/ErrorHandling/OrderActionsErrorHandling'
import { useState } from 'react'
type props = {
    order_id: number;
    email: string;
    reference_id: string;
    created_at: string;
    total_amount: number;
}
type ErrorHandlerValue = {
    type: "success" | "error" | "default" | "warning";
    message: string;
};
const Decline_Order = ({ order_id, email, reference_id, created_at, total_amount }: props) => {
    const [open, setOpen] = useState(false);
    const buttonLoading = useLoading((state) => state.buttonLoading)
    const declineOrder = useOrderStore((state) => state.declineOrder)
    const [DeclineOrderErrorHandling, setDeclineOrderErrorHandling] = useState<ErrorHandlerValue>({
        type: "default",
        message: "",
    })
    const DeclineOrderFunc = async (order_id: number) => {
        setOpen(true)
        const declineOrderResult = await declineOrder(order_id, email, reference_id, created_at, total_amount)
        console.log('this is the result in declining the order', declineOrderResult)
        setDeclineOrderErrorHandling(declineOrderResult)
        setTimeout(() => {
            setOpen(false)
        }, 3500)
    }
    const OrderActionsErrorHandlingResult = OrderActionsErrorHandling[DeclineOrderErrorHandling.type] ?? OrderActionsErrorHandling.default
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className='w-full text-start flex justify-start items-center p-2 font-regular cursor-pointer' variant='ghost'>Decline Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[50vh]'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once you confirm, the order will be marked as declined. You wont be able to undo this action.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <OrderActionsErrorHandlingResult message={DeclineOrderErrorHandling.message} />
                <AlertDialogFooter className='flex items-center'>
                    <DropdownMenuItem>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </DropdownMenuItem>

                    <Button disabled={buttonLoading} className='cursor-pointer' onClick={() => DeclineOrderFunc(order_id)}>{buttonLoading ? (
                        <>
                            <ClipLoader size={16} color="#fff" /> Please wait...
                        </>
                    ) : (
                        'Decline Order'
                    )}</Button>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Decline_Order
