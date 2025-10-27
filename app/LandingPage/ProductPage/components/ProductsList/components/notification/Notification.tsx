"use client"
import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { NotificationType } from '@/types/NotificationType';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlOptions } from "react-icons/sl";

import { useNotificationStore } from '@/stores/notificationStore';
import { ActionInNotification } from '@/utils/ActionInNotificationClass';
type Props = {
    notificationData: NotificationType[]
}
const Notification = ({ notificationData }: Props) => {
    const [display, setDisplay] = useState(false)
    const notificationDataStore = useNotificationStore((state) => state.notificationDataStore)
    const setNotificationData = useNotificationStore((state) => state.setNotificationData)
    const markAsRead = useNotificationStore((state) => state.markAsRead)
    const delete_notification = useNotificationStore((state) => state.delete_notification)
    useEffect(() => {
        setNotificationData(notificationData)
    }, [])
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (!dropdownRef.current) return;

            if (dropdownRef.current.contains(target)) return;

            if (document.querySelector("[data-radix-popper-content-wrapper]")?.contains(target)) {
                return;
            }
           

            setDisplay(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className='relative'>
                <Button id='open-btn' onClick={() => setDisplay(prev => !prev)} variant={'secondary'} className='border border-black/50 cursor-pointer'><IoIosNotificationsOutline /></Button>
                <Label className='absolute top-[-5px] right-[-5px] bg-primary text-white rounded px-1 aspect-square w-max text-[10px]'>{notificationDataStore.length}</Label>
            </div>

            <div ref={dropdownRef} className={`bg-white border border-black/15 shadow-2xl rounded w-[500px] max-h-[50vh] absolute z-40 right-42 mt-1 ${display ? 'block' : 'hidden'}`}>
                <div className='sticky flex items-center text-black/75 p-1 border-b border-black/15'>
                    <Label className='w-[50%]'>Products</Label>
                    <Label className='w-[25%]'>Action</Label>
                    <Label className='w-[15%]'>Date</Label>
                    <Label className='w-[10%]'>Menu</Label>
                </div>
                <div className='p-1 flex flex-col gap-1'>
                    {notificationDataStore.length > 0 ?
                        notificationDataStore.map((data, index) => (
                            <div key={index} className={`flex items-center border border-black/15 rounded shadow-xl p-2 ${data.isRead ? 'bg-white' : 'bg-primary/20'}`}>
                                <div className='flex gap-1 w-[50%]'>
                                    <Image src={data.product_image} alt='' width={200} height={200} className='w-[40px]' />
                                    <Label className='text-[12px]'>{data.product_name}</Label>
                                </div>
                                <div className='w-[25%]'>
                                    <Label className={ActionInNotification[data.action]}>{data.action}</Label>
                                </div>

                                <Label className='font-thin w-[15%] text-[12px]'>{new Date(data.created_at).toLocaleDateString('en-GB')}</Label>
                                <div className='w-[10%] flex items-center gap-1 '>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <SlOptions className='font-thin text-black/70' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => markAsRead(data.notif_id)}>Mark as read</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => delete_notification(data.notif_id)}>delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        )) :
                        <div className='flex justify-center items-center p-1 text-black/50'>
                            <Label>No Notifications</Label>
                        </div>


                    }
                </div>
            </div>
        </div>
    )
}

export default Notification
