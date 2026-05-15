export interface MockProfileData {
  career: string;
  university: string;
  registerDate: string;
  rank: string;
}

export interface UserStats {
  examsTaken: number;
  averageScore: number;
  studyHours: number;
  streak: number;
}

export interface ProfileActions {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onSettings: () => void;
}