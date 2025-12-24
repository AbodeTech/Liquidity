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
import { Loader2, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { userAuthService } from "@/lib/services/user/authService"
import { toast } from "sonner"
import { auth } from "@/lib/auth"

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().regex(/^(\+234|0)[789][01]\d{8}$/, { message: "Invalid Nigerian phone number" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  })

  const signupMutation = useMutation({
    mutationFn: userAuthService.signup,
    onSuccess: (response) => {
      if (response.data?.access_token) {
        auth.setToken(response.data.access_token)
        toast.success("Account created successfully")
        router.push("/dashboard")
      } else {
        toast.success("Account created successfully. Please log in.")
        router.push("/login")
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Registration failed. Please try again."
      toast.error(message)
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    signupMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      password: data.password,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#fafaf8] overflow-x-hidden">
      {/* --- BACKGROUND TEXTURE --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a4d3e]/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="w-full max-w-[480px] relative z-10 py-10">
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

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#1a4d3e]/10 border border-[#e5e5e5] p-6 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1a1a1a] tracking-tight mb-2">Create Account</h1>
            <p className="text-[#666666] text-sm">Join thousands of Nigerians accessing flexible finance</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1a1a1a] font-medium">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
                        <Input
                          placeholder="John Doe"
                          className="pl-11 h-12 bg-white border-[#e5e5e5] focus-visible:ring-[#1a4d3e] focus-visible:border-[#1a4d3e] rounded-xl text-base"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1a1a1a] font-medium">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
                          <Input
                            placeholder="you@email.com"
                            className="pl-11 h-12 bg-white border-[#e5e5e5] focus-visible:ring-[#1a4d3e] focus-visible:border-[#1a4d3e] rounded-xl text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1a1a1a] font-medium">Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
                          <Input
                            placeholder="080 1234 5678"
                            className="pl-11 h-12 bg-white border-[#e5e5e5] focus-visible:ring-[#1a4d3e] focus-visible:border-[#1a4d3e] rounded-xl text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1a4d3e]"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1a1a1a] font-medium">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#999999]" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-11 pr-10 h-12 bg-white border-[#e5e5e5] focus-visible:ring-[#1a4d3e] focus-visible:border-[#1a4d3e] rounded-xl text-base"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#1a4d3e]"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms */}
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-[#e5e5e5] data-[state=checked]:bg-[#1a4d3e] data-[state=checked]:border-[#1a4d3e]"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-[#666666] font-normal cursor-pointer leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#1a4d3e] font-medium hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[#1a4d3e] font-medium hover:underline">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#1a4d3e] hover:bg-[#153d32] text-white font-semibold text-base shadow-lg shadow-[#1a4d3e]/20 transition-all hover:-translate-y-0.5"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Free Account"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-[#666666] mt-8">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#1a4d3e] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}