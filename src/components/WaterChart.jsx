'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, Defs, LinearGradient, Stop } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
    { month: 'Mon', water: 180 },
    { month: 'Tue', water: 250 },
    { month: 'Wed', water: 200 },
    { month: 'Thu', water: 280 },
    { month: 'Fri', water: 150 },
    { month: 'Sat', water: 300 },
    { month: 'Sun', water: 220 },
];

const chartConfig = {
    water: {
        label: 'Water (ml)',
        color: 'hsl(var(--hue), 100%, 50%)',
    },
};

export default function WaterChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hydration Trend</CardTitle>
                <CardDescription>
                    Daily consumption (Last 7 Days)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillWater" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-water)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-water)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="water"
                            type="natural"
                            fill="url(#fillWater)"
                            fillOpacity={0.4}
                            stroke="var(--color-water)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
