import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Clock, Users, Wifi, Coffee, Target, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';

const RemoteWorkGuidePage = () => {
  const guideModules = [
    {
      icon: <Home className="w-6 h-6" />,
      title: 'Remote Workspace Setup',
      description: 'Create the perfect home office environment for maximum productivity',
      topics: ['Ergonomic workspace design', 'Essential equipment checklist', 'Lighting and acoustics', 'Productivity zones'],
      duration: '30 min'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Time Management Mastery',
      description: 'Proven strategies for managing time and staying productive remotely',
      topics: ['Time blocking techniques', 'Pomodoro method', 'Digital calendars', 'Productivity apps'],
      duration: '45 min'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Virtual Team Collaboration',
      description: 'Excel at working with distributed teams and virtual meetings',
      topics: ['Virtual meeting etiquette', 'Collaboration tools', 'Async communication', 'Team building'],
      duration: '40 min'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Work-Life Balance',
      description: 'Maintain healthy boundaries while working from home',
      topics: ['Setting boundaries', 'Avoiding burnout', 'Family coordination', 'Mental health'],
      duration: '35 min'
    }
  ];

  const remoteJobTips = [
    {
      title: 'Finding Remote Opportunities',
      points: [
        'Use remote-first job boards',
        'Network in virtual communities',
        'Optimize LinkedIn for remote work',
        'Highlight remote experience'
      ]
    },
    {
      title: 'Remote Interview Success',
      points: [
        'Test technology beforehand',
        'Prepare for virtual scenarios',
        'Show remote work skills',
        'Demonstrate self-motivation'
      ]
    },
    {
      title: 'Negotiating Remote Terms',
      points: [
        'Discuss equipment allowances',
        'Clarify work hour expectations',
        'Address timezone considerations',
        'Plan for occasional travel'
      ]
    }
  ];

  const productivityStats = [
    { metric: '25%', label: 'Increase in Productivity' },
    { metric: '40%', label: 'Better Work-Life Balance' },
    { metric: '60%', label: 'Reduced Commute Stress' },
    { metric: '30%', label: 'Cost Savings' }
  ];

  return (
    <>
      <SEOHead 
        title="Remote Work Success Guide - OneSocialStack | Master Remote Work & Find Remote Jobs"
        description="Complete guide to remote work success including workspace setup, productivity tips, team collaboration, and finding remote job opportunities. Expert strategies for thriving in remote environments."
        keywords="remote work guide, work from home tips, remote job search, virtual team collaboration, home office setup, remote work productivity, distributed teams"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-6 flex items-center justify-center">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Remote Work Success Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master the art of remote work with our comprehensive guide. From setting up your perfect home office 
            to finding remote opportunities and excelling in virtual teams.
          </p>
        </div>

        {/* Productivity Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {productivityStats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Guide Modules */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Remote Work Mastery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {guideModules.map((module, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                      {module.icon}
                    </div>
                    <Badge variant="outline">{module.duration}</Badge>
                  </div>
                  
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-base">{module.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full">
                    Start Module
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Remote Job Search */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Finding & Landing Remote Jobs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert strategies for discovering remote opportunities and succeeding in remote-first interviews.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {remoteJobTips.map((section, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools Integration */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Remote Work Tools & Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our platform tools to enhance your remote work experience and find opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Wifi className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Remote Job Search</CardTitle>
                <CardDescription>Find remote and flexible job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/jobs">
                    Browse Remote Jobs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Professional Networking</CardTitle>
                <CardDescription>Build your remote work network online</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/social-publisher">
                    Network Remotely
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Coffee className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Remote-Optimized CV</CardTitle>
                <CardDescription>Create a CV highlighting remote work skills</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/cv-builder">
                    Build Remote CV
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-subtle rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Master Remote Work?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've successfully transitioned to remote work and discovered the freedom of location independence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:shadow-elegant">
              Start Remote Work Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/jobs">Find Remote Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoteWorkGuidePage;