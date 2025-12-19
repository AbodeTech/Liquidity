"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { CreditCard, Building2, Copy, CheckCircle, Upload, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MakePaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock active loans
const mockLoans = [
  {
    id: "ABX-RENT-001",
    type: "Rent Loan",
    pendingPayment: {
      type: "repayment",
      amount: 45000,
      dueDate: "2025-02-28",
    },
  },
  {
    id: "ABX-LAND-002",
    type: "Land Loan",
    pendingPayment: {
      type: "deposit",
      amount: 305000, // 300k deposit + 5k processing fee
      dueDate: "2025-02-15",
    },
  },
]

export function MakePaymentModal({ open, onOpenChange }: MakePaymentModalProps) {
  const [selectedLoan, setSelectedLoan] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const selectedLoanData = mockLoans.find((loan) => loan.id === selectedLoan)
  const paymentAmount = selectedLoanData?.pendingPayment.amount || 0

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("0123456789")
    toast.success("Copied!", {
      description: "Account number copied to clipboard",
    })
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Mock payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    toast.success("Payment Successful!", {
      description: `Your payment of ₦${paymentAmount.toLocaleString()} has been processed.`,
    })
    onOpenChange(false)

    // Reset form
    setSelectedLoan("")
    setPaymentMethod("card")
    setCardNumber("")
    setExpiryDate("")
    setCvv("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
          <DialogDescription>Select a loan and payment method to continue</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Select Loan */}
          <div className="space-y-2">
            <Label>Select Loan</Label>
            <Select value={selectedLoan} onValueChange={setSelectedLoan}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a loan to pay for" />
              </SelectTrigger>
              <SelectContent>
                {mockLoans.map((loan) => (
                  <SelectItem key={loan.id} value={loan.id}>
                    {loan.id} - {loan.type} (₦{loan.pendingPayment.amount.toLocaleString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLoanData && (
            <>
              {/* Payment Summary */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loan Reference:</span>
                      <span className="font-medium">{selectedLoanData.id}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Type:</span>
                      <span className="font-medium capitalize">
                        {selectedLoanData.pendingPayment.type === "deposit"
                          ? "Processing Fee + 20% Deposit"
                          : "Monthly Repayment"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="font-medium">
                        {new Date(selectedLoanData.pendingPayment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="font-bold text-lg">₦{paymentAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "card" | "transfer")}
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Pay with Card</div>
                          <div className="text-xs text-muted-foreground">Instant payment via debit/credit card</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-xs text-muted-foreground">Transfer to our account and upload proof</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Details */}
              {paymentMethod === "transfer" && (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Building2 className="w-4 h-4" />
                        Transfer to this account
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bank Name:</span>
                          <span className="font-medium">GTBank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Account Name:</span>
                          <span className="font-medium">Liquide Microfinance</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Account Number:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium">0123456789</span>
                            <Button variant="ghost" size="sm" onClick={handleCopyAccountNumber} className="h-6 w-6 p-0">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reference:</span>
                          <span className="font-mono font-medium text-xs">{selectedLoan}-PAY</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Label>Upload Proof of Payment</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 cursor-pointer transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload receipt or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (max 5MB)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing || !selectedLoan} className="flex-1">
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {paymentMethod === "card" ? "Pay Now" : "Submit Payment"}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
