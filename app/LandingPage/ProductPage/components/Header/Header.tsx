"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button'
const Header = () => {
    const Computer = ['Desktop', 'Laptop']
    const Components = ['PcCase', 'CPU', 'Motherboard', 'Memory', 'Storage', 'GPU', 'PowerSupply']
    const Peripherals = ['Monitor', 'KeyBoard', 'Mouse', 'HeadPhone', 'Microphone']
    const Networks = ['Router', 'Switch']
    return (
        <div className='rounded bg-[#171717] border border-white/15 flex justify-between px-5 items-center'>
            <div>
                <Label className='py-2 text-[30px]'>Products</Label>
                <div className='flex gap-1 items-center'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Label>All Products</Label>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className='py-0'>Computers</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink >All</NavigationMenuLink>
                                    {Computer.map((data, index) => (
                                        <NavigationMenuLink key={index}>{data}</NavigationMenuLink>
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
                                    <NavigationMenuLink >All</NavigationMenuLink>
                                    {Components.map((data, index) => (
                                        <NavigationMenuLink key={index}>{data}</NavigationMenuLink>
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
                                    <NavigationMenuLink >All</NavigationMenuLink>
                                    {Peripherals.map((data, index) => (
                                        <NavigationMenuLink key={index}>{data}</NavigationMenuLink>
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
                                    <NavigationMenuLink >All</NavigationMenuLink>
                                    {Networks.map((data, index) => (
                                        <NavigationMenuLink key={index}>{data}</NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <Button>Add Products</Button>

        </div>
    )
}

export default Header
