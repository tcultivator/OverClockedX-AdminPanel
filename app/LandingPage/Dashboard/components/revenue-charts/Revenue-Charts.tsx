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
const revenue_charts = () => {
    const [selectedYear, setSelectedYear] = useState('2025')
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
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
                console.log('eto ung laman ng response, ', response)
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
    }, [selectedYear]);
    const totalRevenue = chartData.reduce((sum, data) => sum + data.totalRevenue, 0);


    return (
        <div className='w-full'>
            <Card className="pt-0">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1">
                        <div className='flex justify-between items-center py-2'>
                            <CardTitle className=''>Revenues Overview</CardTitle>
                            <Select onValueChange={(value) => setSelectedYear(value)}>
                                <SelectTrigger
                                    className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                                    aria-label="Select a range"
                                >
                                    <SelectValue placeholder="2025" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="2023">2023</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2025">2025</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex items-center pt-3 border-t border-black/15'>
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
                    <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
                        <AreaChart data={chartData} margin={{ left: 20, right: 20 }}>
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
        </div>

    )
}

export default revenue_charts
