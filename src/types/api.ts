// API-related types and interfaces

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// CV Builder API types
export interface CV {
  id: string;
  userId: string;
  title: string;
  template: string;
  content: CVContent;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CVContent {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  references?: Reference[];
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
}

export interface Language {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
}

// Social Publisher API types
export interface SocialAccount {
  id: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  username: string;
  isConnected: boolean;
  lastSync: Date;
}

export interface SocialPost {
  id: string;
  userId: string;
  content: string;
  platforms: string[];
  scheduledFor?: Date;
  publishedAt?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  media?: MediaFile[];
  analytics?: PostAnalytics;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt?: string;
}

export interface PostAnalytics {
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
}

// Job Aggregator API types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  remote: boolean;
  salary?: SalaryRange;
  description: string;
  requirements: string[];
  benefits?: string[];
  postedAt: Date;
  expiresAt?: Date;
  source: string;
  applicationUrl: string;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'hour' | 'month' | 'year';
}

export interface JobSearchFilters {
  query?: string;
  location?: string;
  type?: string[];
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  companies?: string[];
}

export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  job: Job;
  savedAt: Date;
  notes?: string;
}

export interface JobAlert {
  id: string;
  userId: string;
  name: string;
  filters: JobSearchFilters;
  isActive: boolean;
  frequency: 'daily' | 'weekly';
  lastSent?: Date;
  createdAt: Date;
}