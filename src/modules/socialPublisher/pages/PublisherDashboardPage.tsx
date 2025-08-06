import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { 
  Plus, 
  Calendar, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Crown,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Send,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  content: string;
  platforms: string[];
  scheduledFor: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const PublisherDashboardPage = () => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  const [posts] = useState<Post[]>([
    {
      id: '1',
      content: 'Excited to share my latest project! 🚀',
      platforms: ['twitter', 'linkedin'],
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'scheduled',
      engagement: { likes: 15, shares: 3, comments: 2 }
    },
    {
      id: '2',
      content: 'Just published a new blog post about React best practices',
      platforms: ['linkedin', 'twitter'],
      scheduledFor: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'published',
      engagement: { likes: 42, shares: 8, comments: 5 }
    }
  ]);

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, limit: 280, connected: true },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, limit: 3000, connected: true },
    { id: 'facebook', name: 'Facebook', icon: Facebook, limit: 63206, connected: false },
    { id: 'instagram', name: 'Instagram', icon: Instagram, limit: 2200, connected: false }
  ];

  const monthlyPostsUsed = user?.tier === 'free' ? posts.length : 0;
  const monthlyPostsLimit = user?.tier === 'free' ? 5 : Infinity;
  const canCreatePost = user?.tier !== 'free' || monthlyPostsUsed < monthlyPostsLimit;

  const handlePublish = () => {
    if (!newPost.trim() || selectedPlatforms.length === 0) return;
    
    console.log('Publishing post:', {
      content: newPost,
      platforms: selectedPlatforms
    });
    
    // Reset form
    setNewPost('');
    setSelectedPlatforms([]);
  };

  const handleSchedule = () => {
    if (!newPost.trim() || selectedPlatforms.length === 0) return;
    
    console.log('Scheduling post:', {
      content: newPost,
      platforms: selectedPlatforms
    });
    
    // Reset form
    setNewPost('');
    setSelectedPlatforms([]);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Social Publisher
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and schedule your social media presence
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.tier === 'free' && (
            <Badge variant="outline" className="text-muted-foreground">
              {monthlyPostsUsed}/{monthlyPostsLimit} posts this month
            </Badge>
          )}
          
          <Button variant="outline" asChild>
            <Link to="/social-publisher/connections">
              <Plus className="w-4 h-4 mr-2" />
              Connect Accounts
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.status === 'scheduled').length}
                </p>
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
                  <p className="text-sm text-muted-foreground">Total Engagement</p>
                  <p className="text-2xl font-bold">
                    {posts.reduce((sum, post) => 
                      sum + (post.engagement?.likes || 0) + (post.engagement?.shares || 0), 0
                    )}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </ShowForTier>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Accounts</p>
                <p className="text-2xl font-bold">
                  {platforms.filter(p => p.connected).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Post Composer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
              <CardDescription>
                Compose and schedule your social media content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
                disabled={!canCreatePost}
              />
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {newPost.length} / {selectedPlatforms.length > 0 
                    ? Math.min(...selectedPlatforms.map(id => 
                        platforms.find(p => p.id === id)?.limit || 280
                      ))
                    : 280
                  } characters
                </span>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Platforms</label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    
                    return (
                      <Button
                        key={platform.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePlatform(platform.id)}
                        disabled={!platform.connected || !canCreatePost}
                        className="justify-start"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {platform.name}
                        {!platform.connected && (
                          <Badge variant="outline" className="ml-auto text-xs">
                            Connect
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {!canCreatePost ? (
                <div className="bg-muted/50 border border-dashed rounded-lg p-4 text-center">
                  <Crown className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    You've reached your monthly posting limit
                  </p>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/pricing">Upgrade to Pro</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleSchedule}
                    disabled={!newPost.trim() || selectedPlatforms.length === 0}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                  <Button 
                    variant="hero"
                    onClick={handlePublish}
                    disabled={!newPost.trim() || selectedPlatforms.length === 0}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm">{post.content}</p>
                      <Badge variant={
                        post.status === 'published' ? 'default' : 
                        post.status === 'scheduled' ? 'secondary' : 'outline'
                      }>
                        {post.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>
                        {post.platforms.map(p => 
                          platforms.find(pl => pl.id === p)?.name
                        ).join(', ')}
                      </span>
                      <span>
                        {post.status === 'scheduled' ? 'Scheduled for' : 'Published'}: {' '}
                        {post.scheduledFor.toLocaleDateString()}
                      </span>
                    </div>
                    
                    {post.engagement && (
                      <ShowForTier requiredTier="pro">
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span>❤️ {post.engagement.likes}</span>
                          <span>🔄 {post.engagement.shares}</span>
                          <span>💬 {post.engagement.comments}</span>
                        </div>
                      </ShowForTier>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Analytics Preview */}
          <ShowForTier 
            requiredTier="pro"
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upgrade to Pro to see detailed analytics and insights
                  </p>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/pricing">Upgrade Now</Link>
                  </Button>
                </CardContent>
              </Card>
            }
          >
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">This Week</span>
                    <span className="text-sm font-medium">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Engagement Rate</span>
                    <span className="text-sm font-medium">4.2%</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/social-publisher/analytics">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ShowForTier>

          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <div key={platform.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{platform.name}</span>
                      </div>
                      <Badge variant={platform.connected ? "default" : "secondary"}>
                        {platform.connected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link to="/social-publisher/connections">Manage Connections</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublisherDashboardPage;