"use client"
import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RiCheckboxBlankFill } from "react-icons/ri";
import { useState, useEffect } from 'react'
import { year } from '@/utils/yearGenerator'
export const description = "An interactive area chart"
const chartConfig = {
    revenue: {
        label: "Total Revenue",
        color: "var(--primary)",
    },

} satisfies ChartConfig

interface ChartDataItem {
    month: string;
    totalRevenue: number;
}
interface RevenueItem {
    total_amount: string;
    created_at: string;
}
const Revenue_charts = () => {
    const [selectedYear, setSelectedYear] = useState(()=>{
        const now = new Date();
        return now.getFullYear().toString()
    })
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [dropDownYearSelection, setDropDownYearSelection] = useState<number[]>(() => year())
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    useEffect(() => {
        const fetchDataForChart = async () => {
            const revenueData = await fetch(`/api/Dashboard/revenue?year=${selectedYear}`, {
                method: 'GET'
            });
            const response = await revenueData.json();
            if (response.status !== 500) {
                const newChartData: ChartDataItem[] = months.map((month, index) => {
                    const monthData = (response as RevenueItem[]).filter(
                        (d) => new Date(d.created_at).getMonth() === index// the .getMonth will return number , that's why the index is use for conditioning
                    );

                    const totalRevenue = monthData.reduce((sum: number, d: RevenueItem) => sum + Number(d.total_amount), 0);// if the condition is match, which is the month converted to number and index which is the index of month it will add all the data using useReducer

                    return { month, totalRevenue };// return this object in newChartData
                });
                setChartData(newChartData);//set the data to state which is use for displaying in chart
            }
        };
        fetchDataForChart();
        const interval = setInterval(fetchDataForChart, 10000); // refresh every 10s
        return () => clearInterval(interval);
    }, [selectedYear]);
    const totalRevenue = chartData.reduce((sum, data) => sum + data.totalRevenue, 0);


    return (
        <div className='w-full  '>
            <Card className="pt-0 border border-black/15 flex-1">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1">
                        <div className='flex justify-between items-center'>
                            <CardTitle className='text-primary'>Revenues Overview</CardTitle>
                            <Select onValueChange={(value) => setSelectedYear(value)} defaultValue={dropDownYearSelection[dropDownYearSelection.length - 1].toString()}>
                                <SelectTrigger
                                    className="w-[160px] rounded-lg sm:ml-auto flex"
                                    aria-label="Select a range"
                                >
                                    <SelectValue placeholder={dropDownYearSelection[dropDownYearSelection.length - 1].toString()} />
                                </SelectTrigger>
                                <SelectContent className="rounded md:rounded-xl">
                                    {dropDownYearSelection.map((data, index) => (
                                        <SelectItem key={index} value={data.toString()}>{data}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex items-center pt-1 border-t border-black/15'>
                            <div>
                                <div className='flex items-center gap-1'>
                                    <RiCheckboxBlankFill className='text-primary text-[10px]' />

                                    <CardDescription className='text-sm'>
                                        Total Revenue
                                    </CardDescription>
                                </div>

                                <CardDescription className='text-xl text-black'>
                                    {new Intl.NumberFormat('en-PH', {
                                        style: 'currency',
                                        currency: 'PHP',
                                    }).format(totalRevenue)}
                                </CardDescription>
                            </div>

                        </div>

                    </div>

                </CardHeader>

                <CardContent className="">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[20vh] md:h-[30vh]  w-full">
                        <AreaChart data={chartData} margin={{ left: 20, right: 10 }}>
                            <defs>
                                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                                </linearGradient>

                            </defs>

                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={true}
                                axisLine={true}
                                tickMargin={4}
                                minTickGap={8}
                            />

                            <ChartTooltip
                                cursor={true}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => value}
                                        indicator="dot"
                                    />
                                }
                            />

                            <Area
                                type="natural"
                                dataKey="totalRevenue"
                                stroke="var(--color-revenue)"
                                fill="url(#fillRevenue)"
                                name="Total Revenue"
                            />


                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div >

    )
}

export default Revenue_charts
