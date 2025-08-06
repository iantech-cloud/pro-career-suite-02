import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, TrendingUp, MessageCircle, Share2, ArrowRight, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';

const LinkedInOptimizationPage = () => {
  const optimizationSteps = [
    {
      step: '01',
      title: 'Profile Foundation',
      description: 'Optimize your headline, summary, and professional photo',
      tasks: ['Professional headshot guide', 'Compelling headline formulas', 'Summary that converts', 'Skills optimization'],
      importance: 'High'
    },
    {
      step: '02',
      title: 'Content Strategy',
      description: 'Build authority through strategic content sharing',
      tasks: ['Content calendar templates', 'Post engagement tactics', 'Industry-specific topics', 'Visual content tips'],
      importance: 'Medium'
    },
    {
      step: '03',
      title: 'Network Building',
      description: 'Expand your professional network strategically',
      tasks: ['Connection request templates', 'Alumni network leverage', 'Industry leader outreach', 'Group participation'],
      importance: 'High'
    },
    {
      step: '04',
      title: 'Engagement Mastery',
      description: 'Increase visibility through meaningful interactions',
      tasks: ['Comment strategies', 'Message templates', 'Endorsement exchange', 'Recommendation requests'],
      importance: 'Medium'
    }
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Network Growth',
      description: 'Increase your network by 300% with strategic connection building',
      metric: '+300%'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Profile Views',
      description: 'Boost profile visibility and recruiter discovery rates',
      metric: '+500%'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Engagement',
      description: 'Increase post engagement and professional conversations',
      metric: '+250%'
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'Opportunities',
      description: 'Generate more job opportunities and business leads',
      metric: '+400%'
    }
  ];

  const checklistItems = [
    'Professional headshot uploaded',
    'Compelling headline with keywords',
    'Summary tells your career story',
    'Experience section optimized',
    'Skills section completed (50 skills)',
    'Education and certifications added',
    'Contact information visible',
    'Custom LinkedIn URL created',
    'Recommendations received (3+)',
    'Regular content posting schedule'
  ];

  return (
    <>
      <SEOHead 
        title="LinkedIn Optimization Toolkit - OneSocialStack | Maximize Your Professional Presence"
        description="Complete LinkedIn optimization guide with templates, strategies, and tools to maximize your professional networking, increase profile views, and generate job opportunities."
        keywords="LinkedIn optimization, professional networking, LinkedIn profile, social selling, personal branding, LinkedIn strategy, professional presence"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
            <Linkedin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            LinkedIn Optimization Toolkit
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your LinkedIn profile into a powerful career tool. Our comprehensive toolkit helps you 
            build authority, expand your network, and generate opportunities on the world's largest professional platform.
          </p>
        </div>

        {/* Results Banner */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm border">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <div className="text-2xl font-bold text-primary mb-2">{feature.metric}</div>
              <div className="font-semibold mb-2">{feature.title}</div>
              <div className="text-sm text-muted-foreground">{feature.description}</div>
            </div>
          ))}
        </div>

        {/* Optimization Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">4-Step LinkedIn Optimization Process</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {optimizationSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-primary">{step.step}</div>
                    <Badge variant={step.importance === 'High' ? 'default' : 'secondary'}>
                      {step.importance} Priority
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {step.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Checklist */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">LinkedIn Profile Optimization Checklist</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use this comprehensive checklist to ensure your LinkedIn profile is fully optimized for maximum impact.
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Profile Completion Checklist</CardTitle>
              <CardDescription>Complete all items for a fully optimized LinkedIn presence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0"></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Integration */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integrated LinkedIn Management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect your LinkedIn strategy with our social publishing tools for consistent professional presence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle>Content Scheduling</CardTitle>
                <CardDescription>Plan and schedule your LinkedIn posts for maximum engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/social-publisher/compose">
                    Schedule LinkedIn Posts
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Track your LinkedIn engagement and growth metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/social-publisher/analytics">
                    View Analytics
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle>Connection Management</CardTitle>
                <CardDescription>Manage your professional connections and outreach</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/social-publisher/connections">
                    Manage Connections
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-subtle rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your LinkedIn Presence?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with our LinkedIn optimization toolkit and start building a professional presence that generates opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:shadow-elegant" asChild>
              <Link to="/social-publisher">
                Start Optimizing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkedInOptimizationPage;