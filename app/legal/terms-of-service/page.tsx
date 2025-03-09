import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Terms of Service</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 7, 2025</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the MCP Router service ("Service")
            operated by MCP Router ("we," "us," or "our"). Please read these Terms carefully before using our Service.
          </p>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of
            the Terms, you may not access the Service.
          </p>

          <h2>Subscription and Payments</h2>
          <p>
            Some features of our Service require a subscription. When you subscribe to our Service, you agree to pay the
            subscription fees indicated for your selected plan. Subscription fees are billed in advance on a monthly or
            annual basis, depending on your chosen billing cycle.
          </p>
          <p>
            You authorize us to charge your designated payment method for all subscription fees incurred by your
            account. If your payment cannot be completed, we may suspend or terminate your access to the Service.
          </p>
          <p>
            Subscription fees are non-refundable except as required by law or as explicitly stated in these Terms. You
            may cancel your subscription at any time, but no refunds will be provided for any unused portion of your
            current billing period.
          </p>

          <h2>Use of the Service</h2>
          <h3>Account Registration</h3>
          <p>
            To use certain features of the Service, you may need to create an account. You are responsible for
            maintaining the confidentiality of your account credentials and for all activities that occur under your
            account.
          </p>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information when creating your account</li>
            <li>Update your information as necessary to keep it current</li>
            <li>Notify us immediately of any unauthorized access to or use of your account</li>
            <li>Ensure that you exit from your account at the end of each session</li>
          </ul>

          <h3>Acceptable Use</h3>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit any material that is harmful, threatening, abusive, or otherwise objectionable</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Collect or track personal information of other users</li>
            <li>Engage in any activity that could harm our systems or other users</li>
          </ul>

          <h3>MCP Server Management</h3>
          <p>Our Service allows you to manage Model Context Protocol (MCP) servers. You are solely responsible for:</p>
          <ul>
            <li>The configuration and operation of your MCP servers</li>
            <li>Ensuring that your use of MCP servers complies with all applicable laws and regulations</li>
            <li>Securing appropriate permissions for any data processed through your MCP servers</li>
            <li>Implementing appropriate security measures to protect your data</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of MCP Router and its licensors. The Service is protected by copyright, trademark, and other laws of both
            the United States and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior
            written consent of MCP Router.
          </p>

          <h2>User Content</h2>
          <p>
            You retain all rights to any content you submit, post, or display on or through the Service ("User
            Content"). By providing User Content to the Service, you grant us a worldwide, non-exclusive, royalty-free
            license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection
            with the Service.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>You own or have the necessary rights to use and authorize us to use your User Content</li>
            <li>
              Your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or
              any other rights of any person or entity
            </li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, in no event shall MCP Router, its directors, employees, partners,
            agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive
            damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
            resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
            basis. The Service is provided without warranties of any kind, whether express or implied, including, but
            not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement,
            or course of performance.
          </p>
          <p>
            MCP Router does not warrant that the Service will function uninterrupted, secure, or available at any
            particular time or location, or that any errors or defects will be corrected.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard
            to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
            provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
            will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@mcprouter.com">legal@mcprouter.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

