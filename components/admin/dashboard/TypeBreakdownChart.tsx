import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationTypeBreakdownItem } from "@/lib/types/admin/dashboard"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface TypeBreakdownChartProps {
  data: ApplicationTypeBreakdownItem[]
}

const COLORS = {
  rent: "#334155", // slate-700
  land: "#64748b", // slate-500
}

const getColor = (type: string) => {
  const key = type.toLowerCase() as keyof typeof COLORS
  return COLORS[key] || "#94a3b8" // slate-400
}

export function TypeBreakdownChart({ data }: TypeBreakdownChartProps) {
  const chartData = data.map(item => ({
    name: item.type,
    value: item.count,
    color: getColor(item.type)
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Applications by Loan Type</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
