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
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { userAuthService } from "@/lib/services/user/authService"
import { auth } from "@/lib/auth"
import { toast } from "sonner"
import { useUserProfile } from "@/lib/store/userProfile"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { setUser } = useUserProfile()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const loginMutation = useMutation({
    mutationFn: userAuthService.login,
    onSuccess: (response) => {
      const token = response.data?.access_token
      const user = response.data?.user

      if (token) {
        auth.setToken(token)
        if (user) {
          setUser(user)
        }
        toast.success("Login successful")
        router.push("/dashboard")
      } else {
        toast.error("Login successful but no token received")
      }
    },
    onError: (error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const message = error.response?.data?.message || "Login failed. Please check your credentials."
      toast.error(message)
    },
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#fafaf8] overflow-hidden">
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a4d3e]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="w-full max-w-[420px] relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <div className="relative h-12 w-48">
              <Image
                src="/LIQUIDELogo.png"
                alt="Liquide Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-4xl shadow-2xl shadow-[#1a4d3e]/10 border border-[#e5e5e5] p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-2">Welcome Back</h1>
            <p className="text-[#666666] text-sm">Enter your credentials to access your dashboard</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1a1a1a] font-medium">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-11 pr-10 h-12 bg-white border-[#e5e5e5] focus-visible:ring-[#1a4d3e] focus-visible:border-[#1a4d3e] rounded-xl text-base"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1a4d3e] transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-[#e5e5e5] data-[state=checked]:bg-[#1a4d3e] data-[state=checked]:border-[#1a4d3e]"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium text-[#666666] cursor-pointer">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link href="/forgot-password" className="text-sm font-semibold text-[#1a4d3e] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#1a4d3e] hover:bg-[#153d32] text-white font-semibold text-base shadow-lg shadow-[#1a4d3e]/20 transition-all hover:-translate-y-0.5"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-[#666666] mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#1a4d3e] hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}