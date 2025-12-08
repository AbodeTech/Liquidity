import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle2, XCircle, Clock } from "lucide-react"
import { DashboardOverviewResponse } from "@/lib/types/admin/dashboard"
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts"

interface OverviewCardsProps {
  overview: DashboardOverviewResponse['overview']
  trends: DashboardOverviewResponse['trends']
  rejectedPercentage: number
}

export function OverviewCards({ overview, trends, rejectedPercentage }: OverviewCardsProps) {
  const trendData = [
    { name: "Today", value: trends?.today || 0 },
    { name: "Week", value: trends?.thisWeek || 0 },
    { name: "Month", value: trends?.thisMonth || 0 },
  ]

  const stats = [
    {
      title: "Total Applications",
      value: overview?.total || 0,
      icon: FileText,
      trend: `Today: ${trends?.today || 0}`,
      chart: (
        <div className="h-[40px] w-[80px] ml-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <Tooltip
                contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '6px', fontSize: '12px', padding: '4px 8px' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ fill: 'transparent' }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )
    },
    {
      title: "Pending Review",
      value: (overview?.submitted || 0) + (overview?.underReview || 0),
      icon: Clock,
      trend: "Needs attention",
      highlight: true
    },
    {
      title: "Approved Loans",
      value: overview?.approved || 0,
      icon: CheckCircle2,
      trend: `This Month: ${trends?.thisMonth || 0}`
    },
    {
      title: "Rejected",
      value: overview?.rejected || 0,
      icon: XCircle,
      trend: `${rejectedPercentage}% of total`
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={stat.highlight ? "border-amber-500/50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </div>
              {stat.chart}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
