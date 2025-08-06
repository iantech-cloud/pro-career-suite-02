import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  Search, 
  Calendar,
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal
} from 'lucide-react';
import { SocialPost } from '@/types/api';

export default function PostHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');

  // Mock posts data
  const [posts] = useState<SocialPost[]>([
    {
      id: '1',
      userId: '1',
      content: 'Excited to share my latest project! Built with React and TypeScript. #webdev #react',
      platforms: ['twitter', 'linkedin'],
      publishedAt: new Date('2024-01-20T10:00:00'),
      status: 'published',
      analytics: {
        impressions: 1250,
        likes: 45,
        comments: 12,
        shares: 8,
        clicks: 23
      }
    },
    {
      id: '2',
      userId: '1',
      content: 'Looking forward to the upcoming tech conference. Who else is attending? #techconf2024',
      platforms: ['twitter', 'linkedin', 'facebook'],
      scheduledFor: new Date('2024-01-25T14:00:00'),
      status: 'scheduled'
    },
    {
      id: '3',
      userId: '1',
      content: 'Check out this amazing sunset from my balcony! 🌅',
      platforms: ['instagram', 'facebook'],
      status: 'draft'
    },
    {
      id: '4',
      userId: '1',
      content: 'New blog post is live! Discussing the future of web development.',
      platforms: ['twitter'],
      publishedAt: new Date('2024-01-18T16:30:00'),
      status: 'published',
      analytics: {
        impressions: 890,
        likes: 28,
        comments: 5,
        shares: 12,
        clicks: 34
      }
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success/10 text-success border-success/20';
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'draft': return 'bg-muted text-muted-foreground border-border';
      case 'failed': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || post.platforms.includes(platformFilter);
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post History</h1>
          <p className="text-muted-foreground mt-1">
            View all your published, scheduled, and draft posts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
                <History className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(p => p.status === 'published').length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(p => p.status === 'scheduled').length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(p => p.status === 'draft').length}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Posts</CardTitle>
                <CardDescription>
                  Manage your social media content history
                </CardDescription>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All platforms" />
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
          </CardHeader>

          <CardContent className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {post.publishedAt 
                        ? `Published ${formatDate(post.publishedAt)}`
                        : post.scheduledFor
                        ? `Scheduled for ${formatDate(post.scheduledFor)}`
                        : 'Draft'
                      }
                    </p>
                    <p className="leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center space-x-4">
                      {/* Platforms */}
                      <div className="flex items-center space-x-2">
                        {post.platforms.map((platform, index) => (
                          <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                            {getPlatformIcon(platform)}
                            <span className="capitalize">{platform}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Status */}
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Analytics */}
                {post.analytics && (
                  <div className="flex items-center space-x-6 pt-4 border-t">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{post.analytics.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{post.analytics.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.analytics.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Share className="w-4 h-4" />
                      <span>{post.analytics.shares}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No posts found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}