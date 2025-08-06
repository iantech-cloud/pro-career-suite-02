import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Send, Building, MapPin } from 'lucide-react';
import { UserTier } from '@/types/user';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
}

interface CV {
  id: string;
  title: string;
  lastModified: Date;
  template: string;
}

interface ApplyWithCvModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  userTier: UserTier;
}

export const ApplyWithCvModal = ({ job, isOpen, onClose, userTier }: ApplyWithCvModalProps) => {
  const [selectedCv, setSelectedCv] = useState<string>('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // TODO: Fetch CVs from CV builder module
  const availableCvs: CV[] = [];

  const handleApply = async () => {
    if (!selectedCv) return;
    
    setIsApplying(true);
    
    try {
      // TODO: Replace with actual job application API call
      console.log('Applying to job:', {
        jobId: job.id,
        cvId: selectedCv,
        coverLetter
      });
      
      setIsApplying(false);
      onClose();
      
      // TODO: Show success toast notification
    } catch (error) {
      console.error('Application failed:', error);
      setIsApplying(false);
      // TODO: Show error toast notification
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Apply with Your CV</DialogTitle>
          <DialogDescription>
            Submit your application for this position
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {job.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* CV Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Select your CV/Resume
            </Label>
            <div className="grid gap-3">
              {availableCvs.map((cv) => (
                <Card
                  key={cv.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCv === cv.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedCv(cv.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedCv === cv.id ? 'bg-primary text-white' : 'bg-muted'
                      }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{cv.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cv.template} template • Updated {cv.lastModified.toLocaleDateString()}
                        </p>
                      </div>
                      {selectedCv === cv.id && (
                        <Badge className="bg-primary text-white">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {availableCvs.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No CVs found. Create your first CV to get started.
                  </p>
                  <Button variant="outline" size="sm">
                    Create CV
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter" className="text-base font-medium mb-3 block">
              Cover Letter (Optional)
            </Label>
            <Textarea
              id="coverLetter"
              placeholder="Write a personalized message to the employer..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            
            <Button
              variant="hero"
              onClick={handleApply}
              disabled={!selectedCv || isApplying}
            >
              {isApplying ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Applying...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};