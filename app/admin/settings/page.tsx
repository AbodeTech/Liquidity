"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { UserPlus, Trash2, Mail } from "lucide-react"
import { toast } from "sonner"

// Mock data
const admins = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@liquidity.ng",
    dateAdded: "2024-01-01",
    status: "active",
    isCurrentUser: true,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@liquidity.ng",
    dateAdded: "2024-01-10",
    status: "active",
    isCurrentUser: false,
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@liquidity.ng",
    dateAdded: "2024-01-12",
    status: "active",
    isCurrentUser: false,
  },
]

export default function AdminSettingsPage() {
  const [inviteEmail, setInviteEmail] = useState("")
  const [isInviting, setIsInviting] = useState(false)
  const [adminToRemove, setAdminToRemove] = useState<string | null>(null)

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsInviting(true)

    // Mock invite - UI only
    setTimeout(() => {
      setIsInviting(false)
      toast.success(`Invitation sent to ${inviteEmail}`)
      setInviteEmail("")
    }, 1000)
  }

  const handleRemoveAdmin = (adminId: string) => {
    // Mock remove - UI only
    toast.success("Admin removed successfully")
    setAdminToRemove(null)
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage admin users and account settings</p>
        </div>

        {/* Invite Admin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Invite New Admin
            </CardTitle>
            <CardDescription>Send an invitation to add a new administrator to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="invite-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isInviting} className="gap-2">
                <Mail className="h-4 w-4" />
                {isInviting ? "Sending..." : "Send Invitation"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Active Admins */}
        <Card>
          <CardHeader>
            <CardTitle>Active Administrators</CardTitle>
            <CardDescription>Manage existing admin users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {admins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{admin.name}</p>
                      {admin.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{admin.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Added on {new Date(admin.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700">
                      {admin.status}
                    </Badge>
                    {!admin.isCurrentUser && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAdminToRemove(admin.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Account */}
        <Card>
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
            <CardDescription>Manage your admin account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value="admin@liquidity.ng" disabled />
            </div>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>
      </div>

      {/* Remove Admin Confirmation Dialog */}
      <AlertDialog open={!!adminToRemove} onOpenChange={() => setAdminToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Administrator</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this administrator? They will lose access to the admin dashboard
              immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => adminToRemove && handleRemoveAdmin(adminToRemove)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove Admin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
