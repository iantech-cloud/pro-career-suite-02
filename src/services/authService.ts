import client from '@/lib/apiClient';
import { tokenStorage } from '@/lib/security';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await client.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      // Enhanced error handling for your Node.js backend
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      } else if (error.response?.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  async register(userData: RegisterData) {
    try {
      const response = await client.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      // Enhanced error handling for your Node.js backend
      if (error.response?.status === 409) {
        throw new Error('Email already exists. Please use a different email.');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid registration data. Please check your information.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  async logout() {
    const token = tokenStorage.getToken();
    if (token) {
      try {
        await client.post('/auth/logout', {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        // Continue with logout even if server request fails
        console.warn('Logout request failed:', error);
      }
    }
    tokenStorage.removeToken();
  },

  async getCurrentUser() {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      const response = await client.get('/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      // If token is invalid, clear it and throw error
      if (error.response?.status === 401) {
        tokenStorage.removeToken();
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error('Failed to get user information.');
    }
  },

  async resetPassword(email: string) {
    try {
      const response = await client.post('/auth/reset-password', { email });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Email address not found');
      } else if (error.response?.status === 429) {
        throw new Error('Too many reset requests. Please try again later.');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to send reset email. Please try again.');
    }
  },

  async confirmResetPassword(token: string, newPassword: string) {
    try {
      const response = await client.post('/auth/reset-password/confirm', { 
        token, 
        password: newPassword 
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Invalid or expired reset token');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to reset password. Please try again.');
    }
  }
};