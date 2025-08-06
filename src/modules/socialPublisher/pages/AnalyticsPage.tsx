import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share,
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram,
  Download,
  Calendar
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Mock analytics data
  const engagementData = [
    { date: 'Jan 15', impressions: 1200, likes: 45, comments: 12, shares: 8 },
    { date: 'Jan 16', impressions: 980, likes: 38, comments: 9, shares: 5 },
    { date: 'Jan 17', impressions: 1450, likes: 62, comments: 18, shares: 12 },
    { date: 'Jan 18', impressions: 1100, likes: 41, comments: 14, shares: 7 },
    { date: 'Jan 19', impressions: 1650, likes: 78, comments: 22, shares: 15 },
    { date: 'Jan 20', impressions: 1350, likes: 55, comments: 16, shares: 10 },
    { date: 'Jan 21', impressions: 1800, likes: 89, comments: 25, shares: 18 }
  ];

  const platformData = [
    { platform: 'Twitter', posts: 12, engagement: 4.2, color: '#1DA1F2' },
    { platform: 'LinkedIn', posts: 8, engagement: 6.8, color: '#0077B5' },
    { platform: 'Facebook', posts: 5, engagement: 3.1, color: '#1877F2' },
    { platform: 'Instagram', posts: 10, engagement: 5.5, color: '#E4405F' }
  ];

  const topPosts = [
    {
      id: '1',
      content: 'Excited to share my latest project! Built with React and TypeScript. #webdev #react',
      platform: 'twitter',
      impressions: 1850,
      likes: 89,
      comments: 25,
      shares: 18
    },
    {
      id: '2',
      content: 'Looking forward to the upcoming tech conference. Who else is attending? #techconf2024',
      platform: 'linkedin',
      impressions: 1650,
      likes: 78,
      comments: 22,
      shares: 15
    },
    {
      id: '3',
      content: 'New blog post is live! Discussing the future of web development.',
      platform: 'twitter',
      impressions: 1450,
      likes: 62,
      comments: 18,
      shares: 12
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      default: return null;
    }
  };

  const totalImpressions = engagementData.reduce((sum, day) => sum + day.impressions, 0);
  const totalLikes = engagementData.reduce((sum, day) => sum + day.likes, 0);
  const totalComments = engagementData.reduce((sum, day) => sum + day.comments, 0);
  const totalShares = engagementData.reduce((sum, day) => sum + day.shares, 0);

  const averageEngagement = ((totalLikes + totalComments + totalShares) / totalImpressions * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your social media performance and engagement
          </p>
        </div>

        <ShowForTier 
          requiredTier="pro"
          fallback={
            <Card className="shadow-card border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Analytics Available in Pro</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to Pro to access detailed analytics, engagement insights, and performance tracking.
                </p>
                <Button variant="hero">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          }
        >
          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Impressions</p>
                    <p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
                    <p className="text-xs text-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5% vs last period
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Likes</p>
                    <p className="text-2xl font-bold">{totalLikes}</p>
                    <p className="text-xs text-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.2% vs last period
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Comments</p>
                    <p className="text-2xl font-bold">{totalComments}</p>
                    <p className="text-xs text-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +15.3% vs last period
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold">{averageEngagement}%</p>
                    <p className="text-xs text-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +3.1% vs last period
                    </p>
                  </div>
                  <Share className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Engagement Chart */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Engagement Over Time</CardTitle>
                  <CardDescription>
                    Daily engagement metrics for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="likes" stroke="hsl(var(--accent))" strokeWidth={2} />
                      <Line type="monotone" dataKey="comments" stroke="hsl(var(--success))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Platform Performance */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>
                    Engagement rate by platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platformData.map((platform) => (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(platform.platform.toLowerCase())}
                          <span className="font-medium">{platform.platform}</span>
                        </div>
                        <span className="text-muted-foreground">{platform.engagement}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all duration-300"
                          style={{ 
                            width: `${(platform.engagement / 10) * 100}%`,
                            backgroundColor: platform.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Posts by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        dataKey="posts"
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ platform, posts }) => `${platform}: ${posts}`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Performing Posts */}
          <Card className="shadow-card mt-8">
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>
                Your best content from the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={post.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getPlatformIcon(post.platform)}
                          <span className="text-sm font-medium capitalize">{post.platform}</span>
                          <span className="text-xs text-muted-foreground">#{index + 1} top post</span>
                        </div>
                        <p className="text-sm leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Share className="w-4 h-4" />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ShowForTier>
      </div>
    </div>
  );
}