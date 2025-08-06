import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Target, Shield, Briefcase, ArrowRight, CheckCircle, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';

const SalaryNegotiationPage = () => {
  const negotiationSteps = [
    {
      step: '01',
      title: 'Market Research',
      description: 'Know your worth with comprehensive salary data and industry benchmarks',
      tactics: ['Industry salary reports', 'Geographic adjustments', 'Experience level analysis', 'Company size factors'],
      difficulty: 'Beginner'
    },
    {
      step: '02',
      title: 'Value Proposition',
      description: 'Build a compelling case based on your unique contributions and achievements',
      tactics: ['Quantify your impact', 'Document achievements', 'Skill assessment', 'Future value projection'],
      difficulty: 'Intermediate'
    },
    {
      step: '03',
      title: 'Negotiation Strategy',
      description: 'Master the psychology and tactics of effective salary negotiations',
      tactics: ['Opening anchors', 'Counteroffer strategies', 'Non-salary benefits', 'Timeline management'],
      difficulty: 'Advanced'
    },
    {
      step: '04',
      title: 'Closing & Follow-up',
      description: 'Secure your agreement and maintain positive relationships',
      tactics: ['Written confirmations', 'Implementation timeline', 'Performance reviews', 'Future negotiations'],
      difficulty: 'Intermediate'
    }
  ];

  const negotiationScenarios = [
    {
      scenario: 'New Job Offer',
      description: 'Strategies for negotiating compensation with new employers',
      keyPoints: ['Market rate research', 'Total compensation analysis', 'Counter-offer timing', 'Benefits evaluation']
    },
    {
      scenario: 'Internal Promotion',
      description: 'Approach for salary increases within your current company',
      keyPoints: ['Performance documentation', 'Internal equity research', 'Timing strategies', 'Manager relationships']
    },
    {
      scenario: 'Annual Review',
      description: 'Making the case during performance review cycles',
      keyPoints: ['Achievement summaries', 'Goal alignment', 'Future commitments', 'Market adjustments']
    },
    {
      scenario: 'Role Expansion',
      description: 'Compensation adjustments for increased responsibilities',
      keyPoints: ['Scope documentation', 'Additional value creation', 'Skill development', 'Market comparison']
    }
  ];

  const benefitsToNegotiate = [
    'Base Salary',
    'Signing Bonus',
    'Stock Options/Equity',
    'Annual Bonus',
    'Vacation Time',
    'Flexible Work Arrangements',
    'Professional Development Budget',
    'Health Benefits',
    'Retirement Contributions',
    'Technology Allowance'
  ];

  const successMetrics = [
    { metric: '15-25%', label: 'Average Salary Increase' },
    { metric: '85%', label: 'Success Rate with Preparation' },
    { metric: '40%', label: 'Don\'t Negotiate (Missing Out)' },
    { metric: '$1M+', label: 'Lifetime Earnings Impact' }
  ];

  return (
    <>
      <SEOHead 
        title="Salary Negotiation Strategies - OneSocialStack | Master Compensation Negotiations"
        description="Learn proven salary negotiation tactics, market research strategies, and expert techniques to maximize your compensation. Research-backed methods for negotiating competitive packages."
        keywords="salary negotiation, compensation negotiation, salary increase, job offer negotiation, pay raise strategies, benefits negotiation, salary research"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-6 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Salary Negotiation Mastery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master the art and science of salary negotiation with research-backed strategies. Learn to confidently 
            negotiate competitive compensation packages that reflect your true value.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm border">
              <div className="text-3xl font-bold text-primary mb-2">{metric.metric}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Negotiation Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">4-Step Negotiation Process</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {negotiationSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-primary">{step.step}</div>
                    <Badge variant={step.difficulty === 'Advanced' ? 'default' : 'secondary'}>
                      {step.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {step.tactics.map((tactic, tacticIndex) => (
                      <div key={tacticIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{tactic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Negotiation Scenarios */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Common Negotiation Scenarios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master different negotiation contexts with scenario-specific strategies and tactics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {negotiationScenarios.map((scenario, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-primary" />
                    {scenario.scenario}
                  </CardTitle>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {scenario.keyPoints.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Negotiation */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Beyond Base Salary: Total Compensation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Salary is just one piece. Learn to negotiate the complete compensation package for maximum value.
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Negotiable Compensation Elements
              </CardTitle>
              <CardDescription>
                Don't just focus on salary - these elements can significantly increase your total compensation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {benefitsToNegotiate.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools & Resources */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Negotiation Tools & Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access our integrated tools to research, prepare, and execute successful negotiations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Salary Research</CardTitle>
                <CardDescription>Use job market data to understand your worth</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/jobs">
                    Research Market Rates
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Interview Prep</CardTitle>
                <CardDescription>Practice negotiation scenarios and responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/resources/interview-prep">
                    Practice Negotiations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Compensation Calculator</CardTitle>
                <CardDescription>Calculate total compensation value</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Launch Calculator
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-subtle rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Negotiate Like a Pro?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start maximizing your earning potential with our comprehensive salary negotiation toolkit and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:shadow-elegant">
              Start Negotiation Course
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">Unlock Full Access</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalaryNegotiationPage;