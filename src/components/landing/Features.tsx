import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Share2, 
  Briefcase, 
  Sparkles, 
  BarChart3, 
  Zap,
  Crown,
  Check
} from 'lucide-react';

export const Features = () => {
  const modules = [
    {
      icon: FileText,
      title: 'Professional Resume & CV Builder with AI',
      description: 'Create ATS-optimized resumes and CVs with AI-powered content suggestions, professional templates, and industry-specific formatting for maximum job application success.',
      features: {
        free: ['ATS-friendly templates', 'PDF export', 'Basic resume editing', 'Professional formatting'],
        pro: ['AI content optimization', 'Skills assessment', 'Multiple resume versions', 'Cover letter generator', 'LinkedIn profile sync']
      },
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Share2,
      title: 'Social Media Management & Content Scheduler',
      description: 'Build your professional brand with automated social media posting, content scheduling across platforms, and engagement analytics to grow your career network.',
      features: {
        free: ['Single platform posting', 'Basic scheduling', 'Content templates', 'Post history'],
        pro: ['Multi-platform publishing', 'Advanced analytics', 'Content calendar', 'Hashtag optimization', 'Team collaboration']
      },
      gradient: 'from-accent to-accent-glow'
    },
    {
      icon: Briefcase,
      title: 'Remote Job Search & Career Opportunities',
      description: 'Access curated remote job listings, set up intelligent job alerts, and track applications with advanced filtering for your perfect career opportunity.',
      features: {
        free: ['Remote job search', 'Basic filters', 'Saved job searches', 'Application tracking'],
        pro: ['Premium job alerts', 'Salary insights', 'Application analytics', 'Interview scheduling', 'Career coaching']
      },
      gradient: 'from-success to-emerald-400'
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <Badge variant="outline" className="px-3 py-1">
              Complete Career Management Tools
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            OneSocialStack: Your Complete
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Professional Career</span> Platform
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your career with our integrated suite of professional tools designed for modern job seekers, remote workers, and career-focused professionals seeking growth and opportunities.
          </p>
        </div>

        {/* Feature modules */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => (
            <Card key={index} className="relative overflow-hidden border-border shadow-card hover:shadow-primary transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <CardHeader className="relative">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-4`}>
                  <module.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </CardHeader>

              <CardContent className="relative space-y-6">
                {/* Free tier features */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline" className="text-xs">Free</Badge>
                  </div>
                  <ul className="space-y-2">
                    {module.features.free.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-muted-foreground" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro tier features */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="text-xs bg-gradient-hero border-0 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {module.features.pro.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration highlight */}
        <div className="bg-gradient-subtle rounded-2xl p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-6 h-6 text-primary" />
              <Badge variant="outline" className="px-3 py-1">
                Integrated Career Success Platform
              </Badge>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold">
              Streamline Your Professional Growth with OneSocialStack
            </h3>
            
            <p className="text-lg text-muted-foreground">
              Experience the power of integrated career management. Build professional resumes with AI assistance, maintain consistent social media presence for personal branding, and discover remote job opportunities - all synchronized to maximize your career advancement and professional visibility.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/auth?mode=signup">Start Building Your Career Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">Compare Plans & Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};