"use client"
import React from 'react'
import { DotLoader } from 'react-spinners'
import { Label } from '@radix-ui/react-label'
import { useLoading } from '@/stores/loadingStore'
const ActionLoading = () => {
    const actionLoading = useLoading((state) => state.actionLoading)
    return (
        <>
            {actionLoading.display && <div className='absolute w-full h-full bg-black/40 flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center gap-5'>
                    <DotLoader speedMultiplier={3} color='white' />
                    <Label>{actionLoading.loadingMessage}</Label>
                </div>

            </div>}
        </>

    )
}

export default ActionLoading
