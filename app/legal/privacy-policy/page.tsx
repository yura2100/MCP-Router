import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 7, 2025</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            MCP Router ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
            we collect, use, disclose, and safeguard your information when you use our MCP Router service ("Service").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have
            read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Create an account</li>
            <li>Use our Service</li>
            <li>Contact our support team</li>
            <li>Subscribe to our newsletters</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Company information</li>
            <li>Payment information</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We automatically collect certain information when you visit, use, or navigate our Service. This information
            does not reveal your specific identity but may include:
          </p>
          <ul>
            <li>Device and browser information</li>
            <li>IP address</li>
            <li>Usage patterns and preferences</li>
            <li>Referring website</li>
            <li>Pages viewed</li>
          </ul>

          <h3>MCP Server Data</h3>
          <p>
            When you use our Service to manage Model Context Protocol (MCP) servers, we collect information about your
            servers, including:
          </p>
          <ul>
            <li>Server configurations</li>
            <li>Connection settings</li>
            <li>Usage statistics</li>
            <li>Performance metrics</li>
          </ul>
          <p>
            We do not access or store the actual data that flows through your MCP servers unless specifically required
            for troubleshooting purposes and with your explicit consent.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Provide, maintain, and improve our Service</li>
            <li>Process transactions and manage your account</li>
            <li>Send administrative information, such as updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor usage patterns and analyze trends</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your information with third-party vendors,
              consultants, and other service providers who need access to such information to carry out work on our
              behalf.
            </li>
            <li>
              <strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or
              during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion
              of our business.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your
              consent.
            </li>
            <li>
              <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will
              require those affiliates to honor this Privacy Policy.
            </li>
            <li>
              <strong>With Business Partners:</strong> We may share your information with our business partners to offer
              you certain products, services, or promotions.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in
              response to valid requests by public authorities.
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the
            security of any personal information we process. However, despite our safeguards and efforts to secure your
            information, no electronic transmission over the Internet or information storage technology can be
            guaranteed to be 100% secure.
          </p>

          <h2>Your Data Protection Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>The right to access information we have about you</li>
            <li>The right to request correction of your personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@mcprouter.com">privacy@mcprouter.com</a>.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our Service is not directed to anyone under the age of 18. We do not knowingly collect personal information
            from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact us.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@mcprouter.com">privacy@mcprouter.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

