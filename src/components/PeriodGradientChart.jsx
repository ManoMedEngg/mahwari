'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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

const chartConfig = {
    duration: {
        label: 'Duration',
        color: 'hsl(var(--hue), 100%, 50%)',
    },
};

export default function PeriodGradientChart({ periods, t }) {
    // If no periods, show dummy data to demonstrate graph
    const hasData = periods && periods.length > 0;

    const chartData = hasData ? (periods || [])
        .slice(0, 6) // Last 6
        .reverse()
        .map(p => ({
            month: new Date(p.start).toLocaleDateString('en-US', { month: 'short' }),
            duration: p.days || 4
        })) : [
        { month: 'Jan', duration: 4 },
        { month: 'Feb', duration: 5 },
        { month: 'Mar', duration: 4 }, // Dummy
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t.period_history}</CardTitle>
                <CardDescription>
                    {hasData ? t.duration : 'No data yet (Example Data)'}
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
                        <CartesianGrid vertical={false} stroke="rgba(87, 116, 100, 1)" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        {/* Y Axis for Duration (Days) */}
                        <CartesianGrid vertical={false} stroke="rgba(233, 233, 233, 0.1)" />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}d`}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillDuration" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-duration)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-duration)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="duration"
                            type="natural"
                            fill="url(#fillDuration)"
                            fillOpacity={0.4}
                            stroke="var(--color-duration)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
