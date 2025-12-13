import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Liquidity
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Liquidity. These Terms and Conditions govern your use of our micro-mortgage platform and
              services. By accessing or using our services, you agree to be bound by these terms. If you do not agree
              with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">To be eligible for our services, you must:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Be at least 18 years of age</li>
              <li>Be a Nigerian citizen or resident</li>
              <li>Have a valid means of identification (BVN, NIN, or International Passport)</li>
              <li>Have a verifiable source of income</li>
              <li>Provide accurate and complete information during the application process</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Loan Application and Approval</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">When you submit a loan application:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>All information provided must be accurate and truthful</li>
              <li>We reserve the right to verify all information provided</li>
              <li>Loan approval is at our sole discretion based on our assessment criteria</li>
              <li>We aim to process applications within 24 hours but do not guarantee approval timeframes</li>
              <li>Approved loans require payment of a non-refundable processing fee of ₦5,000</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Loan Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Rent Loans</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Loan Amount: ₦500,000 to ₦5,000,000</li>
                  <li>Tenure: 12 months</li>
                  <li>Interest Rate: 20% flat per annum</li>
                  <li>Required Deposit: 20% of total rent amount</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">4.2 Land Loans</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Loan Amount: ₦2,000,000 to ₦10,000,000</li>
                  <li>Tenure: 12, 24, or 36 months</li>
                  <li>Interest Rate: 20% flat per annum</li>
                  <li>Required Deposit: 20% of total land amount</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Repayment</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Borrowers agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Make monthly repayments on the agreed schedule</li>
              <li>Ensure sufficient funds are available for automatic deductions</li>
              <li>Notify us immediately of any payment difficulties</li>
              <li>Understand that late payments may incur additional fees and affect credit standing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Default and Consequences</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">In the event of default or late payment:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>A late payment fee of 5% of the outstanding amount will be charged</li>
              <li>Your account may be reported to credit bureaus</li>
              <li>We may take legal action to recover outstanding debts</li>
              <li>Future loan applications may be declined</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to protecting your personal information. By using our services, you consent to the
              collection, use, and storage of your data as outlined in our Privacy Policy. We implement
              industry-standard security measures to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Disbursement</h2>
            <p className="text-muted-foreground leading-relaxed">
              Upon loan approval and receipt of the required deposit and processing fee, funds will be disbursed
              directly to the landlord or developer within 2-3 business days. We do not disburse funds directly to
              borrowers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modification of Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes
              arising from these terms will be resolved in the courts of Nigeria.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions or concerns about these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-4 text-muted-foreground">
              <p>Email: support@liquidity.ng</p>
              <p>Phone: +234 XXX XXX XXXX</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            By using Liquidity&apos;s services, you acknowledge that you have read, understood, and agree to these Terms and
            Conditions.
          </p>
          <Button asChild>
            <Link href="/apply">Accept and Apply Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
