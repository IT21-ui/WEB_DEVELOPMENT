import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 flex items-center justify-center p-6">
      <div className="text-center space-y-8">
        <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto">
          <GraduationCap className="w-12 h-12 text-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-primary">Page Not Found</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button className="hero-button text-lg px-8 py-6" onClick={() => window.location.href = '/'}>
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
