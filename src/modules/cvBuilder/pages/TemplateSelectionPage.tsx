import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { Search, Crown, Check, ArrowLeft, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  isPro: boolean;
  description: string;
  downloads: number;
  rating: number;
}

const TemplateSelectionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates: Template[] = [
    {
      id: 'modern-basic',
      name: 'Modern Basic',
      category: 'professional',
      preview: '/api/placeholder/300/400',
      isPro: false,
      description: 'Clean and professional design perfect for any industry',
      downloads: 15420,
      rating: 4.8
    },
    {
      id: 'classic-elegant',
      name: 'Classic Elegant',
      category: 'traditional',
      preview: '/api/placeholder/300/400',
      isPro: false,
      description: 'Timeless design that works well for conservative industries',
      downloads: 12890,
      rating: 4.7
    },
    {
      id: 'creative-bold',
      name: 'Creative Bold',
      category: 'creative',
      preview: '/api/placeholder/300/400',
      isPro: true,
      description: 'Stand out with this vibrant and creative template',
      downloads: 8920,
      rating: 4.9
    },
    {
      id: 'executive-premium',
      name: 'Executive Premium',
      category: 'executive',
      preview: '/api/placeholder/300/400',
      isPro: true,
      description: 'Sophisticated design for senior-level positions',
      downloads: 6750,
      rating: 4.9
    },
    {
      id: 'minimal-clean',
      name: 'Minimal Clean',
      category: 'minimal',
      preview: '/api/placeholder/300/400',
      isPro: true,
      description: 'Less is more with this ultra-clean design',
      downloads: 9340,
      rating: 4.6
    },
    {
      id: 'tech-modern',
      name: 'Tech Modern',
      category: 'tech',
      preview: '/api/placeholder/300/400',
      isPro: true,
      description: 'Perfect for technology and startup roles',
      downloads: 7890,
      rating: 4.8
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'executive', name: 'Executive' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'tech', name: 'Technology' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const canUseTemplate = (template: Template) => {
    return !template.isPro || user?.tier === 'pro' || user?.tier === 'admin';
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(`/cv-builder/new?template=${selectedTemplate}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/cv-builder">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to CV Builder
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Choose a Template
            </h1>
            <p className="text-muted-foreground mt-2">
              Select a professional template to get started
            </p>
          </div>
        </div>
        
        {selectedTemplate && (
          <Button variant="hero" onClick={handleContinue}>
            Continue with Template
            <Check className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-elegant ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary bg-primary/5'
                : canUseTemplate(template)
                ? 'hover:bg-muted/50'
                : 'opacity-75'
            }`}
            onClick={() => canUseTemplate(template) && handleSelectTemplate(template.id)}
          >
            <CardContent className="p-0">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-muted rounded-t-lg relative overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Badge */}
                {template.isPro && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                )}
                
                {/* Selected Overlay */}
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-white rounded-full p-2">
                      <Check className="w-6 h-6" />
                    </div>
                  </div>
                )}
                
                {/* Locked Overlay for non-accessible pro templates */}
                {template.isPro && !canUseTemplate(template) && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Crown className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">Pro Only</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{template.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>★ {template.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{template.downloads.toLocaleString()} downloads</span>
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.id === template.category)?.name}
                  </Badge>
                </div>
                
                {/* Pro upgrade prompt */}
                {template.isPro && !canUseTemplate(template) && (
                  <ShowForTier
                    requiredTier="pro"
                    fallback={
                      <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                        <Link to="/pricing">
                          <Crown className="w-3 h-3 mr-1" />
                          Upgrade to Use
                        </Link>
                      </Button>
                    }
                  >
                    <div></div>
                  </ShowForTier>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button variant="outline" onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Footer CTA */}
      {!selectedTemplate && (
        <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Can't find the perfect template?</h3>
          <p className="text-muted-foreground mb-4">
            Start with a basic template and customize it to your needs
          </p>
          <Button variant="outline" onClick={() => handleSelectTemplate('modern-basic')}>
            Start with Basic Template
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelectionPage;