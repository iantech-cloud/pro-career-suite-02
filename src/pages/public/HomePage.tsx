import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { AIRobotAnimation } from '@/components/landing/AIRobotAnimation';
import { SEOHead } from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <>
      <SEOHead 
        title="OneSocialStack - AI-Powered Career Success Platform | Professional Resume Builder & Job Search"
        description="Transform your professional career with OneSocialStack's integrated platform featuring AI-powered CV builder, social media management, and remote job search. Create ATS-optimized resumes, schedule professional content across LinkedIn, Twitter, Facebook, and discover high-quality remote opportunities from top companies worldwide."
        keywords="CV builder, resume builder, ATS resume, social media scheduler, job search platform, remote jobs, career development tools, AI resume builder, professional development, LinkedIn scheduler, Twitter automation, Facebook posting, career management platform, online resume maker, job search engine, remote work opportunities, professional branding, career advancement tools, resume optimization, social media management, freelance opportunities"
        canonical={window.location.origin}
      />
      <div className="min-h-screen">
        <Hero />
        
        {/* Integrated Platform Section */}
        <section className="py-20 bg-gradient-subtle relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Content */}
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Integrated Career Success Platform
                </h2>
                <h3 className="text-xl text-primary font-semibold">
                  Streamline Your Professional Growth with OneSocialStack
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experience the power of integrated career management. Build professional resumes with AI assistance, maintain consistent social media presence for personal branding, and discover remote job opportunities - all synchronized to maximize your career advancement and professional visibility.
                </p>
              </div>

              {/* AI CV Building Animation */}
              <AIRobotAnimation />
            </div>
          </div>
        </section>
        
        {/* Quick Overview Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              
              {/* AI-Powered CV Builder */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">AI-Powered CV Builder</h3>
                <p className="text-muted-foreground">Professional templates + AI enhancement</p>
              </div>
              
              {/* Social Media Scheduler */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Social Media Scheduler</h3>
                <p className="text-muted-foreground">Multi-platform content management</p>
              </div>
              
              {/* Smart Job Search */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Smart Job Search</h3>
                <p className="text-muted-foreground">Remote opportunities + alerts</p>
              </div>
              
            </div>
          </div>
        </section>
        
        <Features />
        
        {/* Detailed Benefits Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose OneSocialStack for Your Career Success?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive career management platform addresses every aspect of professional growth, from building standout resumes to maintaining consistent social media presence and discovering the best remote opportunities in your field.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Professional Resume Builder with AI Enhancement</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Create professional, ATS-optimized resumes that get noticed by hiring managers and recruitment software alike. Our AI-powered enhancement technology analyzes your content and suggests improvements for better keyword optimization, impact statements, and industry-specific terminology that resonates with employers in your target field.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    ATS-friendly templates designed by career experts
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    AI-powered content optimization and keyword suggestions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Multiple export formats including PDF, Word, and HTML
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Industry-specific templates for various career fields
                  </li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-8">
                <h4 className="font-semibold text-lg mb-4">Professional Templates Available:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>• Executive Leadership</div>
                  <div>• Software Engineering</div>
                  <div>• Marketing & Sales</div>
                  <div>• Healthcare Professional</div>
                  <div>• Creative & Design</div>
                  <div>• Finance & Accounting</div>
                  <div>• Education & Training</div>
                  <div>• Consulting & Strategy</div>
                </div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="bg-muted/30 rounded-lg p-8 order-2 lg:order-1">
                <h4 className="font-semibold text-lg mb-4">Social Media Management Features:</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    <span>Cross-platform posting to LinkedIn, Twitter, Facebook, and Instagram</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    <span>Content calendar with optimal posting time recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    <span>Professional content templates and industry hashtag suggestions</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    <span>Engagement analytics and audience growth tracking</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h3 className="text-2xl font-bold">Smart Social Media Management for Professional Branding</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Maintain a consistent and professional online presence across all major social media platforms. Our intelligent scheduling system ensures your content reaches your network at optimal times, while our content suggestion engine helps you share relevant industry insights that position you as a thought leader in your field.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Build your personal brand with strategic content that showcases your expertise, celebrates professional achievements, and engages meaningfully with your industry community. Perfect for freelancers, entrepreneurs, job seekers, and established professionals looking to expand their network and visibility.
                </p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Advanced Job Search Engine with Remote Focus</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Access thousands of curated remote job opportunities from leading companies worldwide. Our advanced filtering system helps you find positions that match your skills, experience level, salary expectations, and preferred work arrangements. Get notified instantly when new opportunities matching your criteria become available.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Save time with one-click applications using your optimized CV, track your application progress, and receive insights on application success rates and market trends in your industry. Whether you're seeking full-time remote positions, freelance opportunities, or contract work, our platform connects you with quality employers actively hiring.
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-8">
                <h4 className="font-semibold text-lg mb-4">Job Search Capabilities:</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Remote Jobs Available</span>
                    <span className="font-semibold">50,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Companies Hiring</span>
                    <span className="font-semibold">5,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New Jobs Daily</span>
                    <span className="font-semibold">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Industry Categories</span>
                    <span className="font-semibold">25+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Success Stories Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Success Stories from Our Community
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of professionals who have accelerated their careers using OneSocialStack's integrated platform for resume building, social media management, and job searching.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg">Software Engineer</h4>
                  <p className="text-sm text-muted-foreground">Landed dream remote job at tech startup</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "Using OneSocialStack's AI-enhanced resume builder and job search engine, I found and secured a senior developer position at a fast-growing startup. The platform helped me optimize my technical resume and maintain an active LinkedIn presence that caught the recruiter's attention."
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">95% salary increase</span> • Remote position secured in 3 weeks
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg">Marketing Manager</h4>
                  <p className="text-sm text-muted-foreground">Built personal brand and freelance business</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "The social media management tools helped me build a strong personal brand across LinkedIn and Twitter. I now have a thriving freelance consulting business with clients who found me through my professional content and thought leadership posts."
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">300% LinkedIn engagement</span> • 12 new clients in 6 months
                </div>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg">UX Designer</h4>
                  <p className="text-sm text-muted-foreground">Transitioned to remote work successfully</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "After years in traditional office roles, I used OneSocialStack to rebrand myself for remote work. The platform's job alerts helped me discover remote design opportunities, and the resume templates perfectly showcased my portfolio and remote work capabilities."
                </p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">100% remote role</span> • Better work-life balance achieved
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Industry Insights Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Stay Ahead of Career Trends and Market Insights
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our platform provides real-time insights into job market trends, salary benchmarks, and industry demands to help you make informed career decisions and position yourself competitively.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">73%</div>
                <div className="text-sm text-muted-foreground">of professionals report better job prospects with optimized LinkedIn profiles</div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">2.5x</div>
                <div className="text-sm text-muted-foreground">higher interview rates with ATS-optimized resumes</div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">of remote workers report improved work-life balance</div>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">40%</div>
                <div className="text-sm text-muted-foreground">faster job search completion with integrated tools</div>
              </div>
            </div>
            
            <div className="mt-16 bg-gradient-subtle rounded-2xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Professional Career?</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join OneSocialStack today and experience the power of integrated career management. Build professional resumes, manage your social media presence, and discover amazing remote opportunities - all in one powerful platform designed for modern professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/auth?mode=signup">Start Your Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/pricing">View Pricing Plans</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
