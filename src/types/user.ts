export type UserTier = 'free' | 'pro' | 'premium' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  tier: UserTier;
  avatar?: string;
  title?: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  linkedIn?: string;
  github?: string;
  phone?: string;
}

// Tier permissions configuration
export const TIER_PERMISSIONS = {
  free: {
    cvs: { max: 1, aiEnhance: false, allTemplates: false },
    social: { accountsPerPlatform: 1, postsPerMonth: 5, analytics: false },
    jobs: { maxSaved: 5, maxAlerts: 1, applyWithCV: false }
  },
  pro: {
    cvs: { max: -1, aiEnhance: true, allTemplates: true }, // -1 means unlimited
    social: { accountsPerPlatform: -1, postsPerMonth: -1, analytics: true },
    jobs: { maxSaved: -1, maxAlerts: -1, applyWithCV: true }
  },
  premium: {
    cvs: { max: -1, aiEnhance: true, allTemplates: true },
    social: { accountsPerPlatform: -1, postsPerMonth: -1, analytics: true },
    jobs: { maxSaved: -1, maxAlerts: -1, applyWithCV: true }
  },
  admin: {
    cvs: { max: -1, aiEnhance: true, allTemplates: true },
    social: { accountsPerPlatform: -1, postsPerMonth: -1, analytics: true },
    jobs: { maxSaved: -1, maxAlerts: -1, applyWithCV: true }
  }
} as const;