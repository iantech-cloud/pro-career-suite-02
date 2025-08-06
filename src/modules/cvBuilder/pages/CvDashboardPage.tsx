import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { PaymentButton } from '@/components/common/PaymentButton';
import { Plus, FileText, Edit, Download, Trash2, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CV {
  id: string;
  title: string;
  template: string;
  lastModified: Date;
  isActive: boolean;
}

const CvDashboardPage = () => {
  const { user } = useAuth();
  const [cvs, setCvs] = useState<CV[]>([
    {
      id: '1',
      title: 'Software Developer Resume',
      template: 'Modern',
      lastModified: new Date('2024-01-15'),
      isActive: true
    },
    {
      id: '2',
      title: 'Marketing Manager CV',
      template: 'Professional',
      lastModified: new Date('2024-01-10'),
      isActive: false
    }
  ]);

  const canCreateMore = user?.tier !== 'free' || cvs.length < 1;

  const handleDeleteCv = (id: string) => {
    setCvs(cvs.filter(cv => cv.id !== id));
  };

  const handleDuplicateCv = (cv: CV) => {
    if (!canCreateMore) return;
    
    const newCv: CV = {
      ...cv,
      id: Date.now().toString(),
      title: `${cv.title} (Copy)`,
      lastModified: new Date(),
      isActive: false
    };
    setCvs([newCv, ...cvs]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            CV Builder
          </h1>
          <p className="text-muted-foreground mt-2">
            Create professional resumes that get you hired
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.tier === 'free' && (
            <Badge variant="outline" className="text-muted-foreground">
              {cvs.length}/1 CVs used
            </Badge>
          )}
          
          <ShowForTier 
            requiredTier="pro"
            fallback={
              <PaymentButton
                variant="subscription"
                planName="Pro"
                amount={999}
                size="default"
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade for Unlimited CVs
              </PaymentButton>
            }
          >
            <Button variant="hero" asChild>
              <Link to="/cv-builder/new">
                <Plus className="w-4 h-4 mr-2" />
                Create New CV
              </Link>
            </Button>
          </ShowForTier>
          
          {user?.tier === 'free' && canCreateMore && (
            <Button variant="hero" asChild>
              <Link to="/cv-builder/new">
                <Plus className="w-4 h-4 mr-2" />
                Create CV
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total CVs</p>
                <p className="text-2xl font-bold">{cvs.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Download className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <ShowForTier requiredTier="pro">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Enhancements</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </ShowForTier>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">2 days ago</p>
              </div>
              <Edit className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CVs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cvs.map((cv) => (
          <Card key={cv.id} className="group hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{cv.title}</CardTitle>
                  <CardDescription>
                    Template: {cv.template}
                  </CardDescription>
                </div>
                {cv.isActive && (
                  <Badge className="bg-primary/10 text-primary">Active</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Last modified: {cv.lastModified.toLocaleDateString()}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/cv-builder/edit/${cv.id}`}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  
                  <ShowForTier requiredTier="pro">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDuplicateCv(cv)}
                    >
                      Duplicate
                    </Button>
                  </ShowForTier>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeleteCv(cv.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Create New Card */}
        {canCreateMore && (
          <Card className="border-dashed border-2 hover:border-primary transition-colors duration-300">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <Plus className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Create New CV</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Start building your professional resume
              </p>
              <Button variant="outline" asChild>
                <Link to="/cv-builder/new">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Upgrade Prompt for Free Users */}
        {!canCreateMore && (
          <Card className="border-dashed border-2 border-muted">
            <CardContent className="flex flex-col items-center justify-center h-48 p-6">
              <Crown className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Create unlimited CVs and unlock premium templates
              </p>
              <PaymentButton
                variant="subscription"
                planName="Pro"
                amount={999}
                size="default"
              >
                Upgrade Now
              </PaymentButton>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CvDashboardPage;