
import { useState, useEffect } from "react";
import VideoFeed from "@/components/VideoFeed";
import NavigationBar from "@/components/NavigationBar";
import ProfileView from "@/components/ProfileView";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const Index = () => {
  const [activeView, setActiveView] = useState<"feed" | "profile">("feed");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const isMobile = useIsMobile();
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Show welcome message on first visit
    if (isFirstVisit) {
      setTimeout(() => {
        toast("Welcome to PitchWave", {
          description: "Swipe right to invest, swipe left to pass",
          action: {
            label: "Got it",
            onClick: () => setIsFirstVisit(false),
          },
        });
      }, 1000);
    }
  }, [isFirstVisit]);

  // Main content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "feed":
        return <VideoFeed />;
      case "profile":
        return <ProfileView />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-dark-900 text-white relative">
      {/* Header - only shown on desktop */}
      {!isMobile && (
        <header className="fixed top-0 left-0 right-0 h-16 z-50 glass-morphism border-b border-white/10">
          <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">
                PitchWave
              </h1>
            </div>
            
            <div className="flex space-x-6">
              <Button 
                variant="ghost" 
                className={`${activeView === "feed" ? "text-pitchwave-400" : "text-white/70"}`}
                onClick={() => setActiveView("feed")}
              >
                Feed
              </Button>
              <Button 
                variant="ghost" 
                className={`${activeView === "profile" ? "text-pitchwave-400" : "text-white/70"}`}
                onClick={() => setActiveView("profile")}
              >
                Profile
              </Button>
            </div>
            
            <div>
              <Button 
                className="bg-gradient-to-r from-investor-500 to-investor-400 hover:from-investor-400 hover:to-investor-500 transition-all shadow-lg shadow-investor-500/20 button-shine"
                onClick={() => {
                  uiToast({
                    title: "Feature coming soon",
                    description: "Investor dashboard is under development",
                  });
                }}
              >
                Investor Dashboard
              </Button>
            </div>
          </div>
        </header>
      )}
      
      {/* Main content */}
      <main className={`h-full w-full ${!isMobile ? "pt-16" : ""}`}>
        {renderContent()}
      </main>
      
      {/* Navigation bar - only shown on mobile */}
      {isMobile && <NavigationBar />}
    </div>
  );
};

export default Index;
