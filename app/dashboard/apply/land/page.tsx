
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function DashboardLandLoanPage() {
  const router = useRouter()



  useEffect(() => {
    router.replace("/apply/land")
  }, [router])

  return null
}
