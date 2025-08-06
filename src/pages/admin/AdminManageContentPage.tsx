import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BlogManagement } from '@/components/admin/BlogManagement';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Image,
  Video,
  Settings
} from 'lucide-react';

const AdminManageContentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Content management settings have been updated successfully.",
    });
  };

  const blogPosts = [
    {
      id: '1',
      title: 'The Ultimate Guide to CV Writing in 2024',
      author: 'Career Expert',
      status: 'published',
      views: 1250,
      date: '2024-01-15',
      category: 'CV Tips'
    },
    {
      id: '2',
      title: 'How to Leverage Social Media for Job Search',
      author: 'Social Media Specialist',
      status: 'draft',
      views: 0,
      date: '2024-01-10',
      category: 'Job Search'
    }
  ];

  const templates = [
    {
      id: '1',
      name: 'Modern Professional',
      type: 'CV Template',
      status: 'active',
      downloads: 890,
      tier: 'free'
    },
    {
      id: '2',
      name: 'Executive Premium',
      type: 'CV Template',
      status: 'active',
      downloads: 445,
      tier: 'pro'
    }
  ];

  const media = [
    {
      id: '1',
      name: 'hero-bg-1.jpg',
      type: 'image',
      size: '2.4 MB',
      date: '2024-01-15',
      usage: 'Homepage Hero'
    },
    {
      id: '2',
      name: 'cv-preview.png',
      type: 'image',
      size: '890 KB',
      date: '2024-01-12',
      usage: 'CV Builder Preview'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Content Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage blog posts, templates, and media assets
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="blog" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Blog Posts */}
        <TabsContent value="blog" className="space-y-4">
          <BlogManagement />
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">CV Templates</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
          
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        <Badge variant={template.tier === 'pro' ? 'default' : 'secondary'}>
                          {template.tier}
                        </Badge>
                        <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                          {template.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>{template.type}</span>
                        <span>{template.downloads} downloads</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Media */}
        <TabsContent value="media" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Media Library</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      {item.type === 'image' ? (
                        <Image className="w-5 h-5" />
                      ) : (
                        <Video className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.size}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Usage: {item.usage}</p>
                    <p>Uploaded: {new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure content management preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Blog Settings</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Posts per page</label>
                    <Input defaultValue="10" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Auto-save interval (seconds)</label>
                    <Input defaultValue="30" className="mt-1" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Media Settings</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Max file size (MB)</label>
                    <Input defaultValue="10" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Allowed file types</label>
                    <Input defaultValue="jpg,png,gif,pdf,doc,docx" className="mt-1" />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminManageContentPage;