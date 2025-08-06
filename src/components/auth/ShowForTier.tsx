import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ShowForTierProps {
  children: ReactNode;
  requiredTier: 'free' | 'pro' | 'premium' | 'admin';
  fallback?: ReactNode;
}

export const ShowForTier = ({ 
  children, 
  requiredTier, 
  fallback = null 
}: ShowForTierProps) => {
  const { user } = useAuth();

  if (!user || !hasRequiredTier(user.tier, requiredTier)) {
    return <>{fallback}</>;
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

  return tierLevels[userTier] >= tierLevels[requiredTier];
};