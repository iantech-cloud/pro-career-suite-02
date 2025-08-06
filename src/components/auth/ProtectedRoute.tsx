import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredTier?: 'free' | 'pro' | 'premium' | 'admin';
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredTier,
  redirectTo = '/auth' 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check tier requirements
  if (requiredTier && !hasRequiredTier(user.tier, requiredTier)) {
    return <Navigate to="/upgrade" replace />;
  }

  return <>{children}</>;
};

// Helper function to check if user has required tier access
const hasRequiredTier = (userTier: string, requiredTier: string) => {
  const tierLevels: Record<string, number> = {
    free: 1,
    pro: 2,
    premium: 3,
    admin: 4
  };

  return (tierLevels[userTier] || 0) >= (tierLevels[requiredTier] || 0);
};