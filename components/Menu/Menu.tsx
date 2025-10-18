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

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { useState } from 'react';
import { signOut } from 'next-auth/react';
const Menu = () => {
  const [open, setOpen] = useState(true)
  const [parentOpen, setParentOpen] = useState(true)
  const menuBarToggle = () => {
    setParentOpen(prev => !prev)
    setTimeout(() => {
      setOpen(prev => !prev)
    }, 100);
  }
  return (
    <div className={`${parentOpen ? 'w-[250px]' : 'w-[50px]'} duration-200 bg-[#171717] border-r border-white/15 text-white rounded[10px] h-screen`}>
      <div className={`flex ${open ? 'justify-between  p-5' : 'justify-center  p-2 text-[25px] text-center'} items-center border-b border-white/15`}>
        {open && <Label>OverClockedX</Label>}
        <button className='cursor-pointer' onClick={menuBarToggle}><FiSidebar /></button>
      </div>
      <div className={`flex flex-col justify-between gap-10 ${open ? 'p-5' : 'p-0 py-5 justify-center items-center text-[20px]'}`}>
        <div className='flex flex-col gap-5'>
          <div className='flex gap-2 justify-start items-center cursor-pointer '>
            <MdDashboard className={`p-1 text-[30px] rounded ${!open && 'border border-white/15 text-[35px] hover:bg-blue-800'}`} />
            {open && <Label className='cursor-pointer'>Dashboard</Label>}
          </div>
          <div className='flex gap-2 justify-start items-center '>

            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue=""
            >
              <AccordionItem value="item-1">
                <div className='flex gap-2 justify-start items-center delay-100'>
                  <GoPackage className={`p-1 text-[30px] rounded cursor-pointer ${!open && 'border border-white/15 text-[35px] hover:bg-blue-800'}`} />
                  {open && <AccordionTrigger className='delay-200 duration-200 cursor-pointer'>Products</AccordionTrigger>}
                </div>
                {open && <AccordionContent className="flex flex-col gap-3 text-balance text-white py-2 px-6 cursor-pointer">

                  <Label className=''>Computers</Label>
                  <Label className=''>Components</Label>
                  <Label className=''>Peripherals</Label>
                  <Label className=''>Networks</Label>


                </AccordionContent>}
              </AccordionItem>
            </Accordion>
          </div>
          <div className='flex gap-2 justify-start items-center cursor-pointer'>
            <TbTruckDelivery className={`p-1 text-[30px] rounded ${!open && 'border border-white/15 text-[35px] hover:bg-blue-800'}`} />
            {open && <Label className='cursor-pointer'>Orders</Label>}
          </div>
          <div className='flex gap-2 justify-start items-center cursor-pointer'>
            <IoIosSettings className={`p-1 text-[30px] rounded ${!open && 'border border-white/15 text-[35px] hover:bg-blue-800'}`} />
            {open && <Label className='cursor-pointer'>Settings</Label>}
          </div>
        </div>
        <button onClick={() => signOut()} className='flex items-center gap-2 justify-start cursor-pointer'>
          <FaUserCircle className={`p-1 text-[30px] rounded ${!open && 'border border-white/15 text-[35px] hover:bg-blue-800'}`} />
          {open && <label className='cursor-pointer'>Signout</label>}
        </button>
      </div>


    </div>
  )
}

export default Menu
