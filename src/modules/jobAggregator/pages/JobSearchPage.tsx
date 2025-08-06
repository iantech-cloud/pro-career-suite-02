import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { 
  Search, 
  MapPin, 
  Clock, 
  Heart, 
  ExternalLink, 
  Crown,
  Filter,
  Briefcase,
  DollarSign,
  Building,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobCard } from '../components/JobCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
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
  postedDate: Date;
  source: string;
  url: string;
  isSaved: boolean;
}

const JobSearchPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote, USA',
      type: 'remote',
      salary: '$80,000 - $120,000',
      description: 'We are looking for a Senior Frontend Developer to join our dynamic team...',
      requirements: ['React', 'TypeScript', '5+ years experience', 'Redux'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      source: 'TechJobs',
      url: 'https://example.com/job/1',
      isSaved: false
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: '$90,000 - $140,000',
      description: 'Join our innovative startup as a Full Stack Engineer...',
      requirements: ['Node.js', 'React', 'MongoDB', 'AWS'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      source: 'AngelList',
      url: 'https://example.com/job/2',
      isSaved: true
    },
    {
      id: '3',
      title: 'React Developer',
      company: 'Digital Agency Co.',
      location: 'New York, NY',
      type: 'contract',
      salary: '$70/hour',
      description: 'Contract position for an experienced React developer...',
      requirements: ['React', 'JavaScript', '3+ years experience'],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      source: 'Freelancer',
      url: 'https://example.com/job/3',
      isSaved: false
    }
  ]);

  const savedJobsCount = jobs.filter(job => job.isSaved).length;
  const maxSavedJobs = user?.tier === 'free' ? 5 : Infinity;
  const canSaveMore = user?.tier !== 'free' || savedJobsCount < maxSavedJobs;

  const handleSaveJob = (jobId: string) => {
    if (!canSaveMore) {
      // Show upgrade modal or redirect
      return;
    }
    
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const handleApplyWithCv = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Job Search
          </h1>
          <p className="text-muted-foreground mt-2">
            Find your next remote opportunity
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {user?.tier === 'free' && (
            <Badge variant="outline" className="text-muted-foreground">
              {savedJobsCount}/{maxSavedJobs} saved jobs
            </Badge>
          )}
          
          <Button variant="outline" asChild>
            <Link to="/jobs/saved">
              <Heart className="w-4 h-4 mr-2" />
              Saved Jobs ({savedJobsCount})
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <SearchFilterBar />
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{filteredJobs.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remote Jobs</p>
                <p className="text-2xl font-bold">
                  {filteredJobs.filter(job => job.type === 'remote').length}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saved Jobs</p>
                <p className="text-2xl font-bold">{savedJobsCount}</p>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Today</p>
                <p className="text-2xl font-bold">
                  {filteredJobs.filter(job => 
                    Date.now() - job.postedDate.getTime() < 24 * 60 * 60 * 1000
                  ).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Job Listings */}
        <div className="lg:col-span-2 space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => handleSaveJob(job.id)}
              onApply={() => handleApplyWithCv(job)}
              canSave={canSaveMore || job.isSaved}
              userTier={user?.tier || 'free'}
            />
          ))}
          
          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Job Alerts</CardTitle>
              <CardDescription>
                Get notified about new opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Alert
                </Button>
                
                {user?.tier === 'free' && (
                  <div className="text-xs text-muted-foreground">
                    Free users can create 1 job alert
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Apply */}
          <ShowForTier 
            requiredTier="pro"
            fallback={
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Quick Apply
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upgrade to Pro to apply with your CV in one click
                  </p>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/pricing">Upgrade Now</Link>
                  </Button>
                </CardContent>
              </Card>
            }
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Apply</CardTitle>
                <CardDescription>
                  Apply to jobs instantly with your saved CV
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click "Apply with CV" on any job listing to get started
                </p>
              </CardContent>
            </Card>
          </ShowForTier>

          {/* Salary Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Average Salary</span>
                  <span className="font-medium">$95,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remote Premium</span>
                  <span className="font-medium text-green-600">+15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Top Skill</span>
                  <span className="font-medium">React</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Apply with CV Modal */}
      {showApplyModal && selectedJob && (
        <ApplyWithCvModal
          job={selectedJob}
          isOpen={showApplyModal}
          onClose={() => {
            setShowApplyModal(false);
            setSelectedJob(null);
          }}
          userTier={user?.tier || 'free'}
        />
      )}
    </div>
  );
};

export default JobSearchPage;