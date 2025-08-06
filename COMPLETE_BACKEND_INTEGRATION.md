# Complete Backend Integration & Third-Party APIs Documentation

This comprehensive document outlines ALL backend integrations, third-party APIs, and external services needed to fully implement the Career Tools platform.

## 📋 Table of Contents
1. [Core Backend APIs](#core-backend-apis)
2. [Authentication & Security](#authentication--security)
3. [Payment Processing](#payment-processing)
4. [Social Media Integrations](#social-media-integrations)
5. [Job Aggregation APIs](#job-aggregation-apis)
6. [Email Services](#email-services)
7. [File Storage & Media](#file-storage--media)
8. [AI & Machine Learning](#ai--machine-learning)
9. [Analytics & Tracking](#analytics--tracking)
10. [Third-Party Integrations](#third-party-integrations)
11. [Notification Services](#notification-services)
12. [Database Schema](#database-schema)
13. [Environment Variables](#environment-variables)
14. [Rate Limiting & Security](#rate-limiting--security)

---

## 🔧 Core Backend APIs

### Base Configuration
```env
VITE_API_URL=https://your-api-domain.com
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/career-tools
```

### Essential Endpoints (25+ Required)
See `API_ENDPOINTS.md` for complete endpoint documentation including:
- Authentication (`/auth/*`)
- CV Builder (`/cvs/*`, `/ai/enhance`)
- Job Aggregator (`/api/jobs/*`)
- Social Publisher (`/api/social/*`)
- Contact & Support (`/api/contact/*`)
- Billing & Plans (`/api/plans/*`)

---

## 🔐 Authentication & Security

### JWT Token Management
```javascript
// Required JWT implementation
{
  "algorithm": "RS256",
  "expiresIn": "24h",
  "refreshToken": true,
  "blacklist": true // For logout functionality
}
```

### OAuth Providers
Required for social media integrations:
- **Google OAuth 2.0** - For user authentication
- **LinkedIn OAuth 2.0** - For profile sync and posting
- **Twitter OAuth 2.0** - For posting and analytics
- **Facebook Graph API** - For posting and analytics
- **Instagram Basic Display API** - For posting

### Rate Limiting
```javascript
// Required rate limits
{
  "auth": "5 requests per minute",
  "api": "100 requests per hour per user",
  "social_posts": "10 posts per hour",
  "job_search": "50 requests per hour"
}
```

---

## 💳 Payment Processing

### Stripe Integration (Recommended)
Required endpoints and webhooks:

#### Stripe Configuration
```env
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Required Stripe Products
```javascript
const plans = {
  pro: {
    price_id: "price_pro_monthly",
    amount: 2999, // $29.99
    interval: "month"
  },
  premium: {
    price_id: "price_premium_monthly", 
    amount: 4999, // $49.99
    interval: "month"
  }
};
```

#### Webhook Events
```javascript
// Required webhook handlers
[
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed'
]
```

### Alternative Payment Processors
- **PayPal Business API** - For international customers
- **Bank Transfer Processing** - For Enterprise customers

---

## 📱 Social Media Integrations

### LinkedIn API
```env
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=https://yourapp.com/auth/linkedin/callback
```

**Required Scopes:**
```javascript
const linkedinScopes = [
  'r_liteprofile',      // Basic profile info
  'r_emailaddress',     // Email access
  'w_member_social',    // Share content
  'r_organization_social' // Company pages
];
```

**API Endpoints Used:**
- `GET /v2/people/~` - User profile
- `POST /v2/ugcPosts` - Share content
- `GET /v2/shares` - Analytics
- `POST /v2/organizationAcls` - Company page access

### Twitter API v2
```env
TWITTER_CLIENT_ID=your_client_id
TWITTER_CLIENT_SECRET=your_client_secret
TWITTER_BEARER_TOKEN=your_bearer_token
```

**Required Scopes:**
```javascript
const twitterScopes = [
  'tweet.read',
  'tweet.write', 
  'users.read',
  'tweet.moderate.write'
];
```

**API Endpoints Used:**
- `POST /2/tweets` - Create tweet
- `GET /2/tweets/:id` - Get tweet
- `GET /2/users/me` - User info
- `GET /2/tweets/:id/metrics` - Analytics

### Facebook Graph API
```env
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
```

**Required Permissions:**
```javascript
const facebookPermissions = [
  'pages_manage_posts',
  'pages_read_engagement',
  'business_management',
  'pages_show_list'
];
```

### Instagram Basic Display API
```env
INSTAGRAM_CLIENT_ID=your_client_id
INSTAGRAM_CLIENT_SECRET=your_client_secret
```

---

## 🔍 Job Aggregation APIs

### Indeed API
```env
INDEED_PUBLISHER_ID=your_publisher_id
INDEED_API_KEY=your_api_key
```

**Endpoints:**
- Job Search: `http://api.indeed.com/ads/apisearch`
- Job Details: `http://api.indeed.com/ads/apigetjobs`

### LinkedIn Jobs API
```env
LINKEDIN_JOBS_API_KEY=your_api_key
```

**Endpoints:**
- Job Search: `GET /v2/jobSearch`
- Job Details: `GET /v2/jobs/{id}`

### Glassdoor API
```env
GLASSDOOR_PARTNER_ID=your_partner_id
GLASSDOOR_API_KEY=your_api_key
```

### AngelList API (Wellfound)
```env
ANGELLIST_ACCESS_TOKEN=your_access_token
```

### RemoteOK API
```env
# Public API - No key required
REMOTEOK_API_URL=https://remoteok.io/api
```

### GitHub Jobs API
```env
# Public API - No key required  
GITHUB_JOBS_API_URL=https://jobs.github.com/positions.json
```

---

## 📧 Email Services

### Recommended: Resend
```env
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=noreply@yourapp.com
```

**Email Templates Required:**
- Welcome email
- Password reset
- Job alerts
- Subscription confirmations
- Newsletter

### Alternative Options:
- **SendGrid**: `SENDGRID_API_KEY`
- **Mailgun**: `MAILGUN_API_KEY` + `MAILGUN_DOMAIN`
- **AWS SES**: `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`

### Email Templates
```javascript
const emailTemplates = {
  welcome: 'template_welcome',
  passwordReset: 'template_password_reset',
  jobAlert: 'template_job_alert',
  newsletter: 'template_newsletter',
  subscription: 'template_subscription'
};
```

---

## 📁 File Storage & Media

### Recommended: Supabase Storage
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

**Buckets Required:**
- `cv-files` - CV documents and templates
- `profile-images` - User profile photos
- `social-media` - Images for social posts
- `company-logos` - Job posting company logos

### Alternative Options:

#### AWS S3
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

#### Cloudinary
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### File Upload Limits
```javascript
const uploadLimits = {
  profileImage: '5MB',
  cvFile: '10MB', 
  socialMediaImage: '8MB',
  socialMediaVideo: '50MB'
};
```

---

## 🤖 AI & Machine Learning

### OpenAI API (CV Enhancement)
```env
OPENAI_API_KEY=sk-your_api_key
OPENAI_ORG_ID=org-your_org_id
```

**Models Used:**
- `gpt-4` - CV content enhancement
- `gpt-3.5-turbo` - Quick suggestions
- `text-embedding-ada-002` - Content similarity

### Alternative AI Providers:
- **Anthropic Claude**: `ANTHROPIC_API_KEY`
- **Google PaLM**: `GOOGLE_AI_API_KEY`
- **Cohere**: `COHERE_API_KEY`

### CV Enhancement Features
```javascript
const aiFeatures = {
  contentEnhancement: 'Improve CV sections',
  skillsSuggestion: 'Suggest relevant skills',
  jobMatching: 'Match CV to job descriptions',
  coverLetterGeneration: 'Generate personalized cover letters'
};
```

---

## 📊 Analytics & Tracking

### Google Analytics 4
```env
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_API_SECRET=your_api_secret
```

**Events to Track:**
```javascript
const trackingEvents = {
  'cv_created': 'CV creation',
  'job_search': 'Job search performed', 
  'social_post_published': 'Social media post',
  'plan_upgraded': 'Subscription upgrade',
  'job_application': 'Job application submitted'
};
```

### Alternative Analytics:
- **Mixpanel**: `MIXPANEL_TOKEN`
- **Amplitude**: `AMPLITUDE_API_KEY`
- **PostHog**: `POSTHOG_API_KEY`

### Custom Analytics Dashboard
Required metrics:
- User engagement rates
- CV download/view counts
- Job application success rates
- Social media post performance
- Subscription conversion rates

---

## 🔗 Third-Party Integrations

### LinkedIn Profile Import
```env
LINKEDIN_PROFILE_API_KEY=your_api_key
```

**Profile Fields:**
- Basic info (name, headline, location)
- Work experience
- Education
- Skills
- Certifications

### Calendar Integration

#### Google Calendar
```env
GOOGLE_CALENDAR_CLIENT_ID=your_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_client_secret
```

#### Microsoft Calendar
```env
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret
```

### PDF Generation
- **Puppeteer** - For CV PDF generation
- **jsPDF** - Alternative PDF library
- **Playwright** - Alternative to Puppeteer

---

## 🔔 Notification Services

### Push Notifications
#### Firebase Cloud Messaging
```env
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```

### In-App Notifications
- New job matches
- Social media engagement
- CV views by employers
- Subscription updates

### Email Notifications
- Job alerts (daily/weekly)
- Application status updates
- Feature announcements
- Billing notifications

---

## 🗄️ Database Schema

### MongoDB Collections (8 Core Collections)

#### Users
```javascript
{
  _id: ObjectId,
  email: String, // indexed, unique
  password: String, // bcrypt hashed
  name: String,
  profileImage: String,
  tier: String, // 'free', 'pro', 'premium', 'admin'
  subscription: {
    stripeCustomerId: String,
    subscriptionId: String,
    priceId: String,
    status: String,
    currentPeriodEnd: Date
  },
  preferences: {
    emailNotifications: Boolean,
    jobAlerts: Boolean,
    newsletter: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### CVs
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // indexed
  title: String,
  template: String,
  content: {
    personalInfo: Object,
    experience: Array,
    education: Array, 
    skills: Array,
    languages: Array,
    references: Array
  },
  isPublic: Boolean,
  downloadCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Jobs
```javascript
{
  _id: ObjectId,
  externalId: String, // indexed, unique per source
  title: String, // indexed
  company: String, // indexed
  location: String, // indexed
  type: String, // indexed
  remote: Boolean, // indexed
  salary: {
    min: Number,
    max: Number,
    currency: String,
    period: String
  },
  description: String,
  requirements: Array,
  benefits: Array,
  source: String, // 'indeed', 'linkedin', etc.
  sourceUrl: String,
  postedAt: Date, // indexed
  expiresAt: Date,
  createdAt: Date
}
```

#### SavedJobs
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // indexed
  jobId: ObjectId, // indexed
  notes: String,
  applicationStatus: String, // 'saved', 'applied', 'interview', 'rejected', 'offer'
  appliedAt: Date,
  savedAt: Date
}
```

#### SocialPosts
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // indexed
  content: String,
  platforms: Array, // ['linkedin', 'twitter', etc.]
  media: [{
    url: String,
    type: String,
    alt: String
  }],
  scheduledFor: Date, // indexed
  status: String, // 'draft', 'scheduled', 'published', 'failed'
  analytics: {
    impressions: Number,
    likes: Number,
    comments: Number,
    shares: Number,
    clicks: Number
  },
  platformPostIds: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  createdAt: Date,
  publishedAt: Date
}
```

#### SocialAccounts
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // indexed
  platform: String, // indexed
  username: String,
  displayName: String,
  isConnected: Boolean,
  accessToken: String, // encrypted
  refreshToken: String, // encrypted
  tokenExpiresAt: Date,
  lastSync: Date,
  connectedAt: Date
}
```

#### JobAlerts
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // indexed
  name: String,
  filters: {
    query: String,
    location: String,
    type: Array,
    remote: Boolean,
    salaryMin: Number,
    salaryMax: Number,
    companies: Array
  },
  frequency: String, // 'daily', 'weekly'
  isActive: Boolean, // indexed
  lastSent: Date,
  createdAt: Date
}
```

#### BlogPosts
```javascript
{
  _id: ObjectId,
  title: String, // indexed
  slug: String, // indexed, unique
  content: String,
  excerpt: String,
  author: String,
  authorId: ObjectId,
  status: String, // 'draft', 'published'
  category: String, // indexed
  tags: Array, // indexed
  featuredImage: String,
  views: Number,
  featured: Boolean,
  seoTitle: String,
  seoDescription: String,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

### Database Indexes
```javascript
// Required indexes for performance
const indexes = [
  { collection: 'users', index: { email: 1 }, unique: true },
  { collection: 'cvs', index: { userId: 1 } },
  { collection: 'jobs', index: { title: 'text', company: 'text', location: 'text' } },
  { collection: 'jobs', index: { postedAt: -1 } },
  { collection: 'jobs', index: { location: 1, type: 1 } },
  { collection: 'savedjobs', index: { userId: 1, jobId: 1 }, unique: true },
  { collection: 'socialposts', index: { userId: 1, scheduledFor: 1 } },
  { collection: 'socialaccounts', index: { userId: 1, platform: 1 } },
  { collection: 'jobalerts', index: { userId: 1, isActive: 1 } },
  { collection: 'blogposts', index: { slug: 1 }, unique: true }
];
```

---

## 🌍 Environment Variables

### Complete Environment Configuration

#### Core Application
```env
# App Configuration
NODE_ENV=production
PORT=3000
APP_URL=https://yourapp.com
API_URL=https://api.yourapp.com

# Database
MONGODB_URI=mongodb://localhost:27017/career-tools
REDIS_URL=redis://localhost:6379

# JWT & Security
JWT_SECRET=your-super-secure-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
ENCRYPTION_KEY=your-32-character-encryption-key
```

#### Authentication & OAuth
```env
# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
```

#### Payment & Billing
```env
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal (Optional)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

#### Email Services
```env
# Resend (Recommended)
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=noreply@yourapp.com

# SendGrid (Alternative)
SENDGRID_API_KEY=SG.your_api_key
SENDGRID_FROM_EMAIL=noreply@yourapp.com

# AWS SES (Alternative)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
SES_FROM_EMAIL=noreply@yourapp.com
```

#### File Storage
```env
# Supabase Storage (Recommended)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# AWS S3 (Alternative)
AWS_S3_BUCKET=your-bucket-name
AWS_S3_REGION=us-east-1

# Cloudinary (Alternative)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### AI Services
```env
# OpenAI
OPENAI_API_KEY=sk-your_api_key
OPENAI_ORG_ID=org-your_org_id

# Alternative AI Providers
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_AI_API_KEY=your_google_ai_key
COHERE_API_KEY=your_cohere_key
```

#### Job Aggregation APIs
```env
# Job Board APIs
INDEED_PUBLISHER_ID=your_publisher_id
INDEED_API_KEY=your_indeed_key

GLASSDOOR_PARTNER_ID=your_partner_id
GLASSDOOR_API_KEY=your_glassdoor_key

ANGELLIST_ACCESS_TOKEN=your_angellist_token
```

#### Analytics & Tracking
```env
# Google Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_API_SECRET=your_ga_secret

# Alternative Analytics
MIXPANEL_TOKEN=your_mixpanel_token
AMPLITUDE_API_KEY=your_amplitude_key
POSTHOG_API_KEY=your_posthog_key
```

#### Notifications
```env
# Firebase for Push Notifications
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_email

# Slack for Internal Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

---

## 🛡️ Rate Limiting & Security

### Rate Limiting Rules
```javascript
const rateLimits = {
  // Authentication
  '/auth/login': '5 requests per 15 minutes per IP',
  '/auth/register': '3 requests per hour per IP',
  '/auth/reset-password': '3 requests per hour per email',
  
  // API Endpoints
  '/api/*': '100 requests per hour per user',
  '/api/jobs/search': '50 requests per hour per user',
  '/api/social/posts': '20 posts per hour per user',
  '/ai/enhance': '10 requests per hour per user',
  
  // File Uploads
  '/upload/*': '20 uploads per hour per user'
};
```

### Security Headers
```javascript
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'",
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
```

### Input Validation
- All inputs sanitized with DOMPurify
- File uploads scanned for malware
- Image uploads processed and resized
- SQL injection prevention
- XSS protection

---

## 🚀 Deployment Requirements

### Server Requirements
- **Node.js**: 18.x or higher
- **RAM**: Minimum 2GB, Recommended 4GB+
- **Storage**: 20GB+ SSD
- **Bandwidth**: Unlimited
- **SSL Certificate**: Required

### Recommended Hosting Providers
1. **Railway** - Easy deployment, auto-scaling
2. **Vercel** - Excellent for frontend + API routes
3. **AWS** - Full control, scalable
4. **Google Cloud** - Good integration with AI services
5. **DigitalOcean** - Cost-effective VPS

### Environment Setup
```bash
# Production deployment commands
npm install --production
npm run build
pm2 start ecosystem.config.js
```

### Monitoring & Logging
- **Sentry** for error tracking
- **LogRocket** for user session replay
- **New Relic** for performance monitoring
- **DataDog** for infrastructure monitoring

---

## 📋 Implementation Checklist

### Phase 1: Core Backend (Week 1-2)
- [ ] Set up Node.js/Express server
- [ ] Configure MongoDB connection
- [ ] Implement JWT authentication
- [ ] Create user registration/login
- [ ] Set up basic API routes

### Phase 2: CV Builder (Week 3)
- [ ] CV CRUD operations
- [ ] File upload for profile images
- [ ] PDF generation for CVs
- [ ] AI text enhancement integration

### Phase 3: Job Aggregation (Week 4)
- [ ] Indeed API integration
- [ ] LinkedIn Jobs API
- [ ] Job search and filtering
- [ ] Saved jobs functionality

### Phase 4: Social Publisher (Week 5)
- [ ] LinkedIn OAuth integration
- [ ] Twitter API integration
- [ ] Post scheduling system
- [ ] Analytics tracking

### Phase 5: Payment & Billing (Week 6)
- [ ] Stripe integration
- [ ] Subscription management
- [ ] Webhook handling
- [ ] Plan upgrade/downgrade

### Phase 6: Advanced Features (Week 7-8)
- [ ] Email notification system
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Performance optimization

---

## 🤝 Support & Maintenance

### Regular Updates Required
- Security patches (monthly)
- API token renewals (varies by service)
- Dependency updates (quarterly)
- Database backups (daily)
- Performance monitoring (continuous)

### Third-Party Service Monitoring
- API rate limit tracking
- Service uptime monitoring
- Cost optimization
- Feature deprecation notices

This documentation provides a complete roadmap for implementing all backend functionality and third-party integrations needed for a production-ready career tools platform.