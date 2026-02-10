"use client"
import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { RiSettings3Line } from "react-icons/ri";
import { GoPackage } from "react-icons/go";

import { BsMinecart } from "react-icons/bs";
import { MdOutlineQrCodeScanner } from "react-icons/md";

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const menuItems = [
    { name: "Settings", icon: <RiSettings3Line className={`p-1 text-[25px] rounded `} />, path: "/LandingPage/Settings" },
    { name: "Inventory", icon: <GoPackage className={`p-1 text-[25px] rounded `} />, path: "/LandingPage/ProductPage" },
    { name: "Dashboard", icon: <RxDashboard className={`p-1 text-[25px] rounded `} />, path: "/LandingPage" },
    { name: "Orders", icon: <BsMinecart className={`p-1 text-[25px] rounded `} />, path: "/LandingPage/OrdersPage" },
    { name: "QRCode Scanner", icon: <MdOutlineQrCodeScanner className={`p-1 text-[25px] rounded `} />, path: "/LandingPage/QRCodeScanner" },
];
const MobileMenu = () => {
    const router = useRouter()
    const pathname = usePathname();
    
    return (
        <div className=' z-50  flex md:hidden right-0 fixed h-[50px] bg-white border-t border-black/30 bottom-0 w-full'>
            <div className='flex items-center justify-evenly w-full'>
                {menuItems.map((data, index) => (
                    <div key={index} onClick={() => router.push(data.path)} className={`flex gap-2 justify-start items-center  cursor-pointer hover:bg-primary hover:text-white rounded-[50%] p-1 ${pathname == data.path ? 'bg-primary text-white ' : 'text-black'}`}>
                        {data.icon}

                    </div>
                ))}

            </div>
        </div>
    )
}

export default MobileMenu