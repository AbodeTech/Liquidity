"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Download, AlertTriangle } from 'lucide-react'
import Link from "next/link"

export function AccountManagement() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")

  const handleDownloadData = () => {
    toast.info("Preparing your data", {
      description: "Your data export will be ready shortly.",
    })
  }

  const handleDeleteAccount = () => {
    if (!deletePassword) {
      toast.error("Password required", {
        description: "Please enter your password to confirm account deletion.",
      })
      return
    }

    toast.success("Account deleted", {
      description: "Your account has been permanently deleted.",
    })
    setShowDeleteDialog(false)
    setDeletePassword("")
  }

  return (
    <div className="space-y-6">
      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Account Created</span>
            <span className="font-medium">January 1, 2025</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Account Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-mono text-sm">ABX-USR-12345</span>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>Manage your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 ml-4"> {/* Added flex-1 and ml-4 for spacing */}
              <h4 className="font-medium">Download Your Data</h4>
              <p className="text-sm text-muted-foreground">Export all your account data as a ZIP file</p>
            </div>
            <Button onClick={handleDownloadData} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="pt-4 space-y-2">
            <Link href="/privacy" className="text-sm text-primary hover:underline block">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-primary hover:underline block">
              Terms of Service
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-destructive/10 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-destructive mb-1">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2 py-4">
            <Label htmlFor="deletePassword">Enter your password to confirm</Label>
            <Input
              id="deletePassword"
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletePassword("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
