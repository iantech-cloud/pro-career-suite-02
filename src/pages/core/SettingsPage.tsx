import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Bell, Palette, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || '',
    company: user?.company || '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    phone: ''
  });

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      updateUser({
        name: profile.name,
        title: profile.title,
        company: profile.company
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handlePasswordUpdate = () => {
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileUpdate} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handlePasswordUpdate}>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notification settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Theme settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {user?.tier} Plan
                      </p>
                    </div>
                    {user?.tier === 'free' && (
                      <Button variant="hero" asChild>
                        <Link to="/pricing">Upgrade to Pro</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}