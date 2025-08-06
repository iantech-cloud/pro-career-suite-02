import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, BookOpen, Target, TrendingUp, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';

const CareerTransitionPage = () => {
  const transitionPhases = [
    {
      phase: '01',
      title: 'Self-Assessment & Planning',
      description: 'Identify your transferable skills, interests, and target industries',
      duration: '2-4 weeks',
      activities: [
        'Skills inventory and gap analysis',
        'Values and interests assessment',
        'Industry research and exploration',
        'Goal setting and timeline creation'
      ],
      tools: ['Skills assessment quiz', 'Industry comparison tool', 'Transition timeline planner']
    },
    {
      phase: '02',
      title: 'Skill Development',
      description: 'Bridge the gap between your current skills and target role requirements',
      duration: '3-6 months',
      activities: [
        'Identify skill gaps and learning priorities',
        'Complete relevant certifications',
        'Build portfolio or demonstration projects',
        'Gain practical experience through projects'
      ],
      tools: ['Learning path recommendations', 'Project idea generator', 'Portfolio builder']
    },
    {
      phase: '03',
      title: 'Network & Market Entry',
      description: 'Build connections in your target industry and start positioning yourself',
      duration: '1-3 months',
      activities: [
        'Industry networking and relationship building',
        'Informational interviews with professionals',
        'Attend industry events and conferences',
        'Build thought leadership through content'
      ],
      tools: ['Networking tracker', 'Event finder', 'Content calendar']
    },
    {
      phase: '04',
      title: 'Job Search & Transition',
      description: 'Execute your job search strategy and make the successful transition',
      duration: '2-6 months',
      activities: [
        'Tailor applications to new industry',
        'Prepare for industry-specific interviews',
        'Negotiate transition terms and timeline',
        'Plan smooth exit from current role'
      ],
      tools: ['Application tracker', 'Interview prep guides', 'Transition checklist']
    }
  ];

  const commonTransitions = [
    {
      from: 'Corporate to Startup',
      challenges: ['Fast-paced environment', 'Wearing multiple hats', 'Uncertainty and risk'],
      strategies: ['Highlight adaptability', 'Show entrepreneurial spirit', 'Demonstrate learning agility']
    },
    {
      from: 'Individual Contributor to Management',
      challenges: ['Leadership experience', 'People management', 'Strategic thinking'],
      strategies: ['Lead cross-functional projects', 'Mentor team members', 'Take business courses']
    },
    {
      from: 'Traditional to Tech Industry',
      challenges: ['Technical knowledge', 'Digital fluency', 'Industry terminology'],
      strategies: ['Learn relevant tech skills', 'Build digital presence', 'Network with tech professionals']
    },
    {
      from: 'Large Corp to Consulting',
      challenges: ['Client management', 'Project-based work', 'Business development'],
      strategies: ['Develop presentation skills', 'Build industry expertise', 'Practice problem-solving']
    }
  ];

  const successStories = [
    { metric: '78%', label: 'Successfully transition within 12 months' },
    { metric: '35%', label: 'Average salary increase post-transition' },
    { metric: '92%', label: 'Report higher job satisfaction' },
    { metric: '6 months', label: 'Average transition timeline' }
  ];

  return (
    <>
      <SEOHead 
        title="Career Transition Playbook - OneSocialStack | Successfully Change Careers"
        description="Complete guide to career transitions with step-by-step planning, skill development strategies, networking tactics, and industry change success stories. Navigate career changes confidently."
        keywords="career transition, career change, industry switch, professional development, career pivot, job change strategy, career planning"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-6 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Career Transition Playbook
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Navigate career changes with confidence using our step-by-step playbook. Whether switching industries, 
            roles, or career paths entirely, we'll guide you through every phase of successful transition.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {successStories.map((story, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">{story.metric}</div>
              <div className="text-sm text-muted-foreground">{story.label}</div>
            </div>
          ))}
        </div>

        {/* Transition Phases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">4-Phase Transition Process</h2>
          <div className="space-y-8">
            {transitionPhases.map((phase, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-2xl font-bold text-primary">{phase.phase}</div>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{phase.title}</CardTitle>
                      <CardDescription className="text-base">{phase.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Key Activities
                      </h4>
                      <div className="space-y-2">
                        {phase.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Available Tools
                      </h4>
                      <div className="space-y-2">
                        {phase.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Transitions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Common Career Transition Scenarios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specific strategies for the most common types of career transitions professionals make.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {commonTransitions.map((transition, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    {transition.from}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-red-600">Common Challenges:</h4>
                      <div className="space-y-1">
                        {transition.challenges.map((challenge, challengeIndex) => (
                          <div key={challengeIndex} className="text-sm text-muted-foreground">
                            • {challenge}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600">Success Strategies:</h4>
                      <div className="space-y-1">
                        {transition.strategies.map((strategy, strategyIndex) => (
                          <div key={strategyIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Integration */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transition Tools & Platform Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our platform tools to support every phase of your career transition journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Update Your CV</CardTitle>
                <CardDescription>
                  Rebuild your CV to highlight transferable skills for your target industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/cv-builder">
                    Build Transition CV
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
                <CardTitle>Network in New Industry</CardTitle>
                <CardDescription>
                  Build professional connections in your target industry through social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/social-publisher">
                    Expand Network
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Explore New Opportunities</CardTitle>
                <CardDescription>
                  Search for roles in your target industry and analyze job requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/jobs">
                    Browse Opportunities
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-subtle rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Make Your Career Transition?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your career transition journey with confidence using our comprehensive playbook and integrated tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:shadow-elegant">
              Start Transition Planning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">Unlock Full Playbook</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerTransitionPage;