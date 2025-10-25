"use client"
import React from 'react'
import { Label } from '../ui/label'
//icons
import { FiSidebar } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";



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
    { name: "Dashboard", icon: <MdDashboard className={`p-1 text-[30px] rounded ${!open && ' text-[35px] '}`} />, path: "/LandingPage" },
    { name: "Inventory", icon: <GoPackage className={`p-1 text-[30px] rounded ${!open && ' text-[35px] '}`} />, path: "/LandingPage/ProductPage" },
    { name: "Orders", icon: <TbTruckDelivery className={`p-1 text-[30px] rounded ${!open && ' text-[35px] '}`} />, path: "/LandingPage/Orders" },
    { name: "Settings", icon: <IoIosSettings className={`p-1 text-[30px] rounded ${!open && ' text-[35px] '}`} />, path: "/LandingPage/Settings" },
  ];
  return (
    <div className={`${parentOpen ? 'w-[250px]' : 'w-[50px]'} duration-200 bg-white shadow-xl rounded border border-black/15 rounded[10px] text-black/80`}>
      <div className={`flex ${open ? 'justify-between  p-5' : 'justify-center  p-2 text-[25px] text-center'} items-center border-b border-white/15`}>
        {open && <Label>OverClockedX</Label>}
        <button className='cursor-pointer' onClick={menuBarToggle}><FiSidebar /></button>
      </div>
      <div className={`flex flex-col justify-between gap-10  h-[90vh] ${open ? 'p-5' : 'p-0 py-5 justify-between items-center text-[20px]'}`}>
        <div className='flex flex-col gap-4'>
          {menuItems.map((data, index) => (
            <div key={index} onClick={() => router.push(data.path)} className={`flex gap-2 justify-start items-center cursor-pointer hover:bg-[#1549e6] hover:text-white rounded p-1 ${pathname == data.path && 'bg-[#1549e6] text-white'}`}>
              {data.icon}
              {open && <Label className='cursor-pointer'>{data.name}</Label>}
            </div>
          ))}

        </div>
        <button onClick={() => signOut()} className={`flex items-center gap-2 justify-start cursor-pointer hover:bg-[#1549e6] hover:text-white rounded p-1`}>
          <FaUserCircle className={`p-1 text-[30px] rounded ${!open && ' text-[35px] '}`} />
          {open && <label className='cursor-pointer'>Signout</label>}
        </button>
      </div>


    </div>
  )
}

export default Menu
