"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';

// Icons
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdCircle, MdDeleteOutline, MdCheck, MdMarkEmailRead } from "react-icons/md";
import { BiTrash } from "react-icons/bi";

// UI Components
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types & Stores
import { NotificationType } from '@/types/NotificationType';
import { useNotificationStore } from '@/stores/notificationStore';
import { ActionInNotification } from '@/utils/ActionInNotificationClass';

type Props = {
    notificationData: NotificationType[]
}

const Notification = ({ notificationData }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const notificationDataStore = useNotificationStore((state) => state.notificationDataStore)
    const setNotificationData = useNotificationStore((state) => state.setNotificationData)
    const markAsRead = useNotificationStore((state) => state.markAsRead)
    const delete_notification = useNotificationStore((state) => state.delete_notification)
    const delete_all_notification = useNotificationStore((state) => state.delete_all_notification)
    const mark_all_read = useNotificationStore((state) => state.mark_all_read)

    useEffect(() => {
        setNotificationData(notificationData)
    }, [notificationData, setNotificationData])

    const unreadCount = notificationDataStore.filter((item) => !item.isRead).length;

    const NotificationList = ({ data }: { data: NotificationType[] }) => (
        <div className='flex flex-col'>
            {data.length > 0 ? (
                data.map((item) => (
                    <div 
                        key={item.notif_id} 
                        className={`group flex gap-3 p-3 border-b border-gray-100 transition-all hover:bg-gray-50 relative ${!item.isRead ? 'bg-blue-50/40' : 'bg-white'}`}
                    >
                        {!item.isRead && (
                            <MdCircle className='absolute top-3 right-3 text-blue-500 text-[8px]' />
                        )}

                        <div className="flex-shrink-0 pt-1">
                            <Image 
                                src={item.product_image} 
                                alt={item.product_name} 
                                width={48} 
                                height={48} 
                                className='h-12 w-12 object-cover rounded-md border border-gray-200 bg-white' 
                            />
                        </div>

                        <div className='flex flex-col gap-1 w-full min-w-0'> 
                            <div className='flex items-center justify-between gap-2'>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border border-gray-200 truncate ${ActionInNotification[item.action]}`}>
                                    {item.action}
                                </span>
                                <span className='text-[10px] text-gray-400 whitespace-nowrap'>
                                    {new Date(item.created_at).toLocaleDateString('en-GB')}
                                </span>
                            </div>
                            
                            <p className='text-sm font-medium leading-tight mt-0.5 text-gray-800 line-clamp-2 break-words'>
                                {item.product_name}
                            </p>

                            <div className='flex items-center gap-2 mt-2'>
                                {!item.isRead && (
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-7 px-2 text-[10px] text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                                        onClick={() => markAsRead(item.notif_id)}
                                    >
                                        <MdCheck className="mr-1 h-3 w-3" /> Mark read
                                    </Button>
                                )}
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 px-2 text-[10px] text-gray-500 hover:text-red-600 hover:bg-red-50 ml-auto"
                                    onClick={() => delete_notification(item.notif_id)}
                                >
                                    <BiTrash className="mr-1 h-3 w-3" /> Remove
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className='flex flex-col justify-center items-center py-12 text-gray-400 gap-2'>
                    <IoIosNotificationsOutline className="h-10 w-10 opacity-20" />
                    <span className='text-sm'>No notifications</span>
                </div>
            )}
        </div>
    );

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="secondary" 
                     
                    className="relative text-black  border border-black/50 cursor-pointer"
                >
                    <IoIosNotificationsOutline className="" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            
            
            <PopoverContent 
                className="w-[calc(100vw-22px)] sm:w-96 p-0 shadow-2xl border-gray-200 z-[100]" 
                align="end" 
                sideOffset={8}
            >
                <div className='p-3 px-4 flex items-center justify-between border-b border-gray-100 bg-white rounded-t-lg'>
                    <div className='flex items-center gap-2'>
                        <h4 className='font-semibold text-sm text-gray-800'>Notifications</h4>
                        {unreadCount > 0 && (
                            <span className='bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full'>
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    
                    <div className='flex gap-1'>
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50" 
                            title="Mark all as read"
                            onClick={mark_all_read}
                        >
                            <MdMarkEmailRead className='h-4 w-4' />
                        </Button>
                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50" 
                            title="Clear all"
                            onClick={delete_all_notification}
                        >
                            <MdDeleteOutline className='h-4 w-4' />
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full bg-white">
                    <div className="px-4 pt-2">
                        <TabsList className="w-full justify-start h-9 bg-transparent p-0 border-b border-gray-100 space-x-4">
                            <TabsTrigger 
                                value="all" 
                                className="text-xs h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-black text-gray-500 px-2 shadow-none transition-none"
                            >
                                All
                            </TabsTrigger>
                            <TabsTrigger 
                                value="unread" 
                                className="text-xs h-9 rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-black text-gray-500 px-2 shadow-none transition-none"
                            >
                                Unread
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    
                    <ScrollArea className='h-[400px] max-h-[50vh] bg-white'>
                        <TabsContent value="all" className="m-0 focus-visible:ring-0">
                           <NotificationList data={notificationDataStore} />
                        </TabsContent>
                        <TabsContent value="unread" className="m-0 focus-visible:ring-0">
                            <NotificationList data={notificationDataStore.filter(n => !n.isRead)} />
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
                
                <div className='p-2 border-t border-gray-100 bg-gray-50 rounded-b-lg'>
                     <Button onClick={()=>setIsOpen(false)} variant="ghost" className='w-full h-8 text-xs text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'>
                        Close
                     </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Notification