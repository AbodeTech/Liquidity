"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { useState } from "react"
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { userAuthService } from "@/lib/services/user/authService"
import { toast } from "sonner"
import Image from "next/image"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: userAuthService.forgotPassword,
    onSuccess: () => {
      setSuccess(true)
      toast.success("Reset link sent successfully")
    },
    onError: (error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const message = error.response?.data?.message || "Failed to send reset link. Please try again."
      toast.error(message)
    },
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    setSubmittedEmail(data.email)
    forgotPasswordMutation.mutate(data)
  }

  const handleResend = () => {
    if (submittedEmail) {
      forgotPasswordMutation.mutate({ email: submittedEmail })
    }
  }

  // --- BACKGROUND COMPONENT (Reused) ---
  const Background = () => (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a4d3e]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
    </div>
  )

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#fafaf8]">
        <Background />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <div className="relative h-12 w-48">
                <Image src="/LIQUIDELogo.png" alt="Liquide Logo" fill className="object-contain" priority />
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-4xl shadow-2xl shadow-[#1a4d3e]/10 border border-[#e5e5e5] p-8 md:p-10 text-center">
            <div className="mx-auto w-14 h-14 bg-[#ecfdf5] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="h-7 w-7 text-[#10b981]" />
            </div>

            <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Check Your Email</h1>
            <p className="text-[#666666] leading-relaxed mb-8">
              We&apos;ve sent password reset instructions to<br />
              <span className="font-bold text-[#1a1a1a]">{submittedEmail}</span>
            </p>

            <Button asChild className="w-full h-12 rounded-xl bg-[#1a4d3e] hover:bg-[#153d32] text-white font-semibold shadow-lg shadow-[#1a4d3e]/20 transition-all hover:-translate-y-0.5 mb-6">
              <Link href="/login">Back to Login</Link>
            </Button>

            <button
              onClick={handleResend}
              disabled={forgotPasswordMutation.isPending}
              className="text-sm font-medium text-[#1a4d3e] hover:underline disabled:opacity-50"
              type="button"
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Didn't receive it? Resend"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#fafaf8]">
      <Background />

      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <div className="relative h-12 w-48">
              <Image src="/LIQUIDELogo.png" alt="Liquide Logo" fill className="object-contain" priority />
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-4xl shadow-2xl shadow-[#1a4d3e]/10 border border-[#e5e5e5] p-8 md:p-10">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#1a4d3e] mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-2">Reset Password</h1>
            <p className="text-[#666666] text-sm">Enter your email and we&apos;ll send you instructions</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1a1a1a] font-medium">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
                        <Input
                          placeholder="you@example.com"
                          className="pl-11 h-12 bg-white border-[#e5e5e5] focus-visible:ring-[#1a4d3e] focus-visible:border-[#1a4d3e] rounded-xl text-base"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#1a4d3e] hover:bg-[#153d32] text-white font-semibold text-base shadow-lg shadow-[#1a4d3e]/20 transition-all hover:-translate-y-0.5"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}