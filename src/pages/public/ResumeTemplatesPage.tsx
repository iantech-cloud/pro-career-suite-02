import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';

const ResumeTemplatesPage = () => {
  const templates = [
    {
      id: '1',
      name: 'Professional Executive',
      category: 'Executive',
      description: 'Clean, professional layout perfect for senior-level positions',
      features: ['ATS-Optimized', 'Modern Design', 'Multi-page Support'],
      preview: '/placeholder.svg',
      popular: true
    },
    {
      id: '2',
      name: 'Creative Designer',
      category: 'Creative',
      description: 'Visually striking template for creative professionals',
      features: ['Portfolio Section', 'Visual Elements', 'Customizable Colors'],
      preview: '/placeholder.svg',
      popular: false
    },
    {
      id: '3',
      name: 'Tech Professional',
      category: 'Technology',
      description: 'Modern template optimized for tech industry roles',
      features: ['Skills Matrix', 'Project Showcase', 'GitHub Integration'],
      preview: '/placeholder.svg',
      popular: true
    },
    {
      id: '4',
      name: 'Entry Level',
      category: 'Student',
      description: 'Perfect for recent graduates and entry-level positions',
      features: ['Education Focus', 'Skills Highlight', 'Simple Layout'],
      preview: '/placeholder.svg',
      popular: false
    }
  ];

  const categories = ['All', 'Executive', 'Creative', 'Technology', 'Student', 'Healthcare', 'Finance'];

  return (
    <>
      <SEOHead 
        title="Professional Resume Templates - OneSocialStack | ATS-Optimized CV Templates"
        description="Browse our collection of 50+ professional resume templates. All templates are ATS-compatible and designed for specific industries. Download and customize for free."
        keywords="resume templates, CV templates, ATS-optimized resumes, professional templates, resume examples, job application templates"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose from our collection of 50+ professionally designed, ATS-optimized resume templates. 
            Each template is crafted for specific industries and career levels to help you stand out.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant="outline" 
                className="hover:bg-primary hover:text-primary-foreground cursor-pointer px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-subtle rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Our Templates Work</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>ATS-Compatible Format</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Industry-Specific Designs</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Expert Writing Guidelines</span>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-elegant transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{template.category}</Badge>
                  {template.popular && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                
                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to="/cv-builder/templates">
                        <Download className="w-4 h-4 mr-2" />
                        Use Template
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-subtle rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Professional Resume?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access all templates and use our AI-powered resume builder to create a compelling CV that gets results.
          </p>
          <Button asChild size="lg" className="bg-gradient-hero hover:shadow-elegant">
            <Link to="/cv-builder">
              Start Building Your Resume
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ResumeTemplatesPage;