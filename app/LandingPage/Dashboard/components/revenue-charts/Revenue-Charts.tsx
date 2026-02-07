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
import { MdLeaderboard } from "react-icons/md";
import { useState, useEffect } from 'react'
import { year } from '@/utils/yearGenerator'
export const description = "An interactive area chart"
const chartConfig = {
    revenue: {
        label: "Total Revenue",
        color: "#104254",
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
                        (d) => new Date(d.created_at).getMonth() === index
                    );

                    const totalRevenue = monthData.reduce((sum: number, d: RevenueItem) => sum + Number(d.total_amount), 0);

                    return { month, totalRevenue };
                });
                setChartData(newChartData);
            }
        };
        fetchDataForChart();
        const interval = setInterval(fetchDataForChart, 10000); 
        return () => clearInterval(interval);
    }, [selectedYear]);
    const totalRevenue = chartData.reduce((sum, data) => sum + data.totalRevenue, 0);


    return (
        <div className='w-full flex-1 bg-white rounded border border-black/15 justify-between'>
            <Card className="pt-0  flex-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-black/15 py-5">
                    <div className="grid gap-1">
                        <CardTitle className='text-black font-bold tracking-tight'>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/20 rounded-lg border border-primary/30">
                                    <MdLeaderboard className="text-xl text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Revenue Chart</h3>
                                    <p className="text-[11px] text-slate-500 font-medium">Monthly breakdown & total for selected year</p>
                                </div>
                            </div>
                        </CardTitle>
                        <CardDescription className='text-gray-400'>
                            Total Revenue: <span className="text-primary font-bold ml-1">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(totalRevenue)}
                            </span>
                        </CardDescription>
                    </div>

                    <Select onValueChange={(value) => setSelectedYear(value)} defaultValue={selectedYear}>
                        <SelectTrigger
                            className="w-[120px] rounded-lg  border-gray-700 text-black focus:ring-white focus:border-white"
                            aria-label="Select a range"
                        >
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-700 text-black">
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

                            <CartesianGrid vertical={false} horizontal={false} />
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
