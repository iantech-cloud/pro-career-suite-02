import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  CheckCircle, 
  FileText, 
  Share2, 
  Search, 
  Settings,
  Trash2
} from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'cv',
      title: 'CV Downloaded',
      message: 'Your "Software Developer Resume" was downloaded by TechCorp',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'social',
      title: 'Post Published',
      message: 'Your LinkedIn post about career development went live',
      time: '4 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'job',
      title: 'New Job Match',
      message: '5 new jobs match your search criteria for "Frontend Developer"',
      time: '1 day ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'system',
      title: 'Account Upgraded',
      message: 'Welcome to Pro! Your account has been successfully upgraded',
      time: '2 days ago',
      read: true,
      priority: 'high'
    },
    {
      id: '5',
      type: 'job',
      title: 'Application Update',
      message: 'Your application for Senior Developer at StartupXYZ was viewed',
      time: '3 days ago',
      read: false,
      priority: 'high'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'cv': return <FileText className="w-5 h-5" />;
      case 'social': return <Share2 className="w-5 h-5" />;
      case 'job': return <Search className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cv': return 'bg-blue-100 text-blue-600';
      case 'social': return 'bg-purple-100 text-purple-600';
      case 'job': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with your professional activities
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} unread</Badge>
          )}
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="cv">CV</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {['all', 'cv', 'social', 'job', 'system'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {notifications
              .filter(notif => tab === 'all' || notif.type === tab)
              .map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all duration-200 ${
                    !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              {notification.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">
                                  High Priority
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            
            {notifications.filter(notif => tab === 'all' || notif.type === tab).length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No notifications</h3>
                  <p className="text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default NotificationsPage;