# API Endpoints Specification for Node.js Backend

This document specifies all the API endpoints that your Node.js backend must implement to work with the OneSocialStack frontend.

## Base URL
```
Base URL: /api
```

## Authentication Endpoints

### 1. POST /api/auth/login
**Purpose**: User login authentication
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "token": "string (JWT)",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "tier": "free|pro|enterprise|admin",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```
**Error Responses**:
- 401: Invalid credentials
- 429: Too many login attempts
- 400: Invalid request data

### 2. POST /api/auth/register
**Purpose**: User registration
**Request Body**:
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```
**Response**:
```json
{
  "message": "Registration successful",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "tier": "free"
  }
}
```
**Error Responses**:
- 409: Email already exists
- 400: Invalid registration data

### 3. POST /api/auth/logout
**Purpose**: User logout
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "message": "Logged out successfully"
}
```

### 4. GET /api/auth/me
**Purpose**: Get current user information
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "tier": "free|pro|enterprise|admin",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```
**Error Responses**:
- 401: Invalid or expired token

### 5. POST /api/auth/reset-password
**Purpose**: Request password reset
**Request Body**:
```json
{
  "email": "string"
}
```
**Response**:
```json
{
  "message": "Password reset email sent"
}
```

## Job Aggregator Endpoints

### 6. GET /api/jobs/search
**Purpose**: Search for jobs with filters
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `query` (optional): Search term
- `location` (optional): Location filter
- `type` (optional): Job type (full-time, part-time, contract, remote)
- `remote` (optional): Boolean for remote jobs only

**Response**:
```json
[
  {
    "id": "string",
    "title": "string",
    "company": "string",
    "location": "string",
    "type": "full-time|part-time|contract|remote",
    "salary": "string (optional)",
    "description": "string",
    "requirements": ["string"],
    "postedDate": "ISO date string",
    "source": "string",
    "url": "string",
    "isSaved": "boolean"
  }
]
```

### 7. POST /api/jobs/save
**Purpose**: Save a job to user's saved jobs
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "jobId": "string"
}
```
**Response**:
```json
{
  "message": "Job saved successfully"
}
```

### 8. POST /api/jobs/unsave
**Purpose**: Remove a job from user's saved jobs
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "jobId": "string"
}
```
**Response**:
```json
{
  "message": "Job unsaved successfully"
}
```

### 9. POST /api/jobs/apply
**Purpose**: Apply to a job with CV
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "jobId": "string",
  "cvId": "string",
  "coverLetter": "string (optional)"
}
```
**Response**:
```json
{
  "message": "Application submitted successfully",
  "applicationId": "string"
}
```

## CV Builder Endpoints

### 10. GET /api/cv
**Purpose**: Get user's CVs
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
[
  {
    "id": "string",
    "title": "string",
    "template": "string",
    "data": {
      "personalInfo": {
        "name": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "summary": "string"
      },
      "experience": [
        {
          "company": "string",
          "position": "string",
          "startDate": "string",
          "endDate": "string",
          "description": "string"
        }
      ],
      "education": [
        {
          "institution": "string",
          "degree": "string",
          "startDate": "string",
          "endDate": "string"
        }
      ],
      "skills": ["string"],
      "certifications": ["string"]
    },
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
]
```

### 11. POST /api/cv
**Purpose**: Create a new CV
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "title": "string",
  "template": "string",
  "data": {
    // CV data structure as shown above
  }
}
```
**Response**:
```json
{
  "id": "string",
  "message": "CV created successfully"
}
```

### 12. PUT /api/cv/:id
**Purpose**: Update an existing CV
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "title": "string (optional)",
  "template": "string (optional)",
  "data": {
    // Updated CV data
  }
}
```
**Response**:
```json
{
  "message": "CV updated successfully"
}
```

### 13. DELETE /api/cv/:id
**Purpose**: Delete a CV
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "message": "CV deleted successfully"
}
```

### 14. POST /api/cv/:id/enhance
**Purpose**: AI-enhance CV content
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "section": "summary|experience|skills",
  "content": "string"
}
```
**Response**:
```json
{
  "enhancedContent": "string",
  "suggestions": ["string"]
}
```

## Social Media Publisher Endpoints

### 15. GET /api/social/connections
**Purpose**: Get user's connected social media accounts
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
[
  {
    "platform": "linkedin|twitter|facebook",
    "accountName": "string",
    "isConnected": "boolean",
    "connectedAt": "ISO date string"
  }
]
```

### 16. POST /api/social/connect
**Purpose**: Connect a social media account
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "platform": "linkedin|twitter|facebook",
  "accessToken": "string",
  "refreshToken": "string (optional)"
}
```
**Response**:
```json
{
  "message": "Account connected successfully"
}
```

### 17. POST /api/social/disconnect
**Purpose**: Disconnect a social media account
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "platform": "linkedin|twitter|facebook"
}
```
**Response**:
```json
{
  "message": "Account disconnected successfully"
}
```

### 18. POST /api/social/post
**Purpose**: Publish a post to connected platforms
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "content": "string",
  "platforms": ["linkedin", "twitter", "facebook"],
  "scheduledFor": "ISO date string (optional)",
  "media": ["string (URLs)"] // optional
}
```
**Response**:
```json
{
  "message": "Post published successfully",
  "postId": "string",
  "publishedTo": ["platform names"]
}
```

### 19. GET /api/social/posts
**Purpose**: Get user's post history
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `limit` (optional): Number of posts to return
- `offset` (optional): Pagination offset

**Response**:
```json
[
  {
    "id": "string",
    "content": "string",
    "platforms": ["string"],
    "status": "published|scheduled|failed",
    "scheduledFor": "ISO date string",
    "publishedAt": "ISO date string",
    "analytics": {
      "views": "number",
      "likes": "number",
      "shares": "number",
      "comments": "number"
    }
  }
]
```

### 20. GET /api/social/analytics
**Purpose**: Get social media analytics
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `platform` (optional): Specific platform
- `startDate` (optional): Start date for analytics
- `endDate` (optional): End date for analytics

**Response**:
```json
{
  "totalPosts": "number",
  "totalViews": "number",
  "totalEngagement": "number",
  "platformBreakdown": {
    "linkedin": {
      "posts": "number",
      "views": "number",
      "engagement": "number"
    }
  },
  "timeSeriesData": [
    {
      "date": "string",
      "posts": "number",
      "views": "number",
      "engagement": "number"
    }
  ]
}
```

## User Management Endpoints

### 21. PUT /api/user/profile
**Purpose**: Update user profile
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "name": "string (optional)",
  "email": "string (optional)",
  "currentPassword": "string (required if changing email/password)",
  "newPassword": "string (optional)"
}
```
**Response**:
```json
{
  "message": "Profile updated successfully",
  "user": {
    // Updated user object
  }
}
```

### 22. POST /api/user/upgrade
**Purpose**: Upgrade user tier (payment integration)
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "tier": "pro|enterprise",
  "paymentMethodId": "string"
}
```
**Response**:
```json
{
  "message": "Subscription upgraded successfully",
  "subscriptionId": "string"
}
```

## Billing Endpoints

### 23. GET /api/billing/subscription
**Purpose**: Get user's subscription details
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "tier": "free|pro|enterprise",
  "status": "active|canceled|past_due",
  "currentPeriodEnd": "ISO date string",
  "cancelAtPeriodEnd": "boolean"
}
```

### 24. POST /api/billing/cancel
**Purpose**: Cancel subscription
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "message": "Subscription canceled successfully"
}
```

## Admin Endpoints (Admin tier required)

### 25. GET /api/admin/users
**Purpose**: Get all users (admin only)
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Users per page

**Response**:
```json
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "tier": "string",
      "createdAt": "ISO date string",
      "lastLogin": "ISO date string"
    }
  ],
  "totalUsers": "number",
  "totalPages": "number"
}
```

### 26. PUT /api/admin/users/:id
**Purpose**: Update user (admin only)
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "tier": "free|pro|enterprise|admin",
  "isActive": "boolean"
}
```
**Response**:
```json
{
  "message": "User updated successfully"
}
```

## Blog Management Endpoints

### 27. GET /api/blog/posts
**Purpose**: Get published blog posts
**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Posts per page
- `tag` (optional): Filter by tag

**Response**:
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "excerpt": "string",
      "content": "string",
      "author": "string",
      "publishedAt": "ISO date string",
      "tags": ["string"],
      "featured": "boolean"
    }
  ],
  "totalPosts": "number",
  "totalPages": "number"
}
```

### 28. GET /api/blog/posts/:slug
**Purpose**: Get a specific blog post
**Response**:
```json
{
  "id": "string",
  "title": "string",
  "slug": "string",
  "content": "string",
  "author": "string",
  "publishedAt": "ISO date string",
  "tags": ["string"],
  "readTime": "number (minutes)"
}
```

### 29. POST /api/admin/blog/posts
**Purpose**: Create blog post (admin only)
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "tags": ["string"],
  "featured": "boolean",
  "publishNow": "boolean"
}
```
**Response**:
```json
{
  "message": "Blog post created successfully",
  "postId": "string"
}
```

## Security Requirements

### Authentication
- All protected endpoints require `Authorization: Bearer {token}` header
- JWT tokens should be validated and user information extracted
- Tokens should have expiration times (recommended: 24 hours)

### Rate Limiting
- Implement rate limiting on all endpoints, especially:
  - Auth endpoints: 5 requests per minute per IP
  - API endpoints: 100 requests per minute per user
  - Search endpoints: 50 requests per minute per user

### Validation
- Validate all input data using schemas (e.g., Joi, Yup)
- Sanitize HTML content before storing
- Implement proper error handling with consistent error responses

### CORS
- Configure CORS to allow your frontend domain
- Set appropriate headers for security

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

## Frontend Integration Notes

1. **API Client**: The frontend uses an enhanced axios client (`src/lib/apiClient.ts`) that automatically:
   - Adds authentication tokens
   - Implements client-side rate limiting
   - Handles common error responses
   - Adds CSRF protection headers

2. **Token Management**: The frontend uses `tokenStorage` from `src/lib/security.ts` for secure token handling

3. **Error Handling**: All API calls include proper error handling with user-friendly messages

4. **Security Features**: The frontend includes:
   - Input sanitization
   - XSS protection
   - Rate limiting
   - Security headers
   - CSRF protection

This specification ensures your Node.js backend will be fully compatible with the OneSocialStack frontend application.