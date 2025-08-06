import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  Clock, 
  Image, 
  Calendar as CalendarIcon,
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram,
  X,
  AlignLeft
} from 'lucide-react';
import { format } from 'date-fns';

interface Platform {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  characterLimit: number;
}

export default function PostComposerPage() {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const platforms: Platform[] = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, connected: true, characterLimit: 280 },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: true, characterLimit: 3000 },
    { id: 'facebook', name: 'Facebook', icon: Facebook, connected: false, characterLimit: 63206 },
    { id: 'instagram', name: 'Instagram', icon: Instagram, connected: false, characterLimit: 2200 }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 4)); // Max 4 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublishNow = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive"
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one platform.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Post published!",
      description: `Your post has been published to ${selectedPlatforms.length} platform(s).`
    });

    // Reset form
    setContent('');
    setSelectedPlatforms([]);
    setImages([]);
  };

  const handleSchedulePost = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select a date and time for scheduling.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Post scheduled!",
      description: `Your post has been scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}.`
    });

    // Reset form
    setContent('');
    setSelectedPlatforms([]);
    setSelectedDate(undefined);
    setSelectedTime('');
    setImages([]);
  };

  const getCharacterCount = () => {
    const selectedPlatformData = platforms.filter(p => selectedPlatforms.includes(p.id));
    const minLimit = Math.min(...selectedPlatformData.map(p => p.characterLimit));
    return { current: content.length, max: minLimit };
  };

  const characterCount = getCharacterCount();
  const isOverLimit = characterCount.current > characterCount.max;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Compose Post</h1>
          <p className="text-muted-foreground mt-1">
            Create and schedule content for your social media platforms
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Composer */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlignLeft className="w-5 h-5 text-primary" />
                  <span>Post Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {selectedPlatforms.length > 0 && (
                        <span className={isOverLimit ? 'text-destructive' : ''}>
                          {characterCount.current}/{characterCount.max} characters
                        </span>
                      )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                      <Image className="w-4 h-4 mr-2" />
                      Add Images
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>Schedule (Optional)</span>
                </CardTitle>
                <CardDescription>
                  Schedule your post for later or publish immediately
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button 
                variant="hero" 
                onClick={handlePublishNow}
                disabled={!content.trim() || selectedPlatforms.length === 0 || isOverLimit}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Publish Now
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSchedulePost}
                disabled={!content.trim() || selectedPlatforms.length === 0 || isOverLimit}
                className="flex-1"
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Select Platforms</CardTitle>
                <CardDescription>
                  Choose where to publish your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                      disabled={!platform.connected}
                    />
                    <div className="flex items-center space-x-2 flex-1">
                      <platform.icon className="w-5 h-5" />
                      <span className="font-medium">{platform.name}</span>
                      {!platform.connected && (
                        <Badge variant="outline" className="text-xs">
                          Not Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {selectedPlatforms.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Character Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {platforms
                    .filter(p => selectedPlatforms.includes(p.id))
                    .map((platform) => (
                      <div key={platform.id} className="flex justify-between text-sm">
                        <span>{platform.name}</span>
                        <span className="text-muted-foreground">
                          {content.length}/{platform.characterLimit}
                        </span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}