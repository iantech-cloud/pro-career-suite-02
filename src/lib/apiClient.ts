import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenStorage, checkRateLimit } from './security';

// Enhanced API client with security features
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication and security
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authentication token
    const token = tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Rate limiting check for sensitive endpoints
    const sensitiveEndpoints = ['/auth/login', '/auth/register', '/auth/reset-password'];
    const endpoint = config.url || '';
    
    if (sensitiveEndpoints.some(path => endpoint.includes(path))) {
      const isAllowed = checkRateLimit(`api_${endpoint}`, 60000, 5); // 5 requests per minute
      if (!isAllowed) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
    }

    // Add CSRF protection headers if available
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken && config.headers) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      tokenStorage.removeToken();
      // Redirect to login page
      window.location.href = '/auth/login';
    }

    // Handle 429 errors (rate limiting)
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }

    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;