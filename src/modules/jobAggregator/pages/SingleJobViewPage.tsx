import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  Heart, 
  ExternalLink, 
  Crown,
  Briefcase,
  DollarSign,
  Building,
  Share,
  Flag,
  Calendar,
  User,
  CheckCircle2
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ApplyWithCvModal } from '../components/ApplyWithCvModal';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: Date;
  source: string;
  url: string;
  isSaved: boolean;
  companyLogo?: string;
  companyDescription?: string;
  applicants?: number;
  experience?: string;
}

const SingleJobViewPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  // Mock job data - in real app, this would be fetched based on id
  const [job, setJob] = useState<Job>({
    id: id || '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Remote, USA',
    type: 'remote',
    salary: '$80,000 - $120,000',
    description: `We are looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications. You'll work with cutting-edge technologies and collaborate with a passionate team of developers, designers, and product managers.

As a Senior Frontend Developer at TechCorp, you'll be responsible for creating responsive, performant, and accessible user interfaces that delight our users. You'll work closely with our design team to implement pixel-perfect designs and ensure a seamless user experience across all devices.`,
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of modern JavaScript (ES6+)',
      'Experience with state management libraries (Redux, Zustand)',
      'Proficiency in CSS-in-JS solutions (styled-components, emotion)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Knowledge of build tools (Webpack, Vite)',
      'Understanding of web performance optimization',
      'Experience with version control (Git)'
    ],
    responsibilities: [
      'Develop and maintain frontend applications using React and TypeScript',
      'Collaborate with designers to implement responsive and accessible UI components',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and provide constructive feedback',
      'Mentor junior developers and contribute to team growth',
      'Stay up-to-date with the latest frontend technologies and best practices',
      'Work with backend teams to integrate APIs and services'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Flexible work arrangements and remote-first culture',
      'Professional development budget ($2,000/year)',
      'Home office setup allowance',
      '4 weeks paid vacation + holidays',
      'Parental leave',
      'Company retreats and team building events'
    ],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    source: 'TechJobs',
    url: 'https://example.com/job/1',
    isSaved: false,
    companyDescription: 'TechCorp Inc. is a leading technology company focused on building innovative solutions for the modern web. Founded in 2015, we\'ve grown to a team of 200+ passionate individuals working to make the internet a better place.',
    applicants: 47,
    experience: 'Senior Level'
  });

  const canSave = user?.tier !== 'free' || true; // Simplified for demo

  const handleSaveJob = () => {
    setJob(prev => ({ ...prev, isSaved: !prev.isSaved }));
  };

  const handleApplyWithCv = () => {
    setShowApplyModal(true);
  };

  const handleExternalApply = () => {
    window.open(job.url, '_blank');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'full-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'part-time': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/jobs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Job Search
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(job.postedDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveJob}
                      disabled={!canSave}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${job.isSaved ? 'fill-current text-red-500' : ''}`} />
                      {job.isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <Badge className={getTypeColor(job.type)}>
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </Badge>
                  {job.salary && (
                    <Badge variant="outline">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {job.salary}
                    </Badge>
                  )}
                  {job.experience && (
                    <Badge variant="outline">
                      <User className="w-3 h-3 mr-1" />
                      {job.experience}
                    </Badge>
                  )}
                  {job.applicants && (
                    <Badge variant="outline">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {job.applicants} applicants
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Benefits & Perks</h3>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {job.companyDescription}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Apply for this job</CardTitle>
                <CardDescription>
                  Choose how you'd like to apply
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ShowForTier
                  requiredTier="pro"
                  fallback={
                    <div className="space-y-3">
                      <Button 
                        variant="hero" 
                        className="w-full"
                        onClick={handleExternalApply}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply on {job.source}
                      </Button>
                      <div className="bg-muted/50 border border-dashed rounded-lg p-4 text-center">
                        <Crown className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upgrade to Pro for one-click apply with your CV
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/pricing">Upgrade Now</Link>
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <div className="space-y-3">
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={handleApplyWithCv}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Quick Apply with CV
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleExternalApply}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply on {job.source}
                    </Button>
                  </div>
                </ShowForTier>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job Type</span>
                  <Badge className={getTypeColor(job.type)}>
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </Badge>
                </div>
                
                {job.salary && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary</span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted</span>
                  <span className="font-medium">{formatDate(job.postedDate)}</span>
                </div>
                
                {job.applicants && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applicants</span>
                    <span className="font-medium">{job.applicants}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-medium">{job.source}</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">Frontend Developer</h4>
                    <p className="text-xs text-muted-foreground">StartupABC • Remote</p>
                    <Badge variant="outline" className="mt-1 text-xs">$70k - $90k</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">React Developer</h4>
                    <p className="text-xs text-muted-foreground">WebCorp • New York, NY</p>
                    <Badge variant="outline" className="mt-1 text-xs">$85k - $110k</Badge>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">UI Developer</h4>
                    <p className="text-xs text-muted-foreground">DesignTech • Remote</p>
                    <Badge variant="outline" className="mt-1 text-xs">$75k - $95k</Badge>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/jobs">View More Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Apply with CV Modal */}
        {showApplyModal && (
          <ApplyWithCvModal
            job={job}
            isOpen={showApplyModal}
            onClose={() => setShowApplyModal(false)}
            userTier={user?.tier || 'free'}
          />
        )}
      </div>
    </div>
  );
};

export default SingleJobViewPage;