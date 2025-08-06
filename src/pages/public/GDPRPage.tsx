import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Shield, Download, Eye, UserCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GDPRPage = () => {
  const userRights = [
    {
      icon: Eye,
      title: 'Right to Access',
      description: 'Request a copy of all personal data we hold about you',
      action: 'Request Data Export'
    },
    {
      icon: UserCheck,
      title: 'Right to Rectification',
      description: 'Correct any inaccurate or incomplete personal information',
      action: 'Update Profile'
    },
    {
      icon: AlertTriangle,
      title: 'Right to Erasure',
      description: 'Request deletion of your personal data ("right to be forgotten")',
      action: 'Delete Account'
    },
    {
      icon: Shield,
      title: 'Right to Restriction',
      description: 'Limit how we process your personal data in certain circumstances',
      action: 'Contact Support'
    },
    {
      icon: Download,
      title: 'Right to Portability',
      description: 'Export your data in a machine-readable format to transfer elsewhere',
      action: 'Export Data'
    }
  ];

  const legalBasis = [
    {
      basis: 'Consent',
      description: 'You have given clear consent for us to process your personal data for specific purposes',
      examples: [
        'Marketing communications',
        'Optional analytics tracking',
        'Social media integrations'
      ]
    },
    {
      basis: 'Contract Performance',
      description: 'Processing is necessary to perform our contract with you or to take steps before entering into a contract',
      examples: [
        'Creating and managing your account',
        'Providing CV builder services',
        'Processing payments'
      ]
    },
    {
      basis: 'Legitimate Interest',
      description: 'Processing is necessary for our legitimate interests, provided your rights are not overridden',
      examples: [
        'Improving our services',
        'Security and fraud prevention',
        'Customer support'
      ]
    },
    {
      basis: 'Legal Obligation',
      description: 'Processing is necessary to comply with legal obligations',
      examples: [
        'Tax and accounting requirements',
        'Regulatory compliance',
        'Court orders or legal processes'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white">Legal</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            GDPR Compliance
          </h1>
          <p className="text-lg text-muted-foreground">
            Your rights under the General Data Protection Regulation
          </p>
        </div>

        {/* Your Rights Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Exercise Your Rights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRights.map((right, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
                    <right.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{right.title}</CardTitle>
                  <CardDescription>{right.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    {right.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>GDPR Compliance Statement</CardTitle>
            <CardDescription>
              CareerSuite is committed to protecting your personal data and complying with the General Data Protection Regulation (GDPR).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Who We Are</h2>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground mb-2">
                  <strong>Data Controller:</strong> CareerSuite Inc.
                </p>
                <p className="text-muted-foreground mb-2">
                  <strong>Address:</strong> 123 Business Ave, Suite 100, San Francisco, CA 94105
                </p>
                <p className="text-muted-foreground mb-2">
                  <strong>Data Protection Officer:</strong> dpo@careersuite.com
                </p>
                <p className="text-muted-foreground">
                  <strong>EU Representative:</strong> CareerSuite EU Ltd., Dublin, Ireland
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Legal Basis for Processing</h2>
              <p className="text-muted-foreground mb-6">
                We process your personal data based on the following legal grounds under GDPR:
              </p>
              <div className="space-y-6">
                {legalBasis.map((basis, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">{basis.basis}</h3>
                    <p className="text-muted-foreground mb-3">{basis.description}</p>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Examples:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {basis.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Your Rights Under GDPR</h2>
              <p className="text-muted-foreground mb-4">
                As a data subject under GDPR, you have the following rights:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Information</h3>
                  <p className="text-muted-foreground">
                    You have the right to be informed about how we collect and use your personal data. 
                    This information is provided in our Privacy Policy.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Access</h3>
                  <p className="text-muted-foreground">
                    You can request a copy of all personal data we hold about you. We will provide this 
                    within one month of your request.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Rectification</h3>
                  <p className="text-muted-foreground">
                    You can ask us to correct any inaccurate or incomplete personal data we hold about you.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Erasure</h3>
                  <p className="text-muted-foreground">
                    You can request that we delete your personal data in certain circumstances, such as 
                    when it's no longer necessary for the original purpose.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Restrict Processing</h3>
                  <p className="text-muted-foreground">
                    You can ask us to limit how we use your personal data in certain situations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Data Portability</h3>
                  <p className="text-muted-foreground">
                    You can request that we provide your personal data in a machine-readable format 
                    so you can transfer it to another service.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Right to Object</h3>
                  <p className="text-muted-foreground">
                    You can object to certain types of processing, particularly for marketing purposes 
                    or legitimate interests.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Rights Related to Automated Decision Making</h3>
                  <p className="text-muted-foreground">
                    You have rights regarding automated decision-making and profiling that produces 
                    legal or significant effects.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Transfers</h2>
              <p className="text-muted-foreground mb-4">
                When we transfer your personal data outside the EU/EEA, we ensure appropriate safeguards:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>EU Commission adequacy decisions for certain countries</li>
                <li>Standard Contractual Clauses (SCCs) with service providers</li>
                <li>Binding Corporate Rules for intra-group transfers</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain personal data only as long as necessary:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Account Data:</strong> Until account deletion or 3 years after last login</li>
                <li><strong>CV Data:</strong> Until deletion by user or account termination</li>
                <li><strong>Payment Data:</strong> 7 years for tax and accounting purposes</li>
                <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                <li><strong>Support Data:</strong> 2 years after case closure</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Technical Measures</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>End-to-end encryption</li>
                    <li>Access controls and authentication</li>
                    <li>Regular security testing</li>
                    <li>Automated monitoring</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Organizational Measures</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Data protection training</li>
                    <li>Privacy by design principles</li>
                    <li>Regular compliance audits</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Breach Notification</h2>
              <p className="text-muted-foreground">
                In the event of a personal data breach that is likely to result in a high risk to your 
                rights and freedoms, we will notify you without undue delay. We will also notify the 
                relevant supervisory authority within 72 hours of becoming aware of the breach.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Supervisory Authority</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to lodge a complaint with a supervisory authority if you believe 
                we have not complied with GDPR. You can contact:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Lead Supervisory Authority:</strong> Irish Data Protection Commission<br/>
                  <strong>Website:</strong> www.dataprotection.ie<br/>
                  <strong>Email:</strong> info@dataprotection.ie<br/>
                  <strong>Phone:</strong> +353 57 868 4800
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Our DPO</h2>
              <p className="text-muted-foreground mb-4">
                For any questions about your rights under GDPR or our data practices, contact our Data Protection Officer:
              </p>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Email:</strong> dpo@careersuite.com<br/>
                    <strong>Address:</strong> Data Protection Officer, CareerSuite Inc., 123 Business Ave, Suite 100, San Francisco, CA 94105
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-hero hover:shadow-elegant transition-all" asChild>
                    <Link to="/contact">Contact DPO</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/privacy">View Privacy Policy</Link>
                  </Button>
                </div>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GDPRPage;