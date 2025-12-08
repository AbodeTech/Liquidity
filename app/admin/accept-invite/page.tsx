"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Building2, Loader2 } from "lucide-react"
import { adminAuthService } from "@/lib/services/admin/authService"
import { toast } from "sonner"

const acceptInviteSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type AcceptInviteFormValues = z.infer<typeof acceptInviteSchema>

function AcceptInviteForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const form = useForm<AcceptInviteFormValues>({
    resolver: zodResolver(acceptInviteSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const acceptMutation = useMutation({
    mutationFn: adminAuthService.acceptInvitation,
    onSuccess: () => {
      toast.success("Invitation accepted successfully. Please login.")
      router.push("/admin/login")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to accept invitation")
    },
  })

  const onSubmit = (data: AcceptInviteFormValues) => {
    if (!token) {
      toast.error("Invalid invitation token")
      return
    }
    acceptMutation.mutate({ token, password: data.password })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={acceptMutation.isPending}>
          {acceptMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting Password...
            </>
          ) : (
            "Set Password & Login"
          )}
        </Button>
      </form>
    </Form>
  )
}

export default function AdminAcceptInvitePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Liquidity</span>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Accept Invitation</CardTitle>
            <CardDescription>Set your password to complete your account setup</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>}>
            <AcceptInviteForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
