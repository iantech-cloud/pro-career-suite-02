import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { 
  MapPin, 
  Clock, 
  Heart, 
  ExternalLink, 
  Crown,
  DollarSign,
  Building,
  Calendar
} from 'lucide-react';
import { UserTier } from '@/types/user';

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

interface JobCardProps {
  job: Job;
  onSave: () => void;
  onApply: () => void;
  canSave: boolean;
  userTier: UserTier;
}

export const JobCard = ({ job, onSave, onApply, canSave, userTier }: JobCardProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'bg-success/10 text-success border-success/20';
      case 'full-time': return 'bg-primary/10 text-primary border-primary/20';
      case 'part-time': return 'bg-accent/10 text-accent border-accent/20';
      case 'contract': return 'bg-muted/50 text-muted-foreground border-border';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  return (
    <Card className="hover:shadow-elegant transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
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
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getTypeColor(job.type)}>
                {job.type.replace('-', ' ')}
              </Badge>
              {job.salary && (
                <Badge variant="outline" className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {job.salary}
                </Badge>
              )}
              <Badge variant="outline">
                {job.source}
              </Badge>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={!canSave && !job.isSaved}
            className={job.isSaved ? 'text-destructive hover:text-destructive/80' : ''}
          >
            <Heart className={`w-4 h-4 ${job.isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="mb-4 line-clamp-2">
          {job.description}
        </CardDescription>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-1">
            {job.requirements.slice(0, 4).map((req, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {req}
              </Badge>
            ))}
            {job.requirements.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.requirements.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              View Job
            </a>
          </Button>
          
          <ShowForTier
            requiredTier="pro"
            fallback={
              <Button variant="outline" size="sm" disabled>
                <Crown className="w-4 h-4 mr-1" />
                Apply with CV (Pro)
              </Button>
            }
          >
            <Button variant="hero" size="sm" onClick={onApply}>
              Apply with CV
            </Button>
          </ShowForTier>
        </div>
      </CardContent>
    </Card>
  );
};