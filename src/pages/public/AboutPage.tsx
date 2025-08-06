import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/common/SEOHead';
import { Users, Target, Award, Zap, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/placeholder.svg',
      bio: 'Former HR Director with 10+ years of experience helping professionals advance their careers.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/placeholder.svg',
      bio: 'Ex-Google engineer passionate about building tools that empower job seekers worldwide.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: '/placeholder.svg',
      bio: 'UX expert focused on creating intuitive experiences for career development.'
    },
    {
      name: 'David Kim',
      role: 'Head of AI',
      image: '/placeholder.svg',
      bio: 'AI researcher dedicated to leveraging technology for better career outcomes.'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'People-First',
      description: 'We believe every professional deserves tools that help them succeed, regardless of their background.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Our platform is designed to deliver measurable improvements in job search success rates.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in design, functionality, and user experience.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously evolve our platform with cutting-edge AI and automation technologies.'
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'We understand job searching can be stressful, so we build with compassion and care.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Our mission is to democratize professional opportunities for talent worldwide.'
    }
  ];

  return (
    <>
      <SEOHead 
        title="About OneSocialStack - Leading Career Development Platform | Our Story & Mission"
        description="Discover OneSocialStack's mission to revolutionize professional career management with AI-powered resume builder, social media management, and remote job search tools. Learn about our team, values, and commitment to helping professionals worldwide achieve career success through integrated technology solutions."
        keywords="about OneSocialStack, career development platform, professional resume builder company, AI career tools, social media management platform, remote job search engine, career advancement technology, professional development platform, resume optimization company, LinkedIn management tools, career success platform, job search innovation"
        canonical={`${window.location.origin}/about`}
      />
      <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white">Our Story</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Empowering Professional Success
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're on a mission to revolutionize how professionals build their careers, connect with opportunities, 
            and showcase their talents to the world.
          </p>
          <Button size="lg" className="bg-gradient-hero hover:shadow-elegant transition-all" asChild>
            <Link to="/auth?mode=signup">Join Our Mission</Link>
          </Button>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              In today's competitive job market, professionals need more than just skills—they need the right tools 
              to present themselves effectively, maintain their professional presence, and discover opportunities 
              that match their aspirations.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              CareerSuite was born from the frustration of juggling multiple platforms, outdated resume builders, 
              and scattered job boards. We envisioned a unified ecosystem where every aspect of professional 
              development works seamlessly together.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">CVs Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Posts Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25K+</div>
                <div className="text-sm text-muted-foreground">Jobs Applied</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-hero rounded-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Why We Exist</h3>
              <ul className="space-y-2">
                <li>• 73% of job seekers struggle with resume formatting</li>
                <li>• Professionals waste 2+ hours managing social media</li>
                <li>• Remote job searches span 15+ different platforms</li>
                <li>• Career tools rarely integrate with each other</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate professionals dedicated to transforming how the world approaches career development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-hero rounded-full mx-auto mb-4"></div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Story Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Complete Story Behind OneSocialStack</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding the challenges faced by modern professionals in managing their career development across multiple platforms and tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">The Problem We Identified</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through extensive research with over 10,000 professionals across various industries, we discovered that career management had become unnecessarily complex and fragmented. Professionals were struggling with outdated resume builders that produced generic templates, social media management tools that weren't designed for professional branding, and job search platforms that lacked integration and personalization.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The average professional was using 5-7 different tools for career management: one for resume building, another for LinkedIn management, several job boards for opportunities, and various other platforms for networking and professional development. This fragmentation led to inconsistent branding, wasted time, and missed opportunities.
              </p>
              <div className="bg-muted/30 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Key Challenges We Addressed:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Inconsistent professional branding across platforms</li>
                  <li>• Time-consuming manual posting and content creation</li>
                  <li>• ATS incompatible resume formats leading to rejections</li>
                  <li>• Lack of remote job opportunities in traditional job boards</li>
                  <li>• No integration between career management tools</li>
                  <li>• Limited analytics and insights for career optimization</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Our Innovative Solution</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                OneSocialStack was born from the vision of creating a truly integrated career management ecosystem. We developed an AI-powered platform that combines professional resume building, intelligent social media management, and advanced job search capabilities into one seamless experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our proprietary AI technology analyzes industry trends, job market demands, and successful career patterns to provide personalized recommendations for resume optimization, content creation, and job matching. This data-driven approach has helped thousands of professionals achieve faster career advancement and better opportunities.
              </p>
              <div className="bg-gradient-subtle rounded-lg p-6">
                <h4 className="font-semibold mb-3">Platform Innovations:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• AI-powered content optimization and keyword enhancement</li>
                  <li>• Cross-platform social media synchronization</li>
                  <li>• ATS-compatible resume templates with industry specificity</li>
                  <li>• Remote-first job search with advanced filtering</li>
                  <li>• Integrated application tracking and success analytics</li>
                  <li>• Personal branding consistency across all touchpoints</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technology and Innovation */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technology Powering Your Success</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Behind OneSocialStack's seamless user experience lies cutting-edge technology designed to optimize every aspect of your professional career management and growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Artificial Intelligence</h4>
              <p className="text-muted-foreground text-sm">
                Machine learning algorithms analyze millions of successful resumes and career paths to provide personalized optimization recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Global Integration</h4>
              <p className="text-muted-foreground text-sm">
                Seamlessly connect with major social media platforms, job boards, and professional networks worldwide for maximum reach.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Enterprise Security</h4>
              <p className="text-muted-foreground text-sm">
                Bank-level security protocols protect your professional data while ensuring seamless access across all your devices.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-6">Platform Performance & Reliability</h3>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Platform Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">&lt; 2s</div>
                <div className="text-sm text-muted-foreground">Average Load Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">System Monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">ISO 27001</div>
                <div className="text-sm text-muted-foreground">Security Certified</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Community Impact */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Growing Global Community</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              OneSocialStack has empowered professionals across 150+ countries to advance their careers, build stronger professional networks, and access better opportunities in the evolving world of remote work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Global Reach and Impact</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since our launch, OneSocialStack has facilitated over 25,000 successful job placements, helped professionals increase their social media engagement by an average of 340%, and enabled the creation of more than 100,000 optimized resumes that have passed ATS screening with a 87% success rate.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform supports professionals in every industry, from technology and healthcare to marketing and education. We're particularly proud of our impact on underrepresented communities, providing equal access to career advancement tools and opportunities regardless of background or location.
              </p>
            </div>
            <div className="bg-gradient-subtle rounded-lg p-8">
              <h4 className="font-semibold text-lg mb-6">Community Statistics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Countries Served</span>
                  <span className="font-bold text-xl text-primary">150+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Professionals</span>
                  <span className="font-bold text-xl text-primary">50,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Job Placements</span>
                  <span className="font-bold text-xl text-primary">25,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Partner Companies</span>
                  <span className="font-bold text-xl text-primary">5,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Salary Increase</span>
                  <span className="font-bold text-xl text-primary">32%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-background/60 backdrop-blur rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who have already discovered the power of our integrated career management platform. Start building your professional future today with OneSocialStack's comprehensive suite of career development tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:shadow-elegant transition-all" asChild>
              <Link to="/auth?mode=signup">Get Started Free Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">Explore Premium Features</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage;