import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CookiePolicyPage = () => {
  const { toast } = useToast();
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    preferences: true
  });

  const handleSavePreferences = () => {
    // Mock saving preferences
    toast({
      title: "Preferences Saved",
      description: "Your cookie preferences have been updated.",
    });
  };

  const cookieTypes = [
    {
      type: 'Essential Cookies',
      required: true,
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      examples: [
        'Authentication tokens to keep you logged in',
        'Security tokens to prevent fraud',
        'Session management cookies',
        'Load balancing cookies'
      ],
      retention: 'Session or up to 1 year'
    },
    {
      type: 'Analytics Cookies',
      required: false,
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: [
        'Google Analytics tracking',
        'User behavior analysis',
        'Performance monitoring',
        'Feature usage statistics'
      ],
      retention: 'Up to 2 years'
    },
    {
      type: 'Marketing Cookies',
      required: false,
      description: 'These cookies are used to deliver advertisements more relevant to you.',
      examples: [
        'Ad targeting and personalization',
        'Social media integration',
        'Retargeting pixels',
        'Conversion tracking'
      ],
      retention: 'Up to 1 year'
    },
    {
      type: 'Preference Cookies',
      required: false,
      description: 'These cookies remember your choices and personalize your experience.',
      examples: [
        'Language preferences',
        'Theme settings (dark/light mode)',
        'Dashboard layout preferences',
        'Notification settings'
      ],
      retention: 'Up to 1 year'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white">Legal</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>

        {/* Cookie Preferences Card */}
        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle>Manage Your Cookie Preferences</CardTitle>
            <CardDescription>
              Control which types of cookies we can use to enhance your experience on our platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="essential" className="font-medium">Essential Cookies</Label>
                  <p className="text-sm text-muted-foreground">Required for basic functionality</p>
                </div>
                <Switch 
                  id="essential" 
                  checked={true} 
                  disabled 
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="analytics" className="font-medium">Analytics Cookies</Label>
                  <p className="text-sm text-muted-foreground">Help us improve our services</p>
                </div>
                <Switch 
                  id="analytics" 
                  checked={cookiePreferences.analytics}
                  onCheckedChange={(checked) => setCookiePreferences(prev => ({ ...prev, analytics: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="marketing" className="font-medium">Marketing Cookies</Label>
                  <p className="text-sm text-muted-foreground">Personalize ads and content</p>
                </div>
                <Switch 
                  id="marketing" 
                  checked={cookiePreferences.marketing}
                  onCheckedChange={(checked) => setCookiePreferences(prev => ({ ...prev, marketing: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="preferences" className="font-medium">Preference Cookies</Label>
                  <p className="text-sm text-muted-foreground">Remember your settings</p>
                </div>
                <Switch 
                  id="preferences" 
                  checked={cookiePreferences.preferences}
                  onCheckedChange={(checked) => setCookiePreferences(prev => ({ ...prev, preferences: checked }))}
                />
              </div>
              
              <Button onClick={handleSavePreferences} className="w-full bg-gradient-hero hover:shadow-elegant transition-all">
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>What Are Cookies?</CardTitle>
            <CardDescription>
              Understanding how we use cookies and similar technologies on CareerSuite.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences, 
                keeping you logged in, and helping us understand how you use our service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium">{cookie.type}</h3>
                      <Badge variant={cookie.required ? "default" : "secondary"}>
                        {cookie.required ? "Required" : "Optional"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{cookie.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Examples:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {cookie.examples.map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-2">
                        <strong>Retention period:</strong> {cookie.retention}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We may also use third-party cookies from trusted partners to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Google Analytics:</strong> To understand website usage and improve our service</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and login functionality</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Customer Support:</strong> For chat functionality and support services</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How to Control Cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Browser Settings</h3>
                  <p className="text-muted-foreground mb-2">
                    You can control cookies through your browser settings:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Block all cookies</li>
                    <li>Block third-party cookies only</li>
                    <li>Delete existing cookies</li>
                    <li>Set preferences for specific websites</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Our Cookie Preference Center</h3>
                  <p className="text-muted-foreground">
                    Use the preference center above to control which optional cookies we can use. 
                    Your choices will be saved and respected across all your visits.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookie Consent</h2>
              <p className="text-muted-foreground mb-4">
                When you first visit our website, we'll ask for your consent to use optional cookies. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Accept all cookies for the full experience</li>
                <li>Customize your preferences</li>
                <li>Decline optional cookies (essential cookies will still be used)</li>
                <li>Change your preferences at any time</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Mobile Apps and Local Storage</h2>
              <p className="text-muted-foreground">
                Our mobile applications may use local storage and similar technologies to provide 
                functionality similar to cookies. This includes storing preferences, login information, 
                and usage analytics. You can control these through your device settings.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or applicable laws. We will notify you of any significant changes and, where required, 
                seek your renewed consent.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about our use of cookies, please contact us:
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

export default CookiePolicyPage;