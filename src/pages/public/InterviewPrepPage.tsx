import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users, Target, BookOpen, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';

const InterviewPrepPage = () => {
  const prepModules = [
    {
      id: '1',
      title: 'Behavioral Interview Mastery',
      description: 'Master the STAR method and tackle common behavioral questions with confidence',
      duration: '45 min',
      level: 'Beginner',
      topics: ['STAR Method', 'Leadership Questions', 'Conflict Resolution', 'Team Collaboration'],
      exercises: 15
    },
    {
      id: '2',
      title: 'Technical Interview Skills',
      description: 'Prepare for technical rounds with coding challenges and system design',
      duration: '90 min',
      level: 'Intermediate',
      topics: ['Coding Challenges', 'System Design', 'Problem Solving', 'Technical Communication'],
      exercises: 25
    },
    {
      id: '3',
      title: 'Executive Interview Strategy',
      description: 'Advanced strategies for C-level and senior management positions',
      duration: '60 min',
      level: 'Advanced',
      topics: ['Strategic Thinking', 'Vision Questions', 'Culture Fit', 'Industry Knowledge'],
      exercises: 12
    },
    {
      id: '4',
      title: 'Salary Negotiation Tactics',
      description: 'Learn to negotiate competitive packages with confidence',
      duration: '30 min',
      level: 'Intermediate',
      topics: ['Market Research', 'Negotiation Psychology', 'Counter Offers', 'Benefits Package'],
      exercises: 8
    }
  ];

  const commonQuestions = [
    "Tell me about yourself",
    "Why do you want to work here?",
    "What are your greatest strengths?",
    "Describe a challenging situation you faced",
    "Where do you see yourself in 5 years?",
    "Why are you leaving your current job?"
  ];

  return (
    <>
      <SEOHead 
        title="Interview Preparation Guide - OneSocialStack | Master Your Next Interview"
        description="Comprehensive interview preparation with behavioral questions, technical challenges, and salary negotiation strategies. Practice with real interview scenarios and expert guidance."
        keywords="interview preparation, job interview tips, behavioral questions, technical interviews, salary negotiation, interview practice"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Interview Preparation Mastery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master every type of interview with our comprehensive preparation guide. From behavioral questions 
            to technical challenges and salary negotiations - we've got you covered.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Practice Questions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Video Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">AI Practice</div>
          </div>
        </div>

        {/* Preparation Modules */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Interview Preparation Modules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {prepModules.map((module) => (
              <Card key={module.id} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{module.level}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {module.duration}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="text-base">{module.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{module.exercises} Practice Exercises</span>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>Interactive Practice</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Module
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Most Common Interview Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practice with the questions that appear in 90% of interviews. Get expert answers and tips.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonQuestions.map((question, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <p className="font-medium mb-4">"{question}"</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Target className="w-4 h-4 mr-2" />
                    <span>View Expert Answer</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Our Interview Prep Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Content</h3>
              <p className="text-muted-foreground text-sm">
                Curated by hiring managers and industry experts with real interview experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Practice</h3>
              <p className="text-muted-foreground text-sm">
                Practice with our AI interviewer for realistic interview simulations anytime.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Personalized Feedback</h3>
              <p className="text-muted-foreground text-sm">
                Get detailed feedback on your answers and improvement suggestions.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-subtle rounded-lg p-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Ace Your Next Interview?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've landed their dream jobs with our interview preparation system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-hero hover:shadow-elegant">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewPrepPage;