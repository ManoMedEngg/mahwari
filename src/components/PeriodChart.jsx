'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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
    length: {
        label: 'Cycle Length',
        color: '#E91E63', // Fixed pink for period
    },
};

export default function PeriodChart({ history }) {
    // Convert [30, 28, 29] to object array for chart
    const chartData = (history || []).map((val, i) => ({
        cycle: `C${i + 1}`,
        length: parseInt(val)
    }));

    if (!chartData.length) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cycle History</CardTitle>
                <CardDescription>
                    Length of your last few cycles
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
                        <CartesianGrid vertical={false} stroke="rgba(233, 233, 233, 0.1)" />
                        <XAxis
                            dataKey="cycle"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />
                        <Area
                            dataKey="length"
                            type="linear"
                            fill="var(--color-length)"
                            fillOpacity={0.4}
                            stroke="var(--color-length)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
