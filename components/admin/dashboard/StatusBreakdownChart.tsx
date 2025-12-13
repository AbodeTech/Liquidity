import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBreakdownItem } from "@/lib/types/admin/dashboard"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface StatusBreakdownChartProps {
  data: StatusBreakdownItem[]
}



// Helper to map tailwind colors to hex/hsl for recharts
// Note: In a real app, you might want to use a proper color palette or CSS variables
const COLORS = {
  approved: "#10b981", // emerald-500
  rejected: "#ef4444", // red-500
  under_review: "#f59e0b", // amber-500
  submitted: "#3b82f6", // blue-500
  draft: "#64748b", // slate-500
}

const getColor = (status: string) => {
  const key = status.toLowerCase() as keyof typeof COLORS
  return COLORS[key] || COLORS.draft
}

export function StatusBreakdownChart({ data }: StatusBreakdownChartProps) {
  const chartData = data.map(item => ({
    name: item.status.replace("_", " "),
    value: item.count,
    color: getColor(item.status)
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Applications by Status</CardTitle>
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
