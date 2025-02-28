
export interface PitchVideo {
  id: string;
  companyName: string;
  tagline: string;
  videoUrl: string;
  thumbnailUrl: string;
  fundingGoal: number;
  fundingRaised: number;
  category: string;
  description: string;
  founderName: string;
  location: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  role: 'startup' | 'investor';
  avatar: string;
  bio?: string;
}

export type SwipeDirection = 'left' | 'right' | 'none';
