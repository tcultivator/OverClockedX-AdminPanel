"use client"
import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { NotificationType } from '@/types/NotificationType';
import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image';
import { MdCircle } from "react-icons/md";
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
    const delete_all_notification = useNotificationStore((state) => state.delete_all_notification)
    const mark_all_read = useNotificationStore((state) => state.mark_all_read)
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

            <div ref={dropdownRef} className={`bg-white pb-3 border border-black/15 shadow-2xl rounded-[15px] w-[500px]  absolute z-40 right-42 mt-1 ${display ? 'block' : 'hidden'}`}>
                <div className='w-full flex items-center justify-between p-2 border-b border-black/15 px-4'>
                    <Label>Notifications</Label>
                    <div className='flex items-center gap-1'>
                        <Button onClick={mark_all_read} className='text-[12px] w-[100px] p-0' variant={'outline'}>Read All</Button>
                        <Button onClick={delete_all_notification} className='text-[12px] w-[100px] p-0' variant={'outline'}>Delete All</Button>
                    </div>
                </div>
                <ScrollArea className='h-[44vh]'>
                    <div className='flex flex-col '>
                        {notificationDataStore.length > 0 ?
                            notificationDataStore.map((data, index) => (
                                <div key={index} className={`flex items-center  rounded border-b border-black/15 p-5 bg-white`}>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='flex items-center gap-1'>
                                                <Label className={ActionInNotification[data.action]}>{data.action}</Label>
                                                <Label className='text-[12px] text-black/50'>{new Date(data.created_at).toLocaleDateString('en-GB')}</Label>
                                            </div>
                                            {!data.isRead ? <MdCircle className='text-green-400 text-[12px]' /> : <Label className='text-[12px] text-black/50'>Read</Label>}
                                        </div>

                                        <div className='flex gap-2 justify-start items-start'>
                                            <Image src={data.product_image} alt='' width={200} height={200} className='w-[80px] p-1 rounded shadow-md' />
                                            <div className='flex flex-col gap-2'>
                                                <Label className='text-[14px]'>{data.product_name}</Label>
                                                <div className='flex items-center gap-2 w-full'>
                                                    <Button variant={'outline'} className='text-[12px] w-[120px] p-0' onClick={() => markAsRead(data.notif_id)}>Mark as read</Button>
                                                    <Button variant={'outline'} className='text-[12px] w-[120px] p-0' onClick={() => delete_notification(data.notif_id)}>Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <div className='flex justify-center items-center p-1 text-black/50 p-3'>
                                <Label>No Notifications</Label>
                            </div>


                        }
                    </div>
                </ScrollArea>

            </div>
        </div>
    )
}

export default Notification
