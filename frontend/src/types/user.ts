export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  hasCompletedOnboarding: boolean;
  role?: 'student' | 'admin';
  targetUniversity?: {
    id: string;
    name: string;
    shortName: string;
    city: string;
    region: string;
  };
  targetCareer?: {
    id: string;
    name: string;
  };
}
