import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Liquide
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Liquide, we are committed to protecting your privacy and personal information. This Privacy Policy
              explains how we collect, use, store, and protect your data when you use our micro-mortgage platform and
              services. By using Liquide, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2.1 Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  We collect the following personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Full name, date of birth, and gender</li>
                  <li>Contact information (email, phone number, address)</li>
                  <li>Identification documents (BVN, NIN, International Passport)</li>
                  <li>Employment information and income details</li>
                  <li>Bank account information</li>
                  <li>Property information (for loan applications)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2.2 Financial Information</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Bank statements and salary slips</li>
                  <li>Credit history and credit scores</li>
                  <li>Loan application details and repayment history</li>
                  <li>Transaction data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">2.3 Technical Information</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Process and evaluate loan applications</li>
              <li>Verify your identity and prevent fraud</li>
              <li>Manage loan accounts and process repayments</li>
              <li>Communicate with you about your account and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and user experience</li>
              <li>Conduct risk assessment and credit checks</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Credit bureaus for credit checks and reporting</li>
              <li>Financial institutions for payment processing</li>
              <li>Legal and regulatory authorities when required by law</li>
              <li>Service providers who assist in our operations (under strict confidentiality agreements)</li>
              <li>Landlords or developers for loan disbursement purposes</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We do not sell your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure servers with regular security audits</li>
              <li>Access controls and authentication protocols</li>
              <li>Regular security training for our staff</li>
              <li>Monitoring systems to detect and prevent unauthorized access</li>
            </ul>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal
              information. However, please note that no method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with legal
              obligations. After your loan is fully repaid, we may retain certain information for up to 7 years as
              required by Nigerian financial regulations. You may request deletion of your data, subject to our legal
              and regulatory obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Access your personal information held by us</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Object to processing of your data for marketing purposes</li>
              <li>Withdraw consent for data processing (where applicable)</li>
              <li>Lodge a complaint with the Nigeria Data Protection Bureau</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver
              personalized content. You can control cookie settings through your browser preferences. However, disabling
              cookies may affect the functionality of our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform may contain links to third-party websites. We are not responsible for the privacy practices
              of these external sites. We encourage you to review their privacy policies before providing any personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal
              information from children. If we become aware that we have collected data from a child, we will take steps
              to delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="text-muted-foreground space-y-1">
              <p>Email: privacy@liquide.ng</p>
              <p>Phone: +234 XXX XXX XXXX</p>
              <p>Address: [Company Address]</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy is designed to comply with the Nigeria Data Protection Regulation (NDPR) and other
              applicable data protection laws. We are committed to protecting your privacy and handling your data
              responsibly.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            By using Liquide&apos;s services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
          <Button asChild>
            <Link href="/dashboard/apply">Continue to Application</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
