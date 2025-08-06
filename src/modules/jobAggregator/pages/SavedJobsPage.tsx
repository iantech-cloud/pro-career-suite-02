import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Bookmark, Search, MapPin, Calendar, ExternalLink, Trash2 } from 'lucide-react';

export default function SavedJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock saved jobs
  const savedJobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'full-time',
      salary: '$80,000 - $120,000',
      savedAt: new Date('2024-01-20'),
      notes: 'Great company culture, interesting projects'
    },
    {
      id: '2',
      title: 'Frontend Engineer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: '$90,000 - $130,000',
      savedAt: new Date('2024-01-18'),
      notes: 'Early stage startup, equity opportunity'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Saved Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Manage your saved job opportunities
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Saved Jobs ({savedJobs.length})</CardTitle>
                <CardDescription>
                  Jobs you've bookmarked for future reference
                </CardDescription>
              </div>
            </div>

            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search saved jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {savedJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                      <span className="font-medium">{job.salary}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Saved {job.savedAt.toLocaleDateString()}</span>
                    </div>

                    {job.notes && (
                      <p className="text-sm bg-muted p-3 rounded-lg">{job.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Job
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}