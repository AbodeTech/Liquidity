import { CheckCircle2, Circle } from 'lucide-react'

interface StatusHistoryItem {
  status: string
  date: string
  time: string
}

interface StatusTimelineProps {
  statusHistory: StatusHistoryItem[]
}

const statusLabels: Record<string, string> = {
  submitted: "Application Submitted",
  "in-review": "Under Review",
  approved: "Application Approved",
  "payment-confirmed": "Payment Confirmed",
  "funds-disbursed": "Funds Disbursed",
  active: "Loan Activated",
  rejected: "Application Rejected",
}

export function StatusTimeline({ statusHistory }: StatusTimelineProps) {
  return (
    <div className="space-y-4">
      {statusHistory.map((item, index) => {
        const isLast = index === statusHistory.length - 1
        const isCompleted = true

        return (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`rounded-full p-1 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              {!isLast && (
                <div className={`w-0.5 h-12 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`} />
              )}
            </div>
            <div className="flex-1 pb-8">
              <p className="font-medium text-sm">{statusLabels[item.status] || item.status}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(item.date).toLocaleDateString()} at {item.time}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
