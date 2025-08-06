import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  BarChart3,
  Filter
} from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { blogService } from '@/services/blogService';
import { BlogPostForm } from './BlogPostForm';

export const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, statusFilter, categoryFilter]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  };

  const handleCreatePost = () => {
    setEditingPost(undefined);
    setShowForm(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(postId);
        setPosts(prev => prev.filter(post => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleSavePost = (savedPost: BlogPost) => {
    if (editingPost) {
      // Update existing post
      setPosts(prev => prev.map(post => 
        post.id === savedPost.id ? savedPost : post
      ));
    } else {
      // Add new post
      setPosts(prev => [savedPost, ...prev]);
    }
    setShowForm(false);
    setEditingPost(undefined);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPost(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));

  if (showForm) {
    return (
      <BlogPostForm
        post={editingPost}
        onSave={handleSavePost}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage blog posts</p>
        </div>
        <Button onClick={handleCreatePost}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg truncate">{post.title}</h3>
                      {post.featured && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Featured
                        </Badge>
                      )}
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>By {post.author}</span>
                      <span>{post.category}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm" title="View">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditPost(post)}
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-destructive hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredPosts.length === 0 && !isLoading && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No blog posts found.</p>
                <Button onClick={handleCreatePost} className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};