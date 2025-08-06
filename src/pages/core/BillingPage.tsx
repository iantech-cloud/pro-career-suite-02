import { BillingManagement } from '@/components/common/BillingManagement';
import { SEOHead } from '@/components/common/SEOHead';

export default function BillingPage() {
  return (
    <>
      <SEOHead 
        title="Billing & Subscription - OneSocialStack"
        description="Manage your OneSocialStack subscription, view billing history, and upgrade your plan to unlock premium features for CV building, social media management, and job search."
        canonical={`${window.location.origin}/billing`}
      />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage your subscription, view billing history, and upgrade your plan to unlock more features.
          </p>
        </div>

        <BillingManagement />
      </div>
    </>
  );
}