import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Target, Eye, Users } from "lucide-react"

export default function AboutPage() {
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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Liquidity</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We&apos;re on a mission to make property ownership accessible to every Nigerian through innovative micro-mortgage
            solutions.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Liquidity was founded with a simple belief: everyone deserves access to affordable housing finance. In
              Nigeria, where over 60% of urban residents struggle to afford annual rent payments upfront, we saw an
              opportunity to make a real difference.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our team of financial technology experts and housing advocates came together to create a platform that
              breaks down barriers to property ownership. Whether it&apos;s helping young professionals pay their rent
              monthly or enabling families to purchase land for their dream homes, we&apos;re committed to providing
              flexible, transparent, and accessible financial solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we&apos;ve helped over 1,200 Nigerians achieve their property goals, disbursing over ₦500 million in
              loans. But we&apos;re just getting started. Our vision is to become Nigeria&apos;s most trusted micro-mortgage
              platform, empowering millions to achieve their property ownership dreams.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize access to property financing by providing affordable, flexible micro-mortgage solutions
                  to all Nigerians.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become Nigeria&apos;s most trusted micro-mortgage platform, empowering millions to achieve their
                  property ownership dreams.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">People First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We put our customers at the heart of everything we do, ensuring transparency, fairness, and
                  exceptional service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">₦500M+</div>
              <div className="text-sm text-muted-foreground">Loans Disbursed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">Customers Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
              <div className="text-sm text-muted-foreground">Avg Approval Time</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Journey</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking to finance your rent or purchase land, we&apos;re here to support you every step of the
            way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/apply">Start Your Application</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/calculator">Calculate Your Loan</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
