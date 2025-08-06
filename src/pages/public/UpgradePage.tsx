import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentButton } from '@/components/common/PaymentButton';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Star, Zap, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpgradePage = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Get started with basic features',
      features: [
        { name: '1 CV', included: true },
        { name: 'Basic templates', included: true },
        { name: 'Job search', included: true },
        { name: 'AI enhancements', included: false },
        { name: 'Unlimited CVs', included: false },
        { name: 'Premium templates', included: false },
        { name: 'Social publisher', included: false },
        { name: 'Analytics', included: false }
      ],
      buttonText: 'Current Plan',
      variant: 'outline',
      current: user?.tier === 'free'
    },
    {
      name: 'Pro',
      price: 9.99,
      description: 'Perfect for professionals',
      features: [
        { name: 'Unlimited CVs', included: true },
        { name: 'Premium templates', included: true },
        { name: 'AI enhancements', included: true },
        { name: 'Social publisher', included: true },
        { name: 'Analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Export formats', included: true },
        { name: 'Custom branding', included: false }
      ],
      buttonText: 'Upgrade to Pro',
      variant: 'hero',
      popular: true,
      current: user?.tier === 'pro'
    },
    {
      name: 'Enterprise',
      price: 29.99,
      description: 'For teams and organizations',
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Team management', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Dedicated support', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SLA guarantee', included: true }
      ],
      buttonText: 'Contact Sales',
      variant: 'outline',
      current: user?.tier === 'premium'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Upgrade Your Plan
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock premium features and accelerate your professional growth with our advanced tools and AI capabilities.
          </p>
        </div>

        {/* Access Denied Message */}
        {user && (
          <div className="mb-12">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <X className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Access Restricted</h3>
                    <p className="text-muted-foreground">
                      This feature requires a higher tier plan. Upgrade now to unlock all premium features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-elegant' : ''} ${plan.current ? 'border-accent' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary">Current Plan</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  {plan.current ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.name === 'Enterprise' ? (
                    <Button variant={plan.variant as any} className="w-full" asChild>
                      <Link to="/contact">Contact Sales</Link>
                    </Button>
                  ) : plan.name === 'Pro' ? (
                    <PaymentButton
                      variant="subscription"
                      planName="Pro"
                      amount={999}
                      className="w-full"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      {plan.buttonText}
                    </PaymentButton>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;