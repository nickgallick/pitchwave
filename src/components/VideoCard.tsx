
import { useState, useRef, useEffect } from "react";
import { PitchVideo, SwipeDirection } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Heart, DollarSign, Share2 } from "lucide-react";

interface VideoCardProps {
  video: PitchVideo;
  onSwipe: (direction: SwipeDirection, videoId: string) => void;
  isActive: boolean;
}

const VideoCard = ({ video, onSwipe, isActive }: VideoCardProps) => {
  const [swiping, setSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>('none');
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const SWIPE_THRESHOLD = 100;

  // Handle video playback based on active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => console.error("Video play error:", err));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setOffsetX(diff);
    
    // Determine swipe direction
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection('none');
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
      const direction = offsetX > 0 ? 'right' : 'left';
      onSwipe(direction, video.id);
      
      // Show toast based on swipe direction
      if (direction === 'right') {
        toast.success("Starting investment process...");
      } else {
        toast.info("Passed on this pitch");
      }
    }
    
    // Reset state
    setSwiping(false);
    setOffsetX(0);
    setSwipeDirection('none');
  };

  // Mouse events for desktop users
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!swiping) return;
    const diff = e.clientX - startX;
    setOffsetX(diff);
    
    // Determine swipe direction
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection('none');
    }
  };

  const handleMouseUp = () => {
    if (Math.abs(offsetX) > SWIPE_THRESHOLD) {
      const direction = offsetX > 0 ? 'right' : 'left';
      onSwipe(direction, video.id);
      
      // Show toast based on swipe direction
      if (direction === 'right') {
        toast.success("Starting investment process...");
      } else {
        toast.info("Passed on this pitch");
      }
    }
    
    // Reset state
    setSwiping(false);
    setOffsetX(0);
    setSwipeDirection('none');
  };

  // Calculate styles based on swipe
  const cardStyle = {
    transform: swiping ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)` : 'translateX(0) rotate(0)',
    transition: swiping ? 'none' : 'transform 0.5s ease',
    opacity: swiping ? 1 - Math.abs(offsetX) / 500 : 1,
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-full h-full overflow-hidden rounded-xl"
      style={cardStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Video element */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        playsInline
        muted
        loop
      />
      
      {/* Swipe overlay indicators */}
      {swipeDirection === 'right' && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 z-10 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full text-xl font-bold transform rotate-12">
            INVEST
          </div>
        </div>
      )}
      
      {swipeDirection === 'left' && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 z-10 animate-fade-in">
          <div className="bg-red-500 text-white px-6 py-3 rounded-full text-xl font-bold transform -rotate-12">
            PASS
          </div>
        </div>
      )}
      
      {/* Swipe hint overlays */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white/70">
        <ChevronLeft size={24} />
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 rounded-full p-2 text-white/70">
        <ChevronRight size={24} />
      </div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="bg-pitchwave-500 text-white text-xs px-2 py-1 rounded-full">
              {video.category}
            </span>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20">
                <Heart size={16} />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20">
                <Share2 size={16} />
              </Button>
            </div>
          </div>
          
          <h2 className="text-white text-xl font-bold">{video.companyName}</h2>
          <p className="text-white/80 text-sm">{video.tagline}</p>
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.founderName)}&background=random`} alt={video.founderName} />
              </div>
              <span className="text-white/80 text-xs">{video.founderName}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <DollarSign size={14} className="text-investor-400" />
              <span className="text-white text-xs font-semibold">
                ${(video.fundingGoal / 1000).toFixed(0)}K Goal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
