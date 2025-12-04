'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'
import { OTPInput } from '@/components/auth/otp-input'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Get email from localStorage
    const pendingEmail = localStorage.getItem('pendingEmail')
    if (pendingEmail) {
      setEmail(pendingEmail)
    } else {
      // Redirect to signup if no email found
      router.push('/signup')
    }
  }, [router])

  useEffect(() => {
    // Countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  useEffect(() => {
    // Auto-submit when OTP is complete
    if (otp.length === 6) {
      handleVerify()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])

  const handleVerify = async () => {
    setLoading(true)
    setError('')

    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock validation - accept any 6 digit code
    if (otp.length === 6) {
      localStorage.removeItem('pendingEmail')
      localStorage.setItem('verificationSuccess', 'true')
      setLoading(false)
      router.push('/login')
    } else {
      setError('Invalid verification code')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    setTimer(60)
    setError('')

    // Mock resend API call
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/modern-nigerian-apartment-buildings-with-balconies.jpg')`
        }}
      />
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white">
            Abodex
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent a 6-digit code to<br />
              <span className="font-medium text-white">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* OTP Input */}
              <div className="space-y-2">
                <OTPInput value={otp} onChange={setOtp} disabled={loading} />
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>

              {/* Verify Button */}
              <Button
                onClick={handleVerify}
                className="w-full"
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </Button>

              {/* Resend Code */}
              <div className="text-center text-sm">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-primary hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                ) : (
                  <p className="text-muted-foreground">
                    Resend code in {timer}s
                  </p>
                )}
              </div>

              {/* Back Link */}
              <div className="text-center">
                <Link
                  href="/signup"
                  className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Didn&apos;t receive the email? Check your spam folder or try again.
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
