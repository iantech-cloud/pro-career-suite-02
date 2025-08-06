import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white">Legal</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
            <CardDescription>
              Please read these Terms of Service carefully before using CareerSuite. 
              By accessing or using our services, you agree to be bound by these terms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using CareerSuite ("Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                CareerSuite provides an integrated platform offering:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>AI-powered CV and résumé building tools</li>
                <li>Social media publishing and scheduling services</li>
                <li>Remote job aggregation and search capabilities</li>
                <li>Professional networking and career development resources</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Registration</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>You must provide accurate and complete information during registration</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must be at least 16 years old to create an account</li>
                    <li>One person or legal entity may maintain no more than one account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>You are responsible for all activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Use strong passwords and enable two-factor authentication when available</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Subscription Plans and Billing</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Plan Types</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Free Plan:</strong> Limited features with usage restrictions</li>
                    <li><strong>Pro Plan:</strong> Full feature access with monthly billing</li>
                    <li><strong>Enterprise Plan:</strong> Advanced features for teams and organizations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Billing Terms</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Subscriptions are billed monthly or annually in advance</li>
                    <li>All fees are non-refundable except as required by law</li>
                    <li>We may change pricing with 30 days' notice</li>
                    <li>You can cancel your subscription at any time</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Create multiple accounts to circumvent usage limits</li>
                <li>Use automated tools to scrape or extract data</li>
                <li>Share your account credentials with others</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Content and Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Content</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>You retain ownership of content you create and upload</li>
                    <li>You grant us a license to use your content to provide our services</li>
                    <li>You are responsible for ensuring you have rights to all content you upload</li>
                    <li>You must not upload copyrighted material without permission</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Our Content</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>All service features, templates, and designs are our intellectual property</li>
                    <li>You may not copy, modify, or distribute our proprietary content</li>
                    <li>Our trademarks and logos may not be used without permission</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our platform integrates with various third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Social media platforms for publishing content</li>
                <li>Job boards for aggregating listings</li>
                <li>Payment processors for handling transactions</li>
                <li>AI services for content enhancement</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Your use of these integrated services is subject to their respective terms of service and privacy policies.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
              <p className="text-muted-foreground">
                Your privacy is important to us. Our collection and use of personal information is governed by our 
                Privacy Policy, which is incorporated into these Terms by reference. By using our service, you consent 
                to our data practices as described in the Privacy Policy.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Service Availability</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service</li>
                <li>Scheduled maintenance may temporarily affect service availability</li>
                <li>We reserve the right to modify or discontinue features with notice</li>
                <li>Force majeure events may impact service delivery</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We provide the service "as is" without warranties of any kind</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the amount you paid in the past 12 months</li>
                <li>We are not responsible for third-party actions or content</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">By You</h3>
                  <p className="text-muted-foreground">
                    You may terminate your account at any time by contacting support or using account settings. 
                    Subscription fees are non-refundable.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">By Us</h3>
                  <p className="text-muted-foreground">
                    We may suspend or terminate your account for violation of these terms, non-payment, 
                    or other reasons with appropriate notice when possible.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective upon posting 
                to this page with an updated effective date. Continued use of the service after changes constitutes 
                acceptance of the new terms.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms are governed by the laws of the State of California, USA, without regard to conflict 
                of law provisions. Any disputes will be resolved through binding arbitration in San Francisco, California.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Email:</strong> legal@careersuite.com<br/>
                  <strong>Address:</strong> 123 Business Ave, Suite 100, San Francisco, CA 94105<br/>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;