import { useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import type { MockProfileData, UserStats } from '@/types/profile';

export function useProfileData() {
  const { user } = useAuthStore();

  const mockData: MockProfileData = useMemo(() => ({
    career: 'Medicina',
    university: 'Universidad Nacional Mayor de San Marcos',
    registerDate: user?.email ? 'Enero 2024' : '-',
    rank: 'Avanzado'
  }), [user?.email]);

  const stats: UserStats = useMemo(() => ({
    examsTaken: 15,
    averageScore: 78,
    studyHours: 42,
    streak: 12
  }), []);

  return {
    user,
    mockData,
    stats
  };
}