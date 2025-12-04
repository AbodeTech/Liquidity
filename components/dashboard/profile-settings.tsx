"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { Upload } from 'lucide-react'

export function ProfileSettings() {
  const [formData, setFormData] = useState({
    fullName: "John Adebayo",
    email: "john.adebayo@example.com",
    phone: "+234 803 123 4567",
    dateOfBirth: "1990-01-15",
    gender: "male",
    maritalStatus: "single",
    address: "45 Lagos Street, Ikeja",
    city: "Lagos",
    state: "Lagos",
    postalCode: "100001",
    employmentStatus: "employed",
    employerName: "Tech Solutions Ltd",
    jobTitle: "Software Engineer",
    monthlyIncome: "500000-1000000",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile updated", {
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Photo */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="text-lg">JA</AvatarFallback>
          </Avatar>
          <div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-2">JPG or PNG. Max size 2MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger id="gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}>
                <SelectTrigger id="maritalStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Your residential address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger id="state">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lagos">Lagos</SelectItem>
                  <SelectItem value="Abuja">Abuja</SelectItem>
                  <SelectItem value="Kano">Kano</SelectItem>
                  <SelectItem value="Rivers">Rivers</SelectItem>
                  <SelectItem value="Oyo">Oyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employment */}
      <Card>
        <CardHeader>
          <CardTitle>Employment Information</CardTitle>
          <CardDescription>Your employment or business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select value={formData.employmentStatus} onValueChange={(value) => setFormData({ ...formData, employmentStatus: value })}>
                <SelectTrigger id="employmentStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-Employed</SelectItem>
                  <SelectItem value="business-owner">Business Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employerName">Employer / Business Name</Label>
              <Input
                id="employerName"
                value={formData.employerName}
                onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income Range</Label>
              <Select value={formData.monthlyIncome} onValueChange={(value) => setFormData({ ...formData, monthlyIncome: value })}>
                <SelectTrigger id="monthlyIncome">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100000">₦0 - ₦100,000</SelectItem>
                  <SelectItem value="100000-250000">₦100,000 - ₦250,000</SelectItem>
                  <SelectItem value="250000-500000">₦250,000 - ₦500,000</SelectItem>
                  <SelectItem value="500000-1000000">₦500,000 - ₦1,000,000</SelectItem>
                  <SelectItem value="1000000+">₦1,000,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}
