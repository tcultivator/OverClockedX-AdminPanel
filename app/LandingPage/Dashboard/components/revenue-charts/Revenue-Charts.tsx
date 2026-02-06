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
        color: "white",
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
    const [selectedYear, setSelectedYear] = useState(() => {
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
        <div className='w-full flex-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded justify-between'>
            <Card className="pt-0 border border-black/15 flex-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-700/50 py-5">
                    <div className="grid gap-1">
                        <CardTitle className='text-gray-100 font-bold tracking-tight'>
                            Revenues Overview
                        </CardTitle>
                        <CardDescription className='text-gray-400'>
                            Total Revenue: <span className="text-emerald-400 font-bold ml-1">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(totalRevenue)}
                            </span>
                        </CardDescription>
                    </div>

                    <Select onValueChange={(value) => setSelectedYear(value)} defaultValue={selectedYear}>
                        <SelectTrigger
                            className="w-[120px] rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-emerald-500/20 focus:border-emerald-500"
                            aria-label="Select a range"
                        >
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {dropDownYearSelection.map((data, index) => (
                                <SelectItem
                                    key={index}
                                    value={data.toString()}
                                    className="focus:bg-gray-700 focus:text-white cursor-pointer"
                                >
                                    {data}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
