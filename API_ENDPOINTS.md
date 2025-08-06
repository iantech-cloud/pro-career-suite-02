# API Endpoints Documentation

This document outlines all the API endpoints that your Node.js backend with MongoDB needs to implement for the Career Tools application.

## Base URL Configuration
The application expects the API base URL to be configured via the `VITE_API_URL` environment variable.

## Authentication
Most endpoints require Bearer token authentication:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /auth/login
**Description:** User login  
**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "tier": "free|pro|premium|admin",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

### POST /auth/register
**Description:** User registration  
**Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```
**Response:**
```json
{
  "message": "Registration successful"
}
```

### POST /auth/logout
**Description:** User logout  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### GET /auth/me
**Description:** Get current user information  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "tier": "free|pro|premium|admin",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### POST /auth/reset-password
**Description:** Request password reset  
**Body:**
```json
{
  "email": "string"
}
```
**Response:**
```json
{
  "message": "Password reset email sent"
}
```

### POST /auth/reset-password/confirm
**Description:** Confirm password reset with token  
**Body:**
```json
{
  "token": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "message": "Password reset successfully"
}
```

---

## CV Builder Endpoints

### GET /cvs
**Description:** Get all CVs for authenticated user  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "template": "string",
    "content": "object",
    "lastModified": "datetime",
    "createdAt": "datetime",
    "userId": "string"
  }
]
```

### GET /cvs/:id
**Description:** Get specific CV by ID  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "id": "string",
  "title": "string",
  "template": "string",
  "content": "object",
  "lastModified": "datetime",
  "createdAt": "datetime",
  "userId": "string"
}
```

### POST /cvs
**Description:** Create new CV  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "title": "string",
  "template": "string",
  "content": "object"
}
```
**Response:**
```json
{
  "id": "string",
  "title": "string",
  "template": "string",
  "content": "object",
  "lastModified": "datetime",
  "createdAt": "datetime",
  "userId": "string"
}
```

### PUT /cvs/:id
**Description:** Update existing CV  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "title": "string",
  "template": "string",
  "content": "object"
}
```
**Response:**
```json
{
  "id": "string",
  "title": "string",
  "template": "string",
  "content": "object",
  "lastModified": "datetime",
  "createdAt": "datetime",
  "userId": "string"
}
```

### DELETE /cvs/:id
**Description:** Delete CV  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
{
  "message": "CV deleted successfully"
}
```

### POST /ai/enhance
**Description:** AI text enhancement  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "text": "string"
}
```
**Response:**
```json
{
  "enhancedText": "string"
}
```

---

## Job Aggregator Endpoints

### GET /api/jobs/search
**Description:** Search for jobs  
**Headers:** `Authorization: Bearer <token>`  
**Query Parameters:**
- `query` (string, optional): Search query
- `location` (string, optional): Job location
- `type` (string, optional): Job type (full-time, part-time, contract, remote)
- `remote` (boolean, optional): Remote jobs filter

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "company": "string",
    "location": "string",
    "type": "full-time|part-time|contract|remote",
    "salary": "string",
    "description": "string",
    "requirements": ["string"],
    "postedDate": "datetime",
    "source": "string",
    "url": "string"
  }
]
```

### POST /api/jobs/save
**Description:** Save a job  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "jobId": "string"
}
```
**Response:**
```json
{
  "message": "Job saved successfully"
}
```

### POST /api/jobs/unsave
**Description:** Unsave a job  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "jobId": "string"
}
```
**Response:**
```json
{
  "message": "Job unsaved successfully"
}
```

### POST /api/jobs/apply
**Description:** Apply to a job  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "jobId": "string",
  "cvId": "string",
  "coverLetter": "string"
}
```
**Response:**
```json
{
  "message": "Application submitted successfully"
}
```

---

## Social Publisher Endpoints

### GET /api/social/posts
**Description:** Get all social media posts for user  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": "string",
    "content": "string",
    "platforms": ["string"],
    "scheduledDate": "datetime",
    "status": "draft|scheduled|published|failed",
    "createdAt": "datetime",
    "publishedAt": "datetime"
  }
]
```

### GET /api/social/accounts
**Description:** Get connected social media accounts  
**Headers:** `Authorization: Bearer <token>`  
**Response:**
```json
[
  {
    "id": "string",
    "platform": "string",
    "username": "string",
    "isConnected": "boolean",
    "connectedAt": "datetime"
  }
]
```

---

## Contact & Support Endpoints

### POST /api/contact/submit
**Description:** Submit contact form  
**Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```
**Response:**
```json
{
  "message": "Contact form submitted successfully"
}
```

### POST /api/contact/track
**Description:** Track contact actions  
**Body:**
```json
{
  "action": "string",
  "details": "object"
}
```
**Response:**
```json
{
  "message": "Action tracked successfully"
}
```

---

## Billing & Plans Endpoints

### POST /api/plans/subscribe
**Description:** Subscribe to a plan  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "planId": "string",
  "tier": "pro|premium"
}
```
**Response:**
```json
{
  "checkoutUrl": "string",
  "sessionId": "string"
}
```

### POST /api/plans/downgrade
**Description:** Downgrade plan  
**Headers:** `Authorization: Bearer <token>`  
**Body:**
```json
{
  "tier": "free"
}
```
**Response:**
```json
{
  "message": "Plan downgraded successfully"
}
```

---

## Error Responses

All endpoints should return appropriate HTTP status codes and error messages:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Detailed error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "Conflict",
  "message": "Resource already exists"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

---

## MongoDB Collections Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password: String, // hashed
  name: String,
  tier: String, // "free", "pro", "premium", "admin"
  createdAt: Date,
  updatedAt: Date
}
```

### CVs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  template: String,
  content: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  location: String,
  type: String,
  salary: String,
  description: String,
  requirements: [String],
  postedDate: Date,
  source: String,
  url: String
}
```

### SavedJobs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  jobId: ObjectId,
  savedAt: Date
}
```

### SocialPosts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  content: String,
  platforms: [String],
  scheduledDate: Date,
  status: String,
  createdAt: Date,
  publishedAt: Date
}
```

### SocialAccounts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  platform: String,
  username: String,
  isConnected: Boolean,
  connectedAt: Date,
  accessToken: String, // encrypted
  refreshToken: String // encrypted
}
```