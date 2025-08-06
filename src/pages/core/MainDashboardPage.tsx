import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  FileText, 
  Share2, 
  Search, 
  Crown, 
  ArrowRight, 
  TrendingUp,
  Users,
  Calendar,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MainDashboardPage = () => {
  const { user } = useAuth();

  const modules = [
    {
      title: 'CV Builder',
      description: 'Create professional resumes that get you hired',
      icon: FileText,
      href: '/cv-builder',
      stats: { label: 'CVs Created', value: '2' },
      bgColor: 'bg-primary',
      textColor: 'text-primary'
    },
    {
      title: 'Social Publisher',
      description: 'Manage and schedule your professional social media presence',
      icon: Share2,
      href: '/social-publisher',
      stats: { label: 'Posts This Week', value: '12' },
      bgColor: 'bg-accent',
      textColor: 'text-accent'
    },
    {
      title: 'Job Aggregator',
      description: 'Find and apply to jobs from multiple platforms',
      icon: Search,
      href: '/jobs',
      stats: { label: 'Saved Jobs', value: '8' },
      bgColor: 'bg-success',
      textColor: 'text-success'
    }
  ];

  const recentActivity = [
    {
      action: 'Created new CV',
      target: 'Software Developer Resume',
      time: '2 hours ago',
      type: 'cv'
    },
    {
      action: 'Scheduled post',
      target: 'LinkedIn career update',
      time: '1 day ago',
      type: 'social'
    },
    {
      action: 'Saved job',
      target: 'Senior Frontend Developer at TechCorp',
      time: '2 days ago',
      type: 'job'
    }
  ];

  return (
    <DashboardLayout 
      title={`Dashboard - Welcome ${user?.name} | OneSocialStack`}
      description="Manage your CV builder, social media scheduler, and job search activities. View your recent activity and quick actions."
    >
      <div>
        {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your professional tools
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
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
              {(user?.tier === 'pro' || user?.tier === 'premium' || user?.tier === 'admin') && <Crown className="w-4 h-4 mr-2" />}
              {user?.tier?.charAt(0).toUpperCase() + user?.tier?.slice(1)} Plan
            </Badge>
            
            {user?.tier === 'free' && (
              <Button variant="hero" asChild>
                <Link to="/pricing">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Link>
              </Button>
            )}
            
            {user?.tier === 'pro' && (
              <Button variant="outline" asChild>
                <Link to="/pricing">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Link>
              </Button>
            )}
            
            {user?.tier === 'admin' && (
              <Button variant="outline" asChild>
                <Link to="/admin">
                  <Crown className="w-4 h-4 mr-2" />
                  Admin Panel
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">127</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <ShowForTier requiredTier="pro">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </ShowForTier>
        
        <ShowForTier requiredTier="premium">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Score</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </ShowForTier>
      </div>

      {/* Main Modules */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card key={module.title} className="group hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{module.stats.label}</p>
                    <p className="text-2xl font-bold">{module.stats.value}</p>
                  </div>
                </div>
                
                <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                  <Link to={module.href}>
                    Open {module.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'cv' ? 'bg-primary/10 text-primary' :
                    activity.type === 'social' ? 'bg-accent/10 text-accent' :
                    'bg-success/10 text-success'
                  }`}>
                    {activity.type === 'cv' && <FileText className="w-4 h-4" />}
                    {activity.type === 'social' && <Share2 className="w-4 h-4" />}
                    {activity.type === 'job' && <Search className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.target}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get things done faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/cv-builder/new">
                  <FileText className="w-4 h-4 mr-3" />
                  Create New CV
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/social-publisher/compose">
                  <Share2 className="w-4 h-4 mr-3" />
                  Schedule Post
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/jobs">
                  <Search className="w-4 h-4 mr-3" />
                  Search Jobs
                </Link>
              </Button>
              
              {user?.tier === 'free' && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/pricing">
                    <Crown className="w-4 h-4 mr-3" />
                    Unlock Pro Features
                  </Link>
                </Button>
              )}
              
              {(user?.tier === 'pro' || user?.tier === 'premium' || user?.tier === 'admin') && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/social-publisher/analytics">
                    <TrendingUp className="w-4 h-4 mr-3" />
                    View Analytics
                  </Link>
                </Button>
              )}
              
              {user?.tier === 'pro' && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/pricing">
                    <Crown className="w-4 h-4 mr-3" />
                    Upgrade to Premium
                  </Link>
                </Button>
              )}
              
              {(user?.tier === 'premium' || user?.tier === 'admin') && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/team">
                    <Users className="w-4 h-4 mr-3" />
                    Team Management
                  </Link>
                </Button>
              )}
              
              {user?.tier === 'admin' && (
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/admin">
                    <Crown className="w-4 h-4 mr-3" />
                    Admin Dashboard
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default MainDashboardPage;