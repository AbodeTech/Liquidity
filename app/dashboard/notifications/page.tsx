"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NotificationItem } from "@/components/dashboard/notification-item"
import { Bell } from 'lucide-react'

type NotificationType = "application" | "payment" | "document" | "system"

type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionHref?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "application",
    title: "Application Approved",
    message: "Congratulations! Your rent loan application ABX-RENT-001 has been approved. Please proceed with payment.",
    timestamp: "2 hours ago",
    read: false,
    actionLabel: "View Application",
    actionHref: "/dashboard/applications",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Reminder",
    message: "Your next payment of ₦45,000 is due in 3 days on February 1, 2025.",
    timestamp: "5 hours ago",
    read: false,
    actionLabel: "Make Payment",
    actionHref: "/dashboard/payments",
  },
  {
    id: "3",
    type: "document",
    title: "Document Verified",
    message: "Your Valid ID Card has been verified successfully.",
    timestamp: "Yesterday",
    read: false,
  },
  {
    id: "4",
    type: "application",
    title: "Application Under Review",
    message: "Your land loan application ABX-LAND-002 is now being reviewed by our team.",
    timestamp: "Yesterday",
    read: true,
    actionLabel: "View Application",
    actionHref: "/dashboard/applications",
  },
  {
    id: "5",
    type: "payment",
    title: "Payment Received",
    message: "Your payment of ₦45,000 has been received and processed successfully.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "document",
    title: "Document Rejected",
    message: "Your Bank Statement was rejected. Reason: Document is not clear. Please re-upload a clearer version.",
    timestamp: "3 days ago",
    read: true,
    actionLabel: "Upload Document",
    actionHref: "/dashboard/documents",
  },
  {
    id: "7",
    type: "system",
    title: "Welcome to Abodex",
    message: "Thank you for signing up! Complete your profile and upload your documents to get started.",
    timestamp: "1 week ago",
    read: true,
  },
  {
    id: "8",
    type: "application",
    title: "Application Submitted",
    message: "Your rent loan application has been submitted successfully. Reference: ABX-RENT-001",
    timestamp: "1 week ago",
    read: true,
  },
  {
    id: "9",
    type: "payment",
    title: "Payment Confirmation",
    message: "Payment of ₦5,000 processing fee has been confirmed for application ABX-RENT-001.",
    timestamp: "2 weeks ago",
    read: true,
  },
  {
    id: "10",
    type: "document",
    title: "Document Required",
    message: "Please upload your Proof of Address to continue with your loan application.",
    timestamp: "2 weeks ago",
    read: true,
    actionLabel: "Upload Now",
    actionHref: "/dashboard/documents",
  },
]

const filterOptions: { label: string; value: NotificationType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Applications", value: "application" },
  { label: "Payments", value: "payment" },
  { label: "Documents", value: "document" },
  { label: "System", value: "system" },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeFilter, setActiveFilter] = useState<NotificationType | "all">("all")

  const unreadCount = notifications.filter(n => !n.read).length
  
  const filteredNotifications = notifications.filter(n => 
    activeFilter === "all" ? true : n.type === activeFilter
  )

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your loan applications and payments</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filterOptions.map((option) => {
          const count = option.value === "all" 
            ? notifications.length 
            : notifications.filter(n => n.type === option.value).length
          
          return (
            <Button
              key={option.value}
              variant={activeFilter === option.value ? "default" : "outline"}
              onClick={() => setActiveFilter(option.value)}
              size="sm"
              className="whitespace-nowrap"
            >
              {option.label} ({count})
            </Button>
          )
        })}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No notifications</h3>
          <p className="text-muted-foreground">
            {activeFilter === "all" 
              ? "You don't have any notifications yet"
              : "No notifications in this category"
            }
          </p>
        </div>
      )}
    </div>
  )
}
