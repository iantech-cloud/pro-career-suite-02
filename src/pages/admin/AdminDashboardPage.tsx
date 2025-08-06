import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Plus
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Blog Posts',
      value: '127',
      change: '+5',
      trend: 'up',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Views',
      value: '48.2K',
      change: '+18%',
      trend: 'up',
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Sessions',
      value: '389',
      change: '-3%',
      trend: 'down',
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentActivities = [
    {
      type: 'blog',
      action: 'New blog post published',
      details: '"Advanced CV Writing Techniques"',
      user: 'Admin',
      time: '2 hours ago',
      status: 'success'
    },
    {
      type: 'user',
      action: 'New user registration',
      details: 'Pro plan subscription',
      user: 'john.doe@example.com',
      time: '4 hours ago',
      status: 'info'
    },
    {
      type: 'system',
      action: 'System maintenance',
      details: 'Database optimization completed',
      user: 'System',
      time: '6 hours ago',
      status: 'success'
    },
    {
      type: 'alert',
      action: 'High traffic alert',
      details: 'Server load above 80%',
      user: 'System',
      time: '8 hours ago',
      status: 'warning'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Content',
      description: 'Create, edit, and publish blog posts',
      href: '/admin/content',
      icon: FileText,
      color: 'bg-blue-600'
    },
    {
      title: 'User Management',
      description: 'View and manage user accounts',
      href: '/admin/users',
      icon: Users,
      color: 'bg-green-600'
    },
    {
      title: 'Analytics',
      description: 'View platform usage statistics',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-purple-600'
    },
    {
      title: 'Settings',
      description: 'Configure platform settings',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-orange-600'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user?.name}. Here's what's happening with your platform.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <Shield className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
            <Button variant="hero" asChild>
              <Link to="/admin/content">
                <Plus className="w-4 h-4 mr-2" />
                Quick Actions
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`} />
                      <span className={`text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your platform efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card key={index} className="border-2 border-dashed border-muted hover:border-primary transition-colors group">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                            <Button variant="outline" size="sm" className="mt-3" asChild>
                              <Link to={action.href}>
                                Open
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.details}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;