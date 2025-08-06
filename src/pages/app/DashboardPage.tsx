import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Share2, 
  Briefcase, 
  Plus, 
  BarChart3, 
  Crown,
  Zap,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const modules = [
    {
      title: 'CV Builder',
      description: 'Create and manage your professional résumés',
      icon: FileText,
      href: '/cv-builder',
      stats: { free: '1 CV created', pro: '5 CVs created' },
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Social Publisher',
      description: 'Schedule and manage your social media presence',
      icon: Share2,
      href: '/social-publisher',
      stats: { free: '3/5 posts this month', pro: '24 posts scheduled' },
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Job Board',
      description: 'Discover and apply to remote opportunities',
      icon: Briefcase,
      href: '/jobs',
      stats: { free: '2/5 jobs saved', pro: '15 jobs saved' },
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const quickActions = [
    { label: 'Create New CV', href: '/cv-builder/new', icon: Plus },
    { label: 'Schedule Post', href: '/social-publisher/new', icon: Clock },
    { label: 'Browse Jobs', href: '/jobs', icon: TrendingUp },
  ];

  return (
    <DashboardLayout 
      title={`Dashboard - Welcome ${user?.name} | OneSocialStack`}
      description="Manage your professional tools and track your career growth with AI-powered CV builder, social media scheduler, and job search."
    >
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to accelerate your career today?
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Tier badge */}
              <Badge 
                variant={
                  user?.tier === 'admin' ? 'destructive' :
                  user?.tier === 'premium' ? 'default' :
                  user?.tier === 'pro' ? 'secondary' : 'outline'
                }
                className={
                  user?.tier === 'admin' ? 'bg-destructive border-0 text-white' :
                  user?.tier === 'premium' ? 'bg-gradient-hero border-0 text-white' :
                  user?.tier === 'pro' ? 'bg-primary border-0 text-white' : ''
                }
              >
                {(user?.tier === 'pro' || user?.tier === 'premium' || user?.tier === 'admin') && <Crown className="w-3 h-3 mr-1" />}
                {user?.tier?.charAt(0).toUpperCase() + user?.tier?.slice(1)} Plan
              </Badge>
              
              {user?.tier === 'free' && (
                <Button variant="hero" size="sm" asChild>
                  <Link to="/pricing">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Link>
                </Button>
              )}
              
              {user?.tier === 'pro' && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/pricing">
                    <Crown className="w-4 h-4 mr-2" />
                     Upgrade to Premium
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Jump into your most common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-primary transition-all"
                      asChild
                    >
                      <Link to={action.href}>
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Modules Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Your Professional Tools</h2>
              
              <div className="grid gap-6">
                {modules.map((module, index) => (
                  <Card key={index} className="shadow-card hover:shadow-primary transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${module.bgColor} rounded-lg flex items-center justify-center`}>
                            <module.icon className={`w-6 h-6 ${module.color}`} />
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg">{module.title}</h3>
                            <p className="text-muted-foreground">{module.description}</p>
                            <p className="text-sm text-primary mt-1">
                              {(user?.tier === 'pro' || user?.tier === 'premium' || user?.tier === 'admin') ? module.stats.pro : module.stats.free}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {user?.tier === 'free' && (
                            <Badge variant="outline" className="text-xs">
                              Limited Access
                            </Badge>
                          )}
                          {user?.tier === 'pro' && (
                            <Badge className="bg-success/10 text-success border-success/20 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Pro Access
                            </Badge>
                          )}
                           {user?.tier === 'premium' && (
                             <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                               <Crown className="w-3 h-3 mr-1" />
                               Premium Access
                             </Badge>
                           )}
                          {user?.tier === 'admin' && (
                            <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                              <Crown className="w-3 h-3 mr-1" />
                              Admin Access
                            </Badge>
                          )}
                          
                          <Button variant="outline" asChild>
                            <Link to={module.href}>
                              Open
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade prompt for free users */}
            {user?.tier === 'free' && (
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Crown className="w-5 h-5" />
                    <span>Unlock Pro Features</span>
                  </CardTitle>
                  <CardDescription>
                    Get unlimited access to all tools and AI-powered features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Unlimited CVs with AI enhancement</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Multiple social accounts & analytics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>One-click job applications</span>
                    </li>
                  </ul>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/pricing">
                      Upgrade to Pro
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Pro upgrade prompt */}
            {user?.tier === 'pro' && (
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-primary">
                    <Crown className="w-5 h-5" />
                    <span>Upgrade to Premium</span>
                  </CardTitle>
                  <CardDescription>
                    Get advanced team features and collaboration tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm mb-4">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Team collaboration & sharing</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Custom branding & API access</span>
                    </li>
                  </ul>
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/pricing">
                      Upgrade to Premium
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Analytics for pro+ users */}
            <ShowForTier requiredTier="pro">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    <span>This Week</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">CV views</span>
                    <span className="font-semibold">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Post engagement</span>
                    <span className="font-semibold">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Job applications</span>
                    <span className="font-semibold">5</span>
                  </div>
                  
                  {/* Enterprise exclusive metrics */}
                  <ShowForTier requiredTier="premium">
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Team performance</span>
                        <span className="font-semibold">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">API usage</span>
                        <span className="font-semibold">2.3k calls</span>
                      </div>
                    </div>
                  </ShowForTier>
                </CardContent>
              </Card>
            </ShowForTier>

            {/* Recent activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-muted-foreground">CV updated 2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-muted-foreground">Post scheduled for tomorrow</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-muted-foreground">3 new job alerts</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </DashboardLayout>
  );
}