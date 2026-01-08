import * as React from "react"
import { ResponsiveContainer, Tooltip } from "recharts"

const ChartContainer = React.forwardRef(({ config, className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={className} {...props}>
            <style dangerouslySetInnerHTML={{
                __html: Object.entries(config).map(([key, val]) => `
        :root { --color-${key}: ${val.color}; }
      `).join('')
            }} />
            <ResponsiveContainer width="100%" height={300}>
                {children}
            </ResponsiveContainer>
        </div>
    )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = Tooltip

const ChartTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass p-2 rounded border border-border">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }
