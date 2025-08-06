import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Crown, CreditCard, Loader2 } from 'lucide-react';

interface PaymentButtonProps {
  variant?: 'subscription' | 'one-time';
  planName?: string;
  amount?: number;
  priceId?: string;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}

export const PaymentButton = ({
  variant = 'subscription',
  planName = 'Premium',
  amount = 999,
  priceId,
  className,
  children,
  size = 'default'
}: PaymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with payment.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Frontend-only demo - show success message
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      toast({
        title: "Payment Demo",
        description: "This is a frontend-only demo. Payment integration would require backend setup.",
        variant: "default"
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const defaultContent = variant === 'subscription' ? (
    <>
      <Crown className="w-4 h-4 mr-2" />
      Upgrade to {planName}
    </>
  ) : (
    <>
      <CreditCard className="w-4 h-4 mr-2" />
      Pay ${(amount / 100).toFixed(2)}
    </>
  );

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      variant="hero"
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children || defaultContent
      )}
    </Button>
  );
};