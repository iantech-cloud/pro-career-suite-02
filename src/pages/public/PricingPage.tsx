import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/common/SEOHead';
import { PaymentButton } from '@/components/common/PaymentButton';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free',
      price: 0,
      tier: 'free' as const,
      description: 'Perfect for getting started',
      badge: null,
      features: [
        '1 CV/Resume',
        'Basic templates only',
        '1 social account per platform',
        '5 posts per month',
        'Save 5 jobs',
        '1 job alert',
        'Basic support'
      ],
      limitations: [
        'No AI enhancement',
        'No analytics',
        'Limited templates',
        'No bulk operations'
      ]
    },
    {
      name: 'Pro',
      price: 19,
      tier: 'pro' as const,
      description: 'Everything you need to accelerate your career',
      badge: 'Most Popular',
      features: [
        'Unlimited CVs/Resumes',
        'All premium templates',
        'AI-powered enhancement',
        'Unlimited social accounts',
        'Unlimited posts & scheduling',
        'Advanced analytics',
        'Unlimited saved jobs',
        'Unlimited job alerts',
        'Apply with CV integration',
        'Priority support',
        'Export to multiple formats'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: 49,
      tier: 'admin' as const,
      description: 'For teams and power users',
      badge: 'Best Value',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Admin dashboard',
        'Custom branding',
        'API access',
        'Advanced reporting',
        'Dedicated support',
        'Custom integrations',
        'SSO support'
      ],
      limitations: []
    }
  ];

  const currentPlan = user?.tier || 'free';

  const handlePlanSelection = async (planTier: string, planName: string, price: number) => {
    if (!user) {
      // Store selected plan in localStorage and redirect to registration
      localStorage.setItem('selectedPlan', JSON.stringify({ tier: planTier, name: planName, price }));
      navigate('/auth?mode=signup&returnTo=/pricing');
      return;
    }
    
    if (planTier === 'free') {
      await handleDowngradeToPlan(planTier);
      return;
    }

    await handleUpgradeToPlan(planTier, planName, price);
  };

  const handleUpgradeToPlan = async (planTier: string, planName: string, price: number) => {
    setLoading(planTier);
    
    try {
      // Call your Node.js API to create checkout session or process plan upgrade
      const response = await fetch('/api/plans/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify({
          planTier,
          planName,
          price,
          userId: user?.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.checkoutUrl) {
          // Redirect to payment processor (Stripe, PayPal, etc.)
          window.open(data.checkoutUrl, '_blank');
          
          toast({
            title: "Redirecting to Payment",
            description: "Complete your payment to activate your new plan.",
          });
        } else if (data.success) {
          // Plan upgraded successfully
          toast({
            title: "Plan Updated!",
            description: `Successfully upgraded to ${planName} plan.`,
          });
          
          // Refresh user data
          window.location.reload();
        }
      } else {
        throw new Error(data.message || 'Failed to process plan upgrade');
      }
    } catch (error) {
      console.error('Plan upgrade error:', error);
      toast({
        title: "Upgrade Failed",
        description: error instanceof Error ? error.message : "Failed to upgrade plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const handleDowngradeToPlan = async (planTier: string) => {
    setLoading(planTier);
    
    try {
      const response = await fetch('/api/plans/downgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify({
          planTier,
          userId: user?.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Plan Updated!",
          description: `Successfully changed to ${planTier} plan.`,
        });
        
        // Refresh user data
        window.location.reload();
      } else {
        throw new Error(data.message || 'Failed to process plan change');
      }
    } catch (error) {
      console.error('Plan downgrade error:', error);
      toast({
        title: "Plan Change Failed",
        description: error instanceof Error ? error.message : "Failed to change plan. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const handleRegisterWithPlan = (planTier: string, planName: string, price: number) => {
    // Store selected plan for post-registration assignment
    localStorage.setItem('selectedPlan', JSON.stringify({ tier: planTier, name: planName, price }));
    navigate(`/auth?mode=signup&plan=${planTier}&returnTo=/pricing`);
  };

  return (
    <>
      <SEOHead 
        title="OneSocialStack Pricing Plans - Affordable Career Development Tools | Free Trial Available"
        description="Choose the perfect OneSocialStack plan for your career success. Compare Free, Pro, and Enterprise plans featuring AI-powered resume builder, social media management, and remote job search tools. Start with our free plan or try Pro features with 14-day trial. Affordable pricing for professionals, students, and teams."
        keywords="OneSocialStack pricing, career platform pricing, resume builder cost, social media management pricing, job search platform subscription, professional development tools cost, AI resume builder pricing, LinkedIn scheduler pricing, career tools subscription, affordable career platform, free resume builder, premium job search, enterprise career management"
        canonical={`${window.location.origin}/pricing`}
      />
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock the full potential of your professional career with our comprehensive suite of tools
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all duration-300 hover:shadow-elegant ${
                plan.badge ? 'border-primary shadow-accent' : ''
              } ${currentPlan === plan.tier ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-hero text-white">
                  {plan.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  {plan.name === 'Free' && <Zap className="w-8 h-8 text-muted-foreground" />}
                  {plan.name === 'Pro' && <Star className="w-8 h-8 text-primary" />}
                  {plan.name === 'Enterprise' && <Crown className="w-8 h-8 text-accent" />}
                </div>
                
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                      Included Features
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    {currentPlan === plan.tier ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : user ? (
                      <Button 
                        variant={plan.badge ? "hero" : "default"} 
                        className="w-full"
                        onClick={() => handlePlanSelection(plan.tier, plan.name, plan.price)}
                        disabled={loading === plan.tier}
                      >
                        {loading === plan.tier ? "Processing..." : 
                         plan.price === 0 ? "Switch to Free" : "Upgrade Now"}
                      </Button>
                    ) : (
                      <Button 
                        variant={plan.badge ? "hero" : "outline"} 
                        className="w-full"
                        onClick={() => handleRegisterWithPlan(plan.tier, plan.name, plan.price)}
                      >
                        Get Started
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-background/60 backdrop-blur rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">Features</th>
                  <th className="text-center py-4">Free</th>
                  <th className="text-center py-4">Pro</th>
                  <th className="text-center py-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-3 font-medium">CV Builder</td>
                  <td className="text-center">1 CV</td>
                  <td className="text-center">Unlimited</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">AI Enhancement</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Social Publishing</td>
                  <td className="text-center">5 posts/month</td>
                  <td className="text-center">Unlimited</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Job Alerts</td>
                  <td className="text-center">1 alert</td>
                  <td className="text-center">Unlimited</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Analytics</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Team Features</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose OneSocialStack for Your Career Growth?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive career management platform provides exceptional value through integrated tools that work together seamlessly to accelerate your professional success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-3">AI-Powered Optimization</h4>
              <p className="text-muted-foreground">
                Our advanced artificial intelligence analyzes millions of successful resumes and career paths to provide personalized recommendations that increase your job search success rate by up to 250%.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-3">Integrated Workflow</h4>
              <p className="text-muted-foreground">
                Unlike other platforms that offer isolated tools, OneSocialStack provides a unified experience where your resume, social media presence, and job applications work together harmoniously.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-3">Enterprise-Grade Security</h4>
              <p className="text-muted-foreground">
                Your professional data is protected with bank-level security protocols, ensuring complete privacy while enabling seamless integration across platforms and devices.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Compare OneSocialStack vs. Individual Tools</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4 text-red-600">Using Separate Tools (Traditional Approach)</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Resume builder: $15-30/month</li>
                  <li>• Social media scheduler: $20-50/month</li>
                  <li>• Premium job boards: $25-40/month</li>
                  <li>• LinkedIn Premium: $30-60/month</li>
                  <li>• Analytics tools: $10-25/month</li>
                  <li className="font-semibold text-foreground pt-2">Total: $100-205/month</li>
                  <li className="text-red-600">+ Time spent managing multiple platforms</li>
                  <li className="text-red-600">+ Inconsistent branding across tools</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4 text-green-600">OneSocialStack Pro Plan</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Unlimited AI-enhanced resumes</li>
                  <li>• Multi-platform social media management</li>
                  <li>• Advanced job search with alerts</li>
                  <li>• Professional networking tools</li>
                  <li>• Comprehensive analytics dashboard</li>
                  <li className="font-semibold text-foreground pt-2">Total: $19/month</li>
                  <li className="text-green-600">+ Integrated workflow saves 10+ hours/week</li>
                  <li className="text-green-600">+ Consistent professional branding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Success Metrics */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Results for Our Members</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform delivers measurable career advancement results, helping professionals achieve faster job placement, higher salaries, and stronger professional networks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Higher interview rate with AI-optimized resumes</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">340%</div>
              <div className="text-sm text-muted-foreground">Average increase in social media engagement</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">32%</div>
              <div className="text-sm text-muted-foreground">Average salary increase after platform usage</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">60%</div>
              <div className="text-sm text-muted-foreground">Faster job placement compared to traditional methods</div>
            </div>
          </div>
          
          <div className="bg-gradient-subtle rounded-lg p-8">
            <h3 className="text-xl font-bold text-center mb-6">Industry Recognition and Partnerships</h3>
            <p className="text-center text-muted-foreground mb-6">
              OneSocialStack is trusted by leading organizations and has received recognition from major industry publications and career development experts worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
              <div className="space-y-2">
                <div className="font-semibold">Featured In</div>
                <div className="text-muted-foreground">TechCrunch, Forbes, Harvard Business Review</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Partner Companies</div>
                <div className="text-muted-foreground">5,000+ companies actively hiring through our platform</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Awards</div>
                <div className="text-muted-foreground">Best Career Platform 2024, Innovation in HR Tech</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-muted-foreground mb-4">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be charged prorated amounts for upgrades or receive credits for downgrades.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial for premium plans?</h3>
              <p className="text-muted-foreground mb-4">Our Free plan gives you access to core features with no time limit. Pro and Enterprise plans offer 14-day free trials with full access to premium features.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground mb-4">We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers through our secure payment processor.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground mb-4">Yes, you can cancel your subscription at any time with no penalties. You'll retain full access to premium features until the end of your current billing period.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer discounts for students or nonprofits?</h3>
              <p className="text-muted-foreground mb-4">Yes, we offer 50% discounts for verified students and nonprofit organizations. Educational institutions can also qualify for special volume pricing.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens to my data if I cancel?</h3>
              <p className="text-muted-foreground mb-4">Your data remains accessible for 90 days after cancellation. You can export all your resumes, posts, and job applications before or after canceling your subscription.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there customer support included?</h3>
              <p className="text-muted-foreground mb-4">All plans include email support. Pro customers get priority support with faster response times, while Enterprise customers receive dedicated account management and phone support.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use OneSocialStack for team management?</h3>
              <p className="text-muted-foreground mb-4">Enterprise plans include team collaboration features, user management, and admin dashboards. Perfect for recruitment agencies, career coaches, and HR teams.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PricingPage;