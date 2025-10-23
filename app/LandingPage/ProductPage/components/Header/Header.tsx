"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button'
import AddProducts from './components/addProducts/AddProducts'
import { useSearchParams } from 'next/navigation'
const Header = () => {
    const Computer = ['Desktop', 'Laptop']
    const Components = ['PcCase', 'CPU', 'Motherboard', 'Memory', 'Storage', 'GPU', 'PowerSupply']
    const Peripherals = ['Monitor', 'KeyBoard', 'Mouse', 'HeadPhone', 'Microphone']
    const Networks = ['Router', 'Switch']
    const searchParams = useSearchParams();

    const setCategoryFilter = (value:string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('category', value.toString());
        window.history.pushState({}, '', `?${params.toString()}`);

    }
    return (
        <div className='rounded bg-[#171717] border border-white/15 flex justify-between px-5 items-center'>
            <div>
                <Label className='py-2 text-[30px]'>Products</Label>
                <div className='flex gap-1 items-center'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Label onClick={()=>setCategoryFilter('all')}>All Products</Label>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className='py-0'>Computers</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink onClick={()=>setCategoryFilter('Computers')}>All</NavigationMenuLink>
                                    {Computer.map((data, index) => (
                                        <NavigationMenuLink onClick={()=>setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className=''>Components</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink onClick={()=>setCategoryFilter('Components')}>All</NavigationMenuLink>
                                    {Components.map((data, index) => (
                                        <NavigationMenuLink onClick={()=>setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className=''>Peripherals</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink onClick={()=>setCategoryFilter('Peripherals')}>All</NavigationMenuLink>
                                    {Peripherals.map((data, index) => (
                                        <NavigationMenuLink onClick={()=>setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className=''>Networks</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink onClick={()=>setCategoryFilter('Networks')} >All</NavigationMenuLink>
                                    {Networks.map((data, index) => (
                                        <NavigationMenuLink onClick={()=>setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <AddProducts />

        </div>
    )
}

export default Header
