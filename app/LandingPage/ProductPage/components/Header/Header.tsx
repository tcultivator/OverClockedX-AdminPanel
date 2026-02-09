"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import AddProducts from './components/addProducts/AddProducts'
import { useSearchParams } from 'next/navigation'

const Header = () => {
    const categories = {
        'Computers': ['Desktop', 'Laptop'],
        'Components': ['PcCase', 'CPU', 'Motherboard', 'Memory', 'Storage', 'GPU', 'PowerSupply'],
        'Peripherals': ['Monitor', 'KeyBoard', 'Mouse', 'HeadPhone', 'Microphone'],
        'Networks': ['Router', 'Switch']
    }

    const searchParams = useSearchParams();

    const setCategoryFilter = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('category', value.toString());
        params.set('type', 'filter')
        window.history.pushState({}, '', `?${params.toString()}`);
    }

    return (
        <header className='rounded-lg bg-white border border-black/10 flex justify-between px-4 py-2 items-center shadow-sm'>
            <div className='flex items-center gap-4'>

                <div className='md:hidden'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className='text-black/70'>
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-[280px] flex flex-col p-0">
                            <SheetHeader className="p-6 border-b shrink-0">
                                <SheetTitle className="text-left">Categories</SheetTitle>
                            </SheetHeader>


                            <div className='flex-1 overflow-y-auto'>
                                <div className='flex flex-col gap-2 p-4 pb-10'>
                                    <SheetClose className='items-start flex justify-start'>
                                        <Label
                                            
                                            className='justify-start font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 active:text-blue-700 active:bg-blue-50'
                                            onClick={() => setCategoryFilter('all')}
                                        >
                                            All Products
                                        </Label>
                                    </SheetClose>


                                    {Object.entries(categories).map(([group, items]) => (
                                        <div key={group} className='flex flex-col gap-1 mt-2'>
                                            <Label className='px-4 py-2 text-[10px] font-bold text-black/40 uppercase tracking-widest bg-gray-50 rounded-md'>
                                                {group}
                                            </Label>
                                            <SheetClose className='items-start flex justify-start'>
                                                <Label
                                                    
                                                    className='justify-start pl-6 h-9 text-sm font-medium border-l-2 border-transparent hover:border-black active:border-black rounded-none'
                                                    onClick={() => setCategoryFilter(group)}
                                                >
                                                    View All {group}
                                                </Label>
                                            </SheetClose>


                                            {items.map((item,index) => (
                                                <SheetClose key={index} className='items-start flex justify-start'>
                                                    <Label
                                                        className='justify-start pl-8 h-9 text-sm font-light text-black/60 hover:text-black border-l-2 border-transparent hover:border-gray-300 active:border-gray-300 rounded-none'
                                                        onClick={() => setCategoryFilter(item)}
                                                    >
                                                        {item}
                                                    </Label>
                                                </SheetClose>

                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="p-4 border-t bg-gray-50 shrink-0">
                                <p className="text-[10px] text-center text-gray-400">Filter Product Categories</p>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className='flex flex-col'>
                    <h1 className='text-xl md:text-2xl font-bold text-black/80 tracking-tight'>Products</h1>


                    <div className='hidden md:flex gap-1 items-center text-black'>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild>
                                        <Label className='font-thin' onClick={() => setCategoryFilter('all')}>All Products</Label>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='py-0 text-black font-thin'>Computers</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <NavigationMenuLink onClick={() => setCategoryFilter('Computers')}>All</NavigationMenuLink>
                                        {categories.Computers.map((data, index) => (
                                            <NavigationMenuLink onClick={() => setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='py-0 text-black font-thin'>Components</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <NavigationMenuLink onClick={() => setCategoryFilter('Components')}>All</NavigationMenuLink>
                                        {categories.Components.map((data, index) => (
                                            <NavigationMenuLink onClick={() => setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='py-0 text-black font-thin'>Peripherals</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <NavigationMenuLink onClick={() => setCategoryFilter('Peripherals')}>All</NavigationMenuLink>
                                        {categories.Peripherals.map((data, index) => (
                                            <NavigationMenuLink onClick={() => setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='py-0 text-black font-thin'>Networks</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <NavigationMenuLink onClick={() => setCategoryFilter('Networks')} >All</NavigationMenuLink>
                                        {categories.Networks.map((data, index) => (
                                            <NavigationMenuLink onClick={() => setCategoryFilter(data)} key={index}>{data}</NavigationMenuLink>
                                        ))}
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <AddProducts />
            </div>
        </header>
    )
}

export default Header