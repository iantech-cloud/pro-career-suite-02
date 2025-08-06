import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ShowForTier } from '@/components/auth/ShowForTier';
import { Save, Download, Eye, Sparkles, Crown, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CvFormSection } from '../components/CvFormSection';
import { TemplateSelector } from '../components/TemplateSelector';
import { AiEnhanceButton } from '../components/AiEnhanceButton';

const CvEditorPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      website: 'johndoe.dev',
      linkedin: 'linkedin.com/in/johndoe'
    },
    summary: 'Experienced software developer with 5+ years of experience in full-stack development...',
    experience: [
      {
        id: '1',
        title: 'Senior Software Developer',
        company: 'Tech Company Inc.',
        location: 'New York, NY',
        startDate: '2022-01',
        endDate: 'present',
        description: 'Led development of scalable web applications using React and Node.js...'
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        location: 'New York, NY',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'],
    selectedTemplate: 'modern'
  });

  const handleSave = () => {
    console.log('Saving CV...', cvData);
    // Mock save
  };

  const handleDownload = () => {
    console.log('Downloading CV...');
    // Mock download
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/cv-builder">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {id === 'new' ? 'Create New CV' : 'Edit CV'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Build your professional resume
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          
          <Button variant="hero" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Editor Panel */}
        <div className={`lg:col-span-2 space-y-6 ${isPreviewMode ? 'hidden lg:block' : ''}`}>
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Choose Template
              <ShowForTier 
                requiredTier="pro"
                fallback={
                  <Badge className="ml-2 bg-primary/10 text-primary">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro Templates
                  </Badge>
                }
              >
                <></>
              </ShowForTier>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateSelector 
                selectedTemplate={cvData.selectedTemplate}
                onSelect={(template) => setCvData({...cvData, selectedTemplate: template})}
                userTier={user?.tier || 'free'}
              />
            </CardContent>
          </Card>

          {/* Personal Information */}
          <CvFormSection title="Personal Information">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName"
                  value={cvData.personalInfo.fullName}
                  onChange={(e) => setCvData({
                    ...cvData, 
                    personalInfo: {...cvData.personalInfo, fullName: e.target.value}
                  })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => setCvData({
                    ...cvData, 
                    personalInfo: {...cvData.personalInfo, email: e.target.value}
                  })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => setCvData({
                    ...cvData, 
                    personalInfo: {...cvData.personalInfo, phone: e.target.value}
                  })}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={cvData.personalInfo.location}
                  onChange={(e) => setCvData({
                    ...cvData, 
                    personalInfo: {...cvData.personalInfo, location: e.target.value}
                  })}
                />
              </div>
            </div>
          </CvFormSection>

          {/* Professional Summary */}
          <CvFormSection title="Professional Summary">
            <div className="space-y-3">
              <Label htmlFor="summary">Summary</Label>
              <Textarea 
                id="summary"
                value={cvData.summary}
                onChange={(e) => setCvData({...cvData, summary: e.target.value})}
                rows={4}
                placeholder="Write a compelling professional summary..."
              />
              <div className="flex justify-end">
                <AiEnhanceButton 
                  text={cvData.summary}
                  onEnhanced={(enhanced) => setCvData({...cvData, summary: enhanced})}
                  userTier={user?.tier || 'free'}
                />
              </div>
            </div>
          </CvFormSection>

          {/* Work Experience */}
          <CvFormSection title="Work Experience">
            {cvData.experience.map((exp, index) => (
              <Card key={exp.id} className="p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Job Title</Label>
                    <Input value={exp.title} placeholder="Software Developer" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input value={exp.company} placeholder="Company Name" />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input type="month" value={exp.startDate} />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="month" value={exp.endDate} placeholder="Present" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Description</Label>
                  <Textarea 
                    value={exp.description}
                    rows={3}
                    placeholder="Describe your responsibilities and achievements..."
                  />
                  <div className="flex justify-end">
                    <AiEnhanceButton 
                      text={exp.description}
                      onEnhanced={(enhanced) => {
                        const updated = cvData.experience.map((e, i) => 
                          i === index ? {...e, description: enhanced} : e
                        );
                        setCvData({...cvData, experience: updated});
                      }}
                      userTier={user?.tier || 'free'}
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full">
              Add Experience
            </Button>
          </CvFormSection>
        </div>

        {/* Preview Panel */}
        <div className={`lg:col-span-1 ${isPreviewMode ? 'col-span-full' : ''}`}>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-6 min-h-[600px] text-black">
                <div className="text-center border-b pb-4 mb-4">
                  <h1 className="text-2xl font-bold text-primary">{cvData.personalInfo.fullName}</h1>
                  <p className="text-muted-foreground">{cvData.personalInfo.email}</p>
                  <p className="text-sm text-muted-foreground">{cvData.personalInfo.phone} • {cvData.personalInfo.location}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h2 className="font-bold text-lg border-b pb-1 mb-2">Professional Summary</h2>
                    <p className="text-sm">{cvData.summary}</p>
                  </div>
                  
                  <div>
                    <h2 className="font-bold text-lg border-b pb-1 mb-2">Experience</h2>
                    {cvData.experience.map((exp) => (
                      <div key={exp.id} className="mb-3">
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company} • {exp.startDate} - {exp.endDate}</p>
                        <p className="text-sm mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h2 className="font-bold text-lg border-b pb-1 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                      {cvData.skills.map((skill, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CvEditorPage;