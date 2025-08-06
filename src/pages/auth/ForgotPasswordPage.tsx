import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validationSchemas';
import { checkRateLimit } from '@/lib/security';

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setRateLimitError('');
    
    // Check rate limiting
    if (!checkRateLimit('forgot_password', 60000, 3)) {
      setRateLimitError('Too many password reset attempts. Please wait a minute before trying again.');
      return;
    }

    setIsLoading(true);

    try {
      // Import authService at the top of the file
      const { authService } = await import('@/services/authService');
      await authService.resetPassword(data.email);
      
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error: any) {
      setRateLimitError(error?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              We've sent a password reset link to <strong>{submittedEmail}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Mail className="w-4 h-4" />
              <AlertDescription>
                Didn't receive the email? Check your spam folder or try again.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Try Another Email
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/auth">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rateLimitError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{rateLimitError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Button variant="ghost" asChild>
              <Link to="/auth">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;