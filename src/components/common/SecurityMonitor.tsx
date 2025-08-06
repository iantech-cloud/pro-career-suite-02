import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { tokenStorage } from '@/lib/security';

/**
 * Security monitoring component for development and production
 * Monitors security-related events and provides warnings
 */
export const SecurityMonitor = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Monitor for token expiration
    const checkTokenExpiration = () => {
      if (tokenStorage.isTokenExpired()) {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Token exists but is expired
          tokenStorage.removeToken();
          toast({
            title: "Session Expired",
            description: "Please log in again to continue.",
            variant: "destructive",
          });
        }
      }
    };

    // Check every minute for token expiration
    const tokenInterval = setInterval(checkTokenExpiration, 60000);

    // Monitor for potential XSS attempts (development only)
    if (process.env.NODE_ENV === 'development') {
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const message = args.join(' ');
        if (message.includes('script') || message.includes('eval') || message.includes('innerHTML')) {
          toast({
            title: "Security Warning",
            description: "Potential XSS attempt detected in console.",
            variant: "destructive",
          });
        }
        originalConsoleError.apply(console, args);
      };

      // Cleanup console override
      return () => {
        console.error = originalConsoleError;
        clearInterval(tokenInterval);
      };
    }

    return () => {
      clearInterval(tokenInterval);
    };
  }, [toast]);

  // Monitor for suspicious activity patterns
  useEffect(() => {
    const monitorActivity = () => {
      // Check for excessive rate limit triggers
      const rateLimitKeys = ['login', 'register', 'forgot_password'];
      const suspiciousActivity = rateLimitKeys.some(key => {
        const attempts = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
        return attempts.length >= 5; // If rate limit is being hit frequently
      });

      if (suspiciousActivity && process.env.NODE_ENV === 'development') {
        console.warn('Security Monitor: Suspicious activity detected - frequent rate limiting');
      }
    };

    // Check every 5 minutes
    const activityInterval = setInterval(monitorActivity, 5 * 60 * 1000);

    return () => {
      clearInterval(activityInterval);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

/**
 * Hook for security event logging
 */
export const useSecurityLogger = () => {
  const logSecurityEvent = (event: string, details?: any) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Security Event:', logEntry);
    }

    // In production, you would send this to your logging service
    // Example: sendToLoggingService(logEntry);
  };

  return { logSecurityEvent };
};