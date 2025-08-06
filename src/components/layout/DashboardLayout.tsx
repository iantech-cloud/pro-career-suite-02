import { ReactNode } from 'react';
import { SEOHead } from '@/components/common/SEOHead';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const DashboardLayout = ({ 
  children, 
  title = "Dashboard - OneSocialStack",
  description = "Manage your CV builder, social media scheduler, and job search activities all in one place."
}: DashboardLayoutProps) => {
  return (
    <>
      <SEOHead 
        title={title}
        description={description}
      />
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </>
  );
};