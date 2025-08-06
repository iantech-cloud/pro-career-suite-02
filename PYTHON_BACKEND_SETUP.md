# Python Backend Setup Guide

This guide will help you set up a complete Python backend to work with your career platform frontend.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [API Implementation](#api-implementation)
- [Authentication System](#authentication-system)
- [Frontend Integration](#frontend-integration)
- [Deployment](#deployment)
- [Testing](#testing)

## Prerequisites

- Python 3.9+
- PostgreSQL 12+
- Redis (for caching and sessions)
- Git

## Project Structure

```
career-platform-backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routes.py
│   │   └── utils.py
│   ├── cv/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routes.py
│   ├── jobs/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routes.py
│   ├── social/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routes.py
│   ├── blog/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routes.py
│   ├── ai/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── utils.py
│   └── utils/
│       ├── __init__.py
│       ├── security.py
│       ├── email.py
│       └── helpers.py
├── alembic/
├── tests/
├── requirements.txt
├── alembic.ini
├── .env.example
└── README.md
```

## Installation & Setup

### 1. Create and activate virtual environment

```bash
python -m venv career-platform-env
source career-platform-env/bin/activate  # On Windows: career-platform-env\Scripts\activate
```

### 2. Install dependencies

Create `requirements.txt`:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9
redis==5.0.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
email-validator==2.1.0
pydantic[email]==2.5.0
python-dotenv==1.0.0
httpx==0.25.2
celery==5.3.4
openai==1.3.0
requests==2.31.0
pytest==7.4.3
pytest-asyncio==0.21.1
```

```bash
pip install -r requirements.txt
```

### 3. Initialize the project

```bash
mkdir career-platform-backend
cd career-platform-backend
```

## Database Configuration

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

### 2. Create database

```sql
-- Connect to PostgreSQL as superuser
sudo -u postgres psql

-- Create database and user
CREATE DATABASE career_platform;
CREATE USER career_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE career_platform TO career_user;
```

### 3. Setup Redis

```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# Windows
# Download from https://github.com/microsoftarchive/redis/releases
```

## Environment Variables

Create `.env` file:

```env
# Database
DATABASE_URL=postgresql://career_user:your_secure_password@localhost/career_platform
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=your-email@gmail.com

# AI Services
OPENAI_API_KEY=your-openai-api-key

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Environment
ENVIRONMENT=development
```

## API Implementation

### 1. Main Application (`app/main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.auth.routes import router as auth_router
from app.cv.routes import router as cv_router
from app.jobs.routes import router as jobs_router
from app.social.routes import router as social_router
from app.blog.routes import router as blog_router
from app.ai.routes import router as ai_router
from app.config import settings
from app.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Career Platform API",
    description="Backend API for Career Platform",
    version="1.0.0"
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.yourdomain.com"]
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(cv_router, prefix="/cvs", tags=["cv"])
app.include_router(jobs_router, prefix="/jobs", tags=["jobs"])
app.include_router(social_router, prefix="/social", tags=["social"])
app.include_router(blog_router, prefix="/blog", tags=["blog"])
app.include_router(ai_router, prefix="/ai", tags=["ai"])

@app.get("/")
async def root():
    return {"message": "Career Platform API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

### 2. Configuration (`app/config.py`)

```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str
    REDIS_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    FROM_EMAIL: str
    
    OPENAI_API_KEY: str
    
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]
    ENVIRONMENT: str = "development"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### 3. Database Setup (`app/database.py`)

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 4. Authentication Models (`app/auth/models.py`)

```python
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, Enum
from sqlalchemy.sql import func
from app.database import Base
import enum

class UserTier(enum.Enum):
    FREE = "free"
    PREMIUM = "premium"
    ENTERPRISE = "enterprise"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    tier = Column(Enum(UserTier), default=UserTier.FREE)
    profile_picture = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    website = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
```

### 5. Authentication Routes (`app/auth/routes.py`)

```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import schemas, models
from app.utils.security import verify_password, get_password_hash, create_access_token, verify_token
from datetime import timedelta
from app.config import settings

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/register", response_model=schemas.UserResponse)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return schemas.UserResponse.from_orm(db_user)

@router.post("/login", response_model=schemas.LoginResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return schemas.LoginResponse(
        token=access_token,
        user=schemas.UserResponse.from_orm(user)
    )

@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    
    try:
        payload = verify_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except:
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    
    return schemas.UserResponse.from_orm(user)

@router.post("/logout")
async def logout():
    return {"message": "Successfully logged out"}

@router.post("/reset-password")
async def reset_password(email_data: schemas.PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email_data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    
    # Generate reset token and send email (implement email service)
    # For now, just return success
    return {"message": "Password reset email sent"}
```

### 6. CV Models (`app/cv/models.py`)

```python
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class CV(Base):
    __tablename__ = "cvs"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    template = Column(String, nullable=False)
    content = Column(JSON, nullable=False)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    user = relationship("User", back_populates="cvs")
```

### 7. Security Utils (`app/utils/security.py`)

```python
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None
```

## Authentication System

The authentication system includes:

1. **User Registration** - Email/password registration
2. **User Login** - JWT token-based authentication
3. **Protected Routes** - Token verification middleware
4. **Password Reset** - Email-based password reset
5. **User Profiles** - User profile management

## Frontend Integration

### 1. Set CORS properly

Make sure your ALLOWED_ORIGINS in `.env` includes your frontend URL:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

### 2. Update frontend API URL

In your frontend `.env`:

```env
VITE_API_URL=http://localhost:8000
```

### 3. Run the backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Database Migrations

### 1. Initialize Alembic

```bash
alembic init alembic
```

### 2. Configure Alembic

Edit `alembic.ini`:

```ini
sqlalchemy.url = postgresql://career_user:your_secure_password@localhost/career_platform
```

### 3. Create migration

```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Deployment

### 1. Production Environment

Create `.env.production`:

```env
DATABASE_URL=postgresql://user:password@your-db-host/career_platform
REDIS_URL=redis://your-redis-host:6379/0
SECRET_KEY=your-production-secret-key
ENVIRONMENT=production
ALLOWED_ORIGINS=https://yourdomain.com
```

### 2. Docker Setup

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://career_user:password@db/career_platform
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=career_platform
      - POSTGRES_USER=career_user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
```

## Testing

### 1. Create test file (`tests/test_auth.py`)

```python
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register():
    response = client.post(
        "/auth/register",
        json={"email": "test@example.com", "name": "Test User", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"

def test_login():
    response = client.post(
        "/auth/login",
        data={"username": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 200
    assert "token" in response.json()
```

### 2. Run tests

```bash
pytest tests/
```

## API Documentation

Once running, visit:
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Additional Features to Implement

1. **Email Service** - For password reset and notifications
2. **File Upload** - For CV files and profile pictures
3. **Caching** - Redis caching for frequently accessed data
4. **Rate Limiting** - Protect against abuse
5. **Logging** - Comprehensive logging system
6. **Background Tasks** - Celery for email sending and data processing
7. **Search** - Elasticsearch for job search functionality
8. **Social Media Integration** - OAuth for LinkedIn, Twitter, etc.

## Getting Started Checklist

- [ ] Install Python 3.9+
- [ ] Install PostgreSQL and Redis
- [ ] Create virtual environment
- [ ] Install dependencies
- [ ] Set up database
- [ ] Configure environment variables
- [ ] Run database migrations
- [ ] Start the server
- [ ] Test API endpoints
- [ ] Integrate with frontend

## Support

For issues and questions:
1. Check the API documentation at `/docs`
2. Review the logs in `logs/` directory
3. Ensure all environment variables are set correctly
4. Verify database connectivity

## Security Considerations

1. Always use HTTPS in production
2. Keep SECRET_KEY secure and unique
3. Use strong database passwords
4. Implement rate limiting
5. Validate all inputs
6. Use proper CORS settings
7. Regular security updates