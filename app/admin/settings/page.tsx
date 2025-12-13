"use client"

import type React from "react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { UserPlus, Mail } from "lucide-react"
import { toast } from "sonner"

import { useMutation } from "@tanstack/react-query"
import { adminAuthService } from "@/lib/services/admin/authService"



import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const inviteSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type InviteFormValues = z.infer<typeof inviteSchema>

export default function AdminSettingsPage() {


  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const inviteMutation = useMutation({
    mutationFn: adminAuthService.inviteUser,
    onSuccess: (_, variables) => {
      toast.success(`Invitation sent to ${variables.email}`)
      form.reset()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send invitation")
    },
  })

  const onSubmit = (data: InviteFormValues) => {
    inviteMutation.mutate(data)
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 items-start">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <Label className="sr-only">Name</Label>
                      <FormControl>
                        <Input placeholder="Admin Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <Label className="sr-only">Email address</Label>
                      <FormControl>
                        <Input placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={inviteMutation.isPending} className="gap-2 mt-0">
                  <Mail className="h-4 w-4" />
                  {inviteMutation.isPending ? "Sending..." : "Send Invitation"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Active Admins */}
        {/* <Card>
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
        </Card> */}

        {/* Your Account */}
        {/* <Card>
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
        </Card> */}
      </div>

      {/* Remove Admin Confirmation Dialog */}
      {/* <AlertDialog open={!!adminToRemove} onOpenChange={() => setAdminToRemove(null)}>
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
      </AlertDialog> */}
    </AdminLayout>
  )
}
