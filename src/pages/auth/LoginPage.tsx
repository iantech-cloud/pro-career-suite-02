import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Crown, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from '@/lib/validationSchemas';
import { checkRateLimit } from '@/lib/security';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('mode') === 'signup';
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState('');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const currentForm = isSignUp ? registerForm : loginForm;

  const handleSubmit = async (data: LoginFormData | RegisterFormData) => {
    setRateLimitError('');
    
    // Check rate limiting
    const actionKey = isSignUp ? 'register' : 'login';
    if (!checkRateLimit(actionKey, 60000, 5)) {
      setRateLimitError('Too many attempts. Please wait a minute before trying again.');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const registerData = data as RegisterFormData;
        await signup(registerData.email, registerData.password, registerData.name);
        toast({
          title: "Welcome to ProCareer!",
          description: "Your account has been created successfully.",
        });
      } else {
        const loginData = data as LoginFormData;
        await login(loginData.email, loginData.password);
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      }
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error?.message || 'Please check your credentials and try again.';
      toast({
        title: "Authentication failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-hero bg-clip-text text-transparent">
              ProCareer
            </span>
          </div>
          <p className="text-muted-foreground">
            {isSignUp ? 'Start building your professional future' : 'Welcome back to your career hub'}
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Join thousands of professionals building their careers'
                : 'Access your professional tools and dashboard'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            {rateLimitError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{rateLimitError}</AlertDescription>
              </Alert>
            )}

            <Form {...currentForm}>
              <form onSubmit={currentForm.handleSubmit(handleSubmit)} className="space-y-4">
                {isSignUp && (
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="John Doe"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={currentForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={currentForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {isSignUp && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Must contain: 8+ characters, uppercase, lowercase, number, special character
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                {isSignUp && (
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="password"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </Button>
              </form>
            </Form>

            <div className="mt-6 space-y-4">
              {/* Forgot Password - only show on login */}
              {!isSignUp && (
                <div className="text-center">
                  <Button
                    variant="link"
                    className="p-0 h-auto font-normal text-sm"
                    onClick={() => navigate('/auth/forgot-password')}
                  >
                    Forgot your password?
                  </Button>
                </div>
              )}
              
              {/* Sign up/Sign in toggle */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  onClick={() => navigate(isSignUp ? '/auth' : '/auth?mode=signup')}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Join professionals using our complete career suite
          </p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <span>✨ AI-Powered CVs</span>
            <span>📱 Social Publisher</span>
            <span>💼 Remote Jobs</span>
          </div>
        </div>
      </div>
    </div>
  );
}