"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Invalid email format")
      return
    }

    setLoading(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSuccess(true)
  }

  const handleResend = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/modern-nigerian-luxury-apartments-at-sunset.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-white">
              Liquidity
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>
                We&apos;ve sent password reset instructions to
                <br />
                <span className="font-medium text-foreground">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Click the link in the email to reset your password. If you don&apos;t see it, check your spam folder.
              </p>

              <Button asChild className="w-full">
                <Link href="/login">Back to Login</Link>
              </Button>

              <div className="text-center">
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-sm text-primary hover:underline font-medium disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Didn't receive it? Resend"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/modern-nigerian-luxury-apartments-at-sunset.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white">
            Liquidity
          </Link>
        </div>

        <Card>
          <CardHeader>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>Enter your email address and we&apos;ll send you a link to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? "border-red-500 pl-10" : "pl-10"}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
