import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { toast } from '@/hooks/use-toast';

const BlogListPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [email, setEmail] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(3);

  const allPosts = [
    {
      id: '1',
      title: 'The Ultimate Guide to CV Writing in 2024',
      excerpt: 'Learn how to create a compelling CV that stands out to recruiters and passes ATS systems.',
      author: 'Career Expert',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'CV Tips',
      slug: 'ultimate-guide-cv-writing-2024'
    },
    {
      id: '2',
      title: 'How to Leverage Social Media for Job Search',
      excerpt: 'Discover the best strategies for using social platforms to enhance your job search efforts.',
      author: 'Social Media Specialist',
      date: '2024-01-10',
      readTime: '7 min read',
      category: 'Job Search',
      slug: 'leverage-social-media-job-search'
    },
    {
      id: '3',
      title: 'Top Job Search Trends for This Year',
      excerpt: 'Stay ahead of the curve with the latest trends in recruitment and job searching.',
      author: 'HR Professional',
      date: '2024-01-05',
      readTime: '4 min read',
      category: 'Trends',
      slug: 'top-job-search-trends'
    }
  ];

  // Filter posts based on category
  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Get visible posts for pagination
  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  // Handle category filtering
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setVisiblePosts(3); // Reset visible posts when filtering
  };

  // Handle newsletter signup
  const handleNewsletterSignup = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail('');
  };

  // Handle load more
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  // Handle resource navigation
  const handleResourceNavigation = (resource: string) => {
    const routes = {
      'Resume Templates': '/resources/resume-templates',
      'Interview Preparation Guide': '/resources/interview-prep',
      'LinkedIn Optimization Toolkit': '/resources/linkedin-optimization',
      'Remote Work Success Guide': '/resources/remote-work-guide',
      'Salary Negotiation Strategies': '/resources/salary-negotiation',
      'Career Transition Playbook': '/resources/career-transition'
    };
    
    const route = routes[resource as keyof typeof routes];
    if (route) {
      navigate(route);
    } else {
      toast({
        title: "Coming Soon",
        description: `${resource} will be available soon. Stay tuned!`,
      });
    }
  };

  return (
    <>
      <SEOHead 
        title="Career Development Blog - OneSocialStack | Expert Tips & Professional Insights"
        description="Discover expert career advice, resume writing tips, social media strategies, and job search insights from OneSocialStack's professional development blog. Learn from industry experts and accelerate your career growth with actionable advice on resume optimization, LinkedIn management, remote work opportunities, and professional branding."
        keywords="career development blog, resume writing tips, job search advice, professional development, LinkedIn strategies, career advancement, remote work tips, interview preparation, professional branding, social media for professionals, career coaching, job market trends, resume optimization, networking strategies, career growth blog"
        canonical={`${window.location.origin}/blog`}
      />
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Career Development Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert insights, proven strategies, and actionable advice to accelerate your professional growth. From resume optimization to social media management and remote job searching, discover the tools and techniques that successful professionals use to advance their careers.
          </p>
          
      {/* Blog Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('all')}
            >
              All Categories
            </Badge>
            <Badge 
              variant={selectedCategory === 'cv tips' ? 'default' : 'outline'} 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('cv tips')}
            >
              Resume & CV Tips
            </Badge>
            <Badge 
              variant={selectedCategory === 'job search' ? 'default' : 'outline'} 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('job search')}
            >
              Social Media Strategy
            </Badge>
            <Badge 
              variant={selectedCategory === 'trends' ? 'default' : 'outline'} 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('trends')}
            >
              Remote Job Search
            </Badge>
            <Badge 
              variant="outline" 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('career development')}
            >
              Career Development
            </Badge>
            <Badge 
              variant="outline" 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('interview preparation')}
            >
              Interview Preparation
            </Badge>
            <Badge 
              variant="outline" 
              className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              onClick={() => handleCategoryFilter('professional networking')}
            >
              Professional Networking
            </Badge>
          </div>
        </div>
        
        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Career Insights</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Market Trends</h3>
              <p className="text-muted-foreground text-sm">
                Stay ahead with insights into the latest job market trends, salary benchmarks, and industry demands across various sectors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Career Strategy</h3>
              <p className="text-muted-foreground text-sm">
                Learn proven strategies for career advancement, skill development, and professional goal achievement from industry experts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Tips</h3>
              <p className="text-muted-foreground text-sm">
                Practical advice and actionable tips from career coaches, recruiters, and successful professionals in your field.
              </p>
            </div>
          </div>
        </div>

      {/* Blog Posts Grid */}
      <div className="space-y-8">
        {displayedPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline">{post.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl hover:text-primary transition-colors">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-4 h-4 mr-1" />
                  By {post.author}
                </div>
                <Button variant="outline" asChild>
                  <Link to={`/blog/${post.slug}`}>
                    Read More
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Career Resources Section */}
      <div className="mt-20 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Career Development Resources</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Beyond our blog articles, explore our extensive library of career development resources designed to support every stage of your professional journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Resume Templates & Examples</CardTitle>
              <CardDescription>
                Download professional resume templates optimized for ATS systems and various industries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access our library of 50+ professional resume templates, each designed for specific industries and career levels. All templates are ATS-compatible and include expert writing guidelines.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleResourceNavigation('Resume Templates')}
              >
                Browse Templates
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Interview Preparation Guide</CardTitle>
              <CardDescription>
                Comprehensive guides for acing interviews across different industries and roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Master the art of interviewing with our detailed guides covering behavioral questions, technical interviews, salary negotiation, and follow-up strategies.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleResourceNavigation('Interview Preparation Guide')}
              >
                Start Preparing
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">LinkedIn Optimization Toolkit</CardTitle>
              <CardDescription>
                Tools and strategies to maximize your LinkedIn presence and professional networking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Transform your LinkedIn profile into a powerful career tool with our optimization checklist, content templates, and networking strategies.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleResourceNavigation('LinkedIn Optimization Toolkit')}
              >
                Optimize Profile
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Remote Work Success Guide</CardTitle>
              <CardDescription>
                Essential strategies for succeeding in remote work environments and virtual teams.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to thrive in remote work settings with guides on productivity, communication, work-life balance, and remote team collaboration.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleResourceNavigation('Remote Work Success Guide')}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Salary Negotiation Strategies</CardTitle>
              <CardDescription>
                Research-backed techniques for negotiating competitive compensation packages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Master salary negotiation with our comprehensive guide covering market research, negotiation tactics, and post-offer strategies for maximum compensation.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleResourceNavigation('Salary Negotiation Strategies')}
              >
                Start Negotiating
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Career Transition Playbook</CardTitle>
              <CardDescription>
                Step-by-step guidance for successfully changing careers or industries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Navigate career transitions confidently with our playbook covering skill assessment, industry research, networking strategies, and application approaches.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleResourceNavigation('Career Transition Playbook')}
              >
                Plan Transition
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-gradient-subtle rounded-lg p-12 text-center mb-16">
        <h3 className="text-2xl font-bold mb-4">Stay Updated with Weekly Career Insights</h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join 25,000+ professionals who receive our weekly newsletter featuring the latest career trends, job market insights, and exclusive tips from industry experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
          />
          <Button 
            className="bg-gradient-hero hover:shadow-elegant transition-all"
            onClick={handleNewsletterSignup}
          >
            Subscribe Now
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          No spam, unsubscribe anytime. View our privacy policy.
        </p>
      </div>

      {/* Load More */}
      {filteredPosts.length > visiblePosts && (
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLoadMore}
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
    </>
  );
};

export default BlogListPage;