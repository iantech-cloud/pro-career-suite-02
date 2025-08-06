import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Share2, Briefcase, ArrowRight, Star, Users, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import heroImage from '@/assets/freelancer-hero.jpg';

export const Hero = () => {
  const { user } = useAuth();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-primary font-medium">
                <Star className="w-5 h-5 fill-current animate-pulse" />
                <span>OneSocialStack - Your Career Success Platform</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <br />
                Professional Career with
                <br />
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  AI-Powered
                </span> Tools
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Build professional CVs with AI assistance, schedule and manage social media content across platforms, and discover high-quality remote job opportunities. All the tools you need to accelerate your career growth in one powerful platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild className="group shadow-accent hover:shadow-primary transition-all duration-300">
                <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
                  {user ? "Go to Dashboard" : "Start Your Journey Free"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="hover-scale">
                <Link to={user ? "/dashboard" : "/auth"}>
                  {user ? "Access Tools" : "Sign In"}
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>15,000+ professionals accelerating their careers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>AI-enhanced professional optimization</span>
              </div>
            </div>
          </div>

          {/* Hero Image with Enhanced Design */}
          <div className="relative animate-scale-in">
            <div className="relative">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img 
                  src={heroImage} 
                  alt="Professional freelancer working on career development with modern tools"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-accent/10"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-hero rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute -bottom-16 -left-16 w-20 h-20 bg-gradient-primary rounded-full opacity-15 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 -right-12 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/50 to-transparent"></div>
    </section>
  );
};