import { useState, useCallback } from 'react';
import { sanitizeUserInput, checkRateLimit } from '@/lib/security';
import { useToast } from '@/hooks/use-toast';

interface UseSecureFormOptions {
  rateLimit?: {
    key: string;
    windowMs?: number;
    maxAttempts?: number;
  };
  sanitizeInputs?: boolean;
}

export const useSecureForm = (options: UseSecureFormOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const secureSubmit = useCallback(async (
    submitFn: () => Promise<void>,
    formData?: Record<string, any>
  ) => {
    // Rate limiting check
    if (options.rateLimit) {
      const { key, windowMs = 60000, maxAttempts = 5 } = options.rateLimit;
      if (!checkRateLimit(key, windowMs, maxAttempts)) {
        toast({
          title: 'Rate limit exceeded',
          description: 'Please wait before trying again.',
          variant: 'destructive',
        });
        return;
      }
    }

    // Sanitize inputs if enabled
    if (options.sanitizeInputs && formData) {
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'string') {
          formData[key] = sanitizeUserInput(formData[key]);
        }
      });
    }

    setIsSubmitting(true);
    try {
      await submitFn();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [options, toast]);

  return {
    isSubmitting,
    secureSubmit,
  };
};