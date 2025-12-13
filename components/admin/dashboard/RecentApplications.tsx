import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { adminApplicationService } from "@/lib/services/admin/applicationService"
import { format } from "date-fns"
import { Application } from "@/lib/types/admin/application"

export function RecentApplications() {
  const { data: recentApps, isLoading } = useQuery({
    queryKey: ["recent-applications"],
    queryFn: adminApplicationService.getRecentApplications,
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  console.log(recentApps)

  const applications: Application[] = recentApps?.data || []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Applications</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Latest loan applications submitted</p>
        </div>
        <Link href="/admin/applications">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {applications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No recent applications found.</p>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-sm">{app._id.substring(0, 8).toUpperCase()}</p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {app.loanPurpose}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{app.personalInfo.fullName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-medium text-sm">
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(app.rentLoanDetails?.desiredLoanAmount || app.landLoanDetails?.desiredLoanAmount || 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(app.submittedAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <Badge
                    variant={
                      app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"
                    }
                    className={
                      app.status === "approved" ? "bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20" : ""
                    }
                  >
                    {app.status}
                  </Badge>
                  <Link href={`/admin/applications/${app._id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
