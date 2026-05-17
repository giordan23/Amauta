import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { userService, type UserProfile, type UpdateProfileData } from '@/services/userService';
import type { MockProfileData, UserStats } from '@/types/profile';

export function useProfileData() {
  const { user, setUser } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({
    examsTaken: 0,
    averageScore: 0,
    studyHours: 0,
    streak: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadStatistics();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getMe();
      setProfile(data);
      // Update auth store with fresh user data
      if (data.firstName || data.lastName) {
        setUser({ ...user!, firstName: data.firstName, lastName: data.lastName } as any);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await userService.getStatistics();
      setStats({
        examsTaken: data.totalExams,
        averageScore: Math.round(data.averageScore),
        studyHours: 0,
        streak: 0
      });
    } catch (err) {
      // Silent fail for stats
    }
  };

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await userService.updateProfile(data);
      setProfile(updated);
      if (updated.firstName || updated.lastName) {
        setUser({ ...user!, firstName: updated.firstName, lastName: updated.lastName } as any);
      }
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error updating profile';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, setUser]);

  const mockData: MockProfileData = {
    career: profile?.targetCareer?.name || '-',
    university: profile?.targetUniversity?.name || '-',
    registerDate: profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString('es-PE', { month: 'long', year: 'numeric' }) : '-',
    rank: 'Intermedio'
  };

  return {
    user,
    profile,
    mockData,
    stats,
    loading,
    error,
    updateProfile,
    refreshProfile: loadProfile,
  };
}