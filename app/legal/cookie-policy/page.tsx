import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CookiePolicyPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 7, 2025</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            This Cookie Policy explains how MCP Router ("we", "us", or "our") uses cookies and similar technologies on
            our website and the MCP Router service (collectively, the "Service"). This Cookie Policy should be read
            together with our Privacy Policy and Terms of Service.
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the owners of the
            site.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go
            offline, while session cookies are deleted as soon as you close your web browser.
          </p>

          <h2>How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the Service to function properly. They enable core functionality such as
            security, network management, and account authentication. You cannot opt out of these cookies.
          </p>
          <p>Examples of essential cookies we use:</p>
          <ul>
            <li>Authentication cookies to identify you when you log into our Service</li>
            <li>Security cookies to prevent fraud and protect our Service</li>
            <li>Session state cookies to remember your preferences during your current visit</li>
          </ul>

          <h3>Performance and Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our Service by collecting and reporting
            information anonymously. They help us improve the quality and performance of our Service.
          </p>
          <p>Examples of performance and analytics cookies we use:</p>
          <ul>
            <li>Google Analytics cookies to track user engagement and usage patterns</li>
            <li>Load balancing cookies to distribute traffic to the Service across different servers</li>
            <li>Error monitoring cookies to track errors and improve site stability</li>
          </ul>

          <h3>Functionality Cookies</h3>
          <p>
            These cookies allow the Service to remember choices you make and provide enhanced, personalized features.
            They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          <p>Examples of functionality cookies we use:</p>
          <ul>
            <li>Preference cookies to remember your settings and preferences</li>
            <li>Language cookies to remember your language preference</li>
            <li>Theme cookies to remember your display preferences (e.g., dark mode)</li>
          </ul>

          <h3>Targeting and Advertising Cookies</h3>
          <p>
            These cookies are used to track your browsing habits to enable us to show advertising which is more likely
            to be of interest to you. They are also used to limit the number of times you see an advertisement and help
            measure the effectiveness of advertising campaigns.
          </p>
          <p>Examples of targeting and advertising cookies we use:</p>
          <ul>
            <li>Social media cookies to enable you to share content on social networks</li>
            <li>Advertising cookies from our advertising partners</li>
            <li>Retargeting cookies to show you relevant advertisements based on your interests</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
            deliver advertisements, and so on.
          </p>
          <p>Third-party services we use that may place cookies on your device include:</p>
          <ul>
            <li>Google Analytics for website analytics</li>
            <li>Stripe for payment processing</li>
            <li>Intercom for customer support</li>
            <li>HubSpot for marketing and analytics</li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the
            ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be
            personalized to you.
          </p>
          <p>Here's how you can manage cookies in different browsers:</p>
          <ul>
            <li>
              <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
            </li>
          </ul>

          <h2>Cookie Consent</h2>
          <p>
            When you first visit our Service, you will be shown a cookie banner requesting your consent to set
            non-essential cookies. You can change your cookie preferences at any time by clicking on the "Cookie
            Settings" link in the footer of our website.
          </p>

          <h2>Do Not Track</h2>
          <p>
            Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your
            online activities tracked. We currently do not respond to "Do Not Track" signals.
          </p>

          <h2>Changes to This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the "Last updated" date.
          </p>
          <p>
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are
            effective when they are posted on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at{" "}
            <a href="mailto:privacy@mcprouter.com">privacy@mcprouter.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

