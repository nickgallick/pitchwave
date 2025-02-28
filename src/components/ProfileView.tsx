
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, PitchVideo } from "@/types";
import { DollarSign, Briefcase, MapPin, Calendar, Edit, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

// Mock user data
const MOCK_USER: User = {
  id: "1",
  name: "Sarah Investor",
  role: "investor",
  avatar: "https://randomuser.me/api/portraits/women/23.jpg",
  bio: "Angel investor focusing on EdTech and HealthTech startups with 15+ investments."
};

// Mock investment data
const MOCK_INVESTMENTS = [
  {
    id: "1",
    companyName: "EcoTech Solutions",
    amount: 25000,
    date: new Date("2023-09-15"),
    status: "Active",
  },
  {
    id: "2",
    companyName: "MediSync",
    amount: 50000,
    date: new Date("2023-08-22"),
    status: "Active",
  },
  {
    id: "3",
    companyName: "LearnFlow",
    amount: 15000,
    date: new Date("2023-07-10"),
    status: "Exited",
  }
];

// Mock saved videos
const MOCK_SAVED: PitchVideo[] = [
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
  }
];

const ProfileView = () => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [investments, setInvestments] = useState(MOCK_INVESTMENTS);
  const [savedVideos, setSavedVideos] = useState(MOCK_SAVED);
  
  const handleLogout = () => {
    toast.success("You've been logged out successfully");
  };
  
  return (
    <div className="w-full h-full overflow-y-auto bg-dark-900 pb-20">
      {/* Profile header */}
      <div className="w-full bg-gradient-to-b from-pitchwave-900 to-dark-900 p-6 pt-12">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-pitchwave-500 rounded-full p-1">
              <Edit size={14} className="text-white" />
            </button>
          </div>
          
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" className="bg-investor-500/20 text-investor-400 border-investor-500">
                Investor
              </Badge>
              <span className="text-xs text-white/60">Member since 2022</span>
            </div>
          </div>
          
          <div className="ml-auto flex space-x-2">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Settings size={20} className="text-white/70" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full" onClick={handleLogout}>
              <LogOut size={20} className="text-white/70" />
            </Button>
          </div>
        </div>
        
        <p className="mt-4 text-white/80 text-sm">{user.bio}</p>
        
        <div className="mt-6 flex justify-between">
          <div className="text-center">
            <p className="text-white text-lg font-bold">{investments.length}</p>
            <p className="text-white/60 text-xs">Investments</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-bold">$90K</p>
            <p className="text-white/60 text-xs">Invested</p>
          </div>
          <div className="text-center">
            <p className="text-white text-lg font-bold">{savedVideos.length}</p>
            <p className="text-white/60 text-xs">Saved</p>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="p-4">
        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-dark-800 p-1">
            <TabsTrigger value="investments" className="data-[state=active]:bg-pitchwave-500">
              Investments
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-pitchwave-500">
              Saved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="investments" className="mt-4 space-y-4">
            {investments.map(investment => (
              <div 
                key={investment.id} 
                className="bg-dark-800 rounded-xl p-4 glass-morphism"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-semibold">{investment.companyName}</h3>
                  <Badge 
                    className={investment.status === "Active" 
                      ? "bg-green-500/20 text-green-400 border-green-500" 
                      : "bg-purple-500/20 text-purple-400 border-purple-500"}
                  >
                    {investment.status}
                  </Badge>
                </div>
                
                <div className="mt-2 flex items-center text-white/70 text-sm">
                  <DollarSign size={14} className="mr-1" />
                  <span>${investment.amount.toLocaleString()}</span>
                </div>
                
                <div className="mt-2 flex items-center text-white/70 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span>{investment.date.toLocaleDateString()}</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-white/10">
                  <Button 
                    variant="ghost" 
                    className="w-full bg-white/5 hover:bg-white/10 text-white"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="saved" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {savedVideos.map(video => (
                <div 
                  key={video.id} 
                  className="bg-dark-800 rounded-xl overflow-hidden glass-morphism video-shine"
                >
                  <div className="relative w-full pb-[125%]">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.companyName} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-pitchwave-500/80 text-white border-none text-[10px]">
                          {video.category}
                        </Badge>
                      </div>
                      <h3 className="text-white text-sm font-medium mt-1 line-clamp-1">{video.companyName}</h3>
                      <p className="text-white/70 text-xs line-clamp-1">{video.tagline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileView;
