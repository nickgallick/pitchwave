
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Upload, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NavigationBar = () => {
  const location = useLocation();
  const [uploading, setUploading] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleUpload = () => {
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast.success("Your pitch is being processed and will be available soon!");
    }, 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 z-50 glass-morphism border-t border-white/10">
      <div className="max-w-md mx-auto h-full flex items-center justify-around">
        <Link to="/" className="flex flex-col items-center justify-center w-16">
          <div className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-pitchwave-400' : 'text-white/70'}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        
        <Link to="/discover" className="flex flex-col items-center justify-center w-16">
          <div className={`flex flex-col items-center justify-center ${isActive('/discover') ? 'text-pitchwave-400' : 'text-white/70'}`}>
            <Search size={24} />
            <span className="text-xs mt-1">Discover</span>
          </div>
        </Link>
        
        <div className="flex flex-col items-center justify-center w-16 relative -mt-6">
          <Button 
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-pitchwave-500 to-pitchwave-400 hover:from-pitchwave-400 hover:to-pitchwave-500 transition-all shadow-lg shadow-pitchwave-500/20 button-shine"
          >
            {uploading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload size={24} />
            )}
          </Button>
          <span className="text-xs mt-1 text-white/70">Upload</span>
        </div>
        
        <Link to="/notifications" className="flex flex-col items-center justify-center w-16">
          <div className={`flex flex-col items-center justify-center ${isActive('/notifications') ? 'text-pitchwave-400' : 'text-white/70'}`}>
            <div className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
            <span className="text-xs mt-1">Alerts</span>
          </div>
        </Link>
        
        <Link to="/profile" className="flex flex-col items-center justify-center w-16">
          <div className={`flex flex-col items-center justify-center ${isActive('/profile') ? 'text-pitchwave-400' : 'text-white/70'}`}>
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
