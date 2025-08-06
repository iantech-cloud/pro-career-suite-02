import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContactAction = async (title: string, contact: string) => {
    try {
      switch (title) {
        case 'Email Support':
          // Track email action and open email client
          await fetch('/api/contact/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'email_clicked', contact })
          });
          window.location.href = `mailto:${contact}?subject=Support Request from CareerSuite`;
          break;
          
        case 'Phone Support':
          // Track call action and initiate call
          await fetch('/api/contact/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'call_clicked', contact })
          });
          window.location.href = `tel:${contact}`;
          break;
          
        case 'Office Location':
          // Track directions action and open maps
          await fetch('/api/contact/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'directions_clicked', contact })
          });
          const address = contact.replace(/\n/g, ', ');
          window.open(`https://maps.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
          break;
          
        default:
          toast({
            title: "Action not available",
            description: "This action is not implemented yet.",
          });
      }
    } catch (error) {
      console.error('Failed to track contact action:', error);
      // Still perform the action even if tracking fails
      switch (title) {
        case 'Email Support':
          window.location.href = `mailto:${contact}?subject=Support Request from CareerSuite`;
          break;
        case 'Phone Support':
          window.location.href = `tel:${contact}`;
          break;
        case 'Office Location':
          const address = contact.replace(/\n/g, ', ');
          window.open(`https://maps.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
          break;
      }
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account or technical issues',
      contact: 'support@careersuite.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit us at our headquarters',
      contact: '123 Business Ave, Suite 100\nSan Francisco, CA 94105',
      action: 'Get Directions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-hero text-white">Get In Touch</Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a question, need support, or want to share feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gradient-hero hover:shadow-elegant transition-all">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                    {method.contact}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleContactAction(method.title, method.contact)}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Business Hours */}
            <Card className="hover:shadow-elegant transition-all">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Business Hours</CardTitle>
                  </div>
                </div>
                <CardDescription>When you can reach us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How quickly do you respond?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days. 
                  Urgent support requests are usually handled within 2-4 hours.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer phone support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Phone support is available for Pro and Enterprise customers during business hours. 
                  Free users can reach us via email or chat.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I schedule a demo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! We offer personalized demos for teams and Enterprise customers. 
                  Contact us to schedule a time that works for you.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer training?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we provide comprehensive onboarding and training sessions for Enterprise customers, 
                  plus self-service resources for all users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;