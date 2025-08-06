import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentButton } from './PaymentButton';
import { useToast } from '@/hooks/use-toast';
import { Crown, CreditCard, Calendar, Check, Settings, RefreshCw } from 'lucide-react';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
}

export const BillingManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({ subscribed: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: ['1 CV', 'Basic templates', 'Standard support'],
      tier: 'free'
    },
    {
      name: 'Pro',
      price: 9.99,
      features: ['Unlimited CVs', 'Premium templates', 'AI enhancement', 'Priority support', 'Social media scheduling'],
      tier: 'pro',
      popular: true
    },
    {
      name: 'Premium',
      price: 29.99,
      features: ['Everything in Pro', 'Advanced analytics', 'Team collaboration', 'Custom branding', 'API access'],
      tier: 'premium'
    }
  ];

  const checkSubscription = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
    try {
      // Frontend-only demo - simulate free plan
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionData({ subscribed: false });
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      // Frontend-only demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Demo Mode",
        description: "This is a frontend-only demo. Backend integration required for subscription management.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  const currentPlan = plans.find(p => p.tier === (subscriptionData.subscription_tier?.toLowerCase() || 'free'));

  return (
    <div className="space-y-6">
      {/* Current Subscription Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-primary" />
                <span>Current Plan</span>
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing preferences
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkSubscription}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant={subscriptionData.subscribed ? "default" : "outline"}>
                  {currentPlan?.name || 'Free'}
                </Badge>
                {subscriptionData.subscribed && subscriptionData.subscription_end && (
                  <span className="text-sm text-muted-foreground">
                    Renews {new Date(subscriptionData.subscription_end).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {subscriptionData.subscribed 
                  ? `You have access to ${currentPlan?.name} features`
                  : 'You are on the free plan'
                }
              </p>
            </div>
            
            {subscriptionData.subscribed && (
              <Button 
                variant="outline" 
                onClick={handleManageSubscription}
                disabled={isLoading}
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.tier === (subscriptionData.subscription_tier?.toLowerCase() || 'free');
          
          return (
            <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''} ${isCurrentPlan ? 'bg-primary/5' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <span>{plan.name}</span>
                  {isCurrentPlan && <Crown className="w-4 h-4 text-primary" />}
                </CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Separator />
                
                {isCurrentPlan ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : plan.tier === 'free' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Downgrade
                  </Button>
                ) : (
                  <PaymentButton
                    variant="subscription"
                    planName={plan.name}
                    amount={Math.round(plan.price * 100)}
                    className="w-full"
                  >
                    {subscriptionData.subscribed ? 'Switch Plan' : 'Upgrade'}
                  </PaymentButton>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};