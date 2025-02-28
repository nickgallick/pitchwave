
import { useState, useEffect, useRef } from "react";
import { PitchVideo, SwipeDirection } from "@/types";
import VideoCard from "./VideoCard";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown } from "lucide-react";

// Mock data for pitch videos
const MOCK_VIDEOS: PitchVideo[] = [
  {
    id: "1",
    companyName: "EcoTech Solutions",
    tagline: "Sustainable energy for urban environments",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-and-dancing-on-a-table-3734-large.mp4",
    thumbnailUrl: "https://picsum.photos/seed/ecotech/800/1200",
    fundingGoal: 500000,
    fundingRaised: 125000,
    category: "CleanTech",
    description: "We're developing affordable solar panels that can be installed on any surface to generate clean energy.",
    founderName: "Alex Johnson",
    location: "San Francisco, CA",
    createdAt: new Date("2023-10-15"),
  },
  {
    id: "2",
    companyName: "MediSync",
    tagline: "AI-powered health monitoring for everyone",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-man-working-from-a-sofa-with-a-40961-large.mp4",
    thumbnailUrl: "https://picsum.photos/seed/medisync/800/1200",
    fundingGoal: 750000,
    fundingRaised: 250000,
    category: "HealthTech",
    description: "Our wearable device uses AI to predict health issues before they become serious problems.",
    founderName: "Sarah Chen",
    location: "Boston, MA",
    createdAt: new Date("2023-10-20"),
  },
  {
    id: "3",
    companyName: "Urban Harvest",
    tagline: "Vertical farming solutions for cities",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smiling-woman-working-on-her-laptop-from-an-open-office-43366-large.mp4",
    thumbnailUrl: "https://picsum.photos/seed/urbanharvest/800/1200",
    fundingGoal: 350000,
    fundingRaised: 100000,
    category: "FoodTech",
    description: "We're building vertical farms in urban areas to grow fresh produce year-round with minimal resources.",
    founderName: "Miguel Rodriguez",
    location: "Austin, TX",
    createdAt: new Date("2023-10-25"),
  },
  {
    id: "4",
    companyName: "Quantum Logistics",
    tagline: "Revolutionizing supply chain with blockchain",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-colorful-tunnel-of-lights-10098-large.mp4",
    thumbnailUrl: "https://picsum.photos/seed/quantum/800/1200",
    fundingGoal: 1000000,
    fundingRaised: 400000,
    category: "Logistics",
    description: "Our blockchain platform offers complete transparency and efficiency for global supply chains.",
    founderName: "Olivia Wang",
    location: "Seattle, WA",
    createdAt: new Date("2023-11-01"),
  },
  {
    id: "5",
    companyName: "CodeMentor",
    tagline: "AI-powered coding assistant for developers",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
    thumbnailUrl: "https://picsum.photos/seed/codementor/800/1200",
    fundingGoal: 600000,
    fundingRaised: 200000,
    category: "DevTools",
    description: "Our AI assistant helps developers write better code faster through real-time suggestions.",
    founderName: "Raj Patel",
    location: "New York, NY",
    createdAt: new Date("2023-11-05"),
  }
];

const VideoFeed = () => {
  const [videos, setVideos] = useState<PitchVideo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch videos
  useEffect(() => {
    // Simulate API call
    const fetchVideos = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredVideos = [...MOCK_VIDEOS];
      
      // Filter by category if one is selected
      if (activeCategory) {
        filteredVideos = filteredVideos.filter(video => video.category === activeCategory);
      }
      
      // Sort by newest
      filteredVideos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setVideos(filteredVideos);
      setLoading(false);
    };
    
    fetchVideos();
  }, [activeCategory]);

  // Handle swipe actions
  const handleSwipe = (direction: SwipeDirection, videoId: string) => {
    if (direction === 'right') {
      // In a real app, this would start the investment process
      console.log(`Starting investment process for video ${videoId}`);
    } else if (direction === 'left') {
      console.log(`Passed on video ${videoId}`);
    }
    
    // Move to next video
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // No more videos
      toast({
        title: "End of feed",
        description: "You've seen all available pitches in this category",
      });
    }
  };

  // Handle manual navigation
  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Categories list
  const categories = Array.from(new Set(MOCK_VIDEOS.map(video => video.category)));

  return (
    <div className="relative h-full w-full overflow-hidden bg-dark-900">
      {/* Category selector */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 flex space-x-2 overflow-x-auto scrollbar-none bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
            activeCategory === null
              ? 'bg-pitchwave-500 text-white'
              : 'bg-dark-700 text-white/70'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-pitchwave-500 text-white'
                : 'bg-dark-700 text-white/70'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Video feed */}
      <div 
        ref={feedRef}
        className="h-full w-full"
      >
        {loading ? (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-pitchwave-500 border-t-transparent animate-spin"></div>
            <p className="mt-4 text-white/70">Loading pitches...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="h-full w-full">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <VideoCard 
                  video={video} 
                  onSwipe={handleSwipe} 
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-4">
            <p className="text-white/70">No pitches found in this category</p>
          </div>
        )}
      </div>
      
      {/* Scroll indicator */}
      {!loading && videos.length > currentIndex + 1 && (
        <div 
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 text-white/50 animate-bounce"
          onClick={handleNext}
        >
          <ArrowDown size={24} />
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
