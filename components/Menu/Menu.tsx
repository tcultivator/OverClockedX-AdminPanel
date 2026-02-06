"use client"
import React from 'react'
import { Label } from '../ui/label'
//icons
import { FiSidebar } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import { RxDashboard } from "react-icons/rx";
import { RiSettings3Line } from "react-icons/ri";
import { GoPackage } from "react-icons/go";

import { BsMinecart } from "react-icons/bs";
import { MdOutlineQrCodeScanner } from "react-icons/md";


import { useState } from 'react';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
const Menu = () => {
  const [open, setOpen] = useState(true)
  const [parentOpen, setParentOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname();
  const menuBarToggle = () => {
    setParentOpen(prev => !prev)
    setTimeout(() => {
      setOpen(prev => !prev)
    }, 100);
  }
  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard className={`p-1 text-[25px] rounded ${!open && ' text-[40px] p-2 '}`} />, path: "/LandingPage" },
    { name: "Inventory", icon: <GoPackage className={`p-1 text-[25px] rounded ${!open && ' text-[40px] p-2 '}`} />, path: "/LandingPage/ProductPage" },
    { name: "Orders", icon: <BsMinecart className={`p-1 text-[25px] rounded ${!open && ' text-[40px] p-2 '}`} />, path: "/LandingPage/OrdersPage" },
    { name: "Settings", icon: <RiSettings3Line className={`p-1 text-[25px] rounded ${!open && ' text-[40px] p-2 '}`} />, path: "/LandingPage/Settings" },
    { name: "QRCode Scanner", icon: <MdOutlineQrCodeScanner className={`p-1 text-[25px] rounded ${!open && ' text-[40px] p-2 '}`} />, path: "/LandingPage/QRCodeScanner" },
  ];
  return (
    <div className={`${parentOpen ? 'w-[300px]' : 'w-[80px] '} hidden md:block  h-screen duration-200 py-1 pl-1     text-white/80`}>
      <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded h-full'>
        <div className={`flex ${open ? 'justify-between  p-5' : 'justify-center  p-2 text-[25px] text-center'} items-center border-b border-white/15`}>
          {open && <Label>OverClockedX</Label>}
          <button className='cursor-pointer' onClick={menuBarToggle}><FiSidebar /></button>
        </div>
        <div className={`flex flex-col justify-between gap-10  h-[90vh] ${open ? 'p-5' : 'p-0 py-5 justify-between items-center '}`}>
          <div className='flex flex-col gap-4'>
            {menuItems.map((data, index) => (
              <div key={index} onClick={() => router.push(data.path)} className={`flex gap-2 justify-start items-center cursor-pointer hover:bg-primary hover:text-[#1c2736] ${open ? 'rounded' : 'rounded-[50%]'} p-2 ${pathname == data.path && 'bg-primary text-[#1c2736]'}`}>
                {data.icon}
                {open && <Label className='cursor-pointer'>{data.name}</Label>}
              </div>
            ))}

          </div>
          <button onClick={() => signOut()} className={`flex items-center gap-2 justify-start cursor-pointer hover:bg-primary hover:text-[#1c2736] ${open ? 'rounded' : 'rounded-[50%]'} p-1`}>
            <FaUserCircle className={`p-1 text-[25px] rounded ${!open && ' text-[40px] p-2 '}`} />
            {open && <Label className='cursor-pointer'>Logout</Label>}
          </button>
        </div>
      </div>



    </div>
  )
}

export default Menu
