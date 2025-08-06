import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Share2, 
  Briefcase, 
  User, 
  LogOut,
  Crown,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'CV Builder', href: '/cv-builder', icon: FileText },
    { name: 'Social Publisher', href: '/social-publisher', icon: Share2 },
    { name: 'Job Board', href: '/jobs', icon: Briefcase },
  ];

  const isActiveRoute = (href: string) => location.pathname.startsWith(href);

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-hero bg-clip-text text-transparent">
                OneSocialStack
              </span>
            </Link>

            {/* Desktop navigation */}
            {user && (
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Tier indicator */}
                <div className={`hidden sm:flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  user.tier === 'pro' ? 'bg-primary/10 text-primary' :
                  user.tier === 'admin' ? 'bg-accent/10 text-accent' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {user.tier === 'pro' && <Crown className="w-3 h-3" />}
                  <span className="capitalize">{user.tier}</span>
                </div>

                {/* Profile and logout */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/settings">
                      <User className="w-4 h-4" />
                      <span className="hidden lg:inline">{user.name}</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-4">
                  <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                  <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                  <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                  <Button variant="ghost" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="hero" asChild>
                    <Link to="/auth?mode=signup">Get Started</Link>
                  </Button>
                </div>
                
                {/* Mobile menu button for non-authenticated users */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {/* User Info Section */}
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      {user.tier === 'pro' && <Crown className="w-3 h-3 mr-1" />}
                      <span className="capitalize">{user.tier} Plan</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Navigation
                </p>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Crown className="w-5 h-5" />
                  <span>Home Dashboard</span>
                  {location.pathname === '/dashboard' && (
                    <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>
                  )}
                </Link>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActiveRoute(item.href)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {isActiveRoute(item.href) && (
                      <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>
                    )}
                  </Link>
                ))}
              </div>

              {/* Account Section */}
              <div className="pt-4 mt-4 border-t border-border space-y-1">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Account
                </p>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Profile & Settings</span>
                </Link>
                <Link
                  to="/billing"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Crown className="w-5 h-5" />
                  <span>Billing & Plans</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-destructive hover:bg-destructive/5 transition-colors w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Public Mobile Menu for Non-authenticated Users */}
        {!user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Discover
                </p>
                <Link
                  to="/about"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>About OneSocialStack</span>
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Pricing Plans</span>
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Blog & Resources</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Contact Support</span>
                </Link>
              </div>

              {/* Auth Actions */}
              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link 
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In to Your Account
                  </Link>
                </Button>
                <Button 
                  variant="hero" 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link 
                    to="/auth?mode=signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};