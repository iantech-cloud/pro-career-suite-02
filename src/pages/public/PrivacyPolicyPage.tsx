import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white">Legal</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Your Privacy Matters</CardTitle>
            <CardDescription>
              At CareerSuite, we are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Name, email address, and contact information</li>
                    <li>Professional information (work experience, education, skills)</li>
                    <li>Profile pictures and other uploaded content</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>How you interact with our platform</li>
                    <li>Features you use and pages you visit</li>
                    <li>Time spent on different sections</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To personalize your experience and improve our platform</li>
                <li>To communicate with you about updates, security alerts, and support</li>
                <li>To process payments and prevent fraud</li>
                <li>To analyze usage patterns and optimize our services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
                <li><strong>Service providers:</strong> With trusted partners who help us operate our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In case of merger, acquisition, or asset sale</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication protocols</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Essential cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can control cookie settings through your browser or our cookie preference center.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our platform integrates with third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Social Media Platforms:</strong> For publishing and analytics</li>
                <li><strong>Job Boards:</strong> For aggregating job listings</li>
                <li><strong>Payment Processors:</strong> For secure payment handling</li>
                <li><strong>AI Services:</strong> For content enhancement features</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                These services have their own privacy policies, which we encourage you to review.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal information only as long as necessary to provide our services and comply with legal obligations. 
                When you delete your account, we will delete or anonymize your personal information within 30 days, 
                except where we are required to retain it for legal or regulatory purposes.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. International Transfers</h2>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data, including standard contractual 
                clauses and adequacy decisions by relevant authorities.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for children under 16 years of age. We do not knowingly collect 
                personal information from children under 16. If we become aware that we have collected personal 
                information from a child under 16, we will take steps to delete such information.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. For significant changes, 
                we will provide additional notice through email or platform notifications.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Email:</strong> privacy@careersuite.com<br/>
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

export default PrivacyPage;