import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/common/SEOHead";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        title="Page Not Found - OneSocialStack"
        description="The page you're looking for doesn't exist. Return to OneSocialStack to continue your career journey."
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">404</span>
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
