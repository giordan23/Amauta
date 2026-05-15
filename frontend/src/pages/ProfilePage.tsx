import { useCallback } from 'react';
import { useProfileData } from '@/hooks/useProfileData';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { StudyPreferencesCard } from '@/components/profile/StudyPreferencesCard';
import { QuickActionsCard } from '@/components/profile/QuickActionsCard';
import { ProgressOverviewCard } from '@/components/profile/ProgressOverviewCard';
import type { ProfileActions } from '@/types/profile';

export function ProfilePage() {
  const { user, mockData, stats } = useProfileData();

  const actions: ProfileActions = {
    onEditProfile: useCallback(() => {
      console.log('Editar Perfil clicked');
      // TODO: Implement edit profile modal/page
    }, []),
    onChangePassword: useCallback(() => {
      console.log('Cambiar Contraseña clicked');
      // TODO: Implement change password modal
    }, []),
    onSettings: useCallback(() => {
      console.log('Configuración clicked');
      // TODO: Implement settings page
    }, [])
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <ProfileHeader 
          user={user}
          mockCareer={mockData.career}
          mockUniversity={mockData.university}
          mockRegisterDate={mockData.registerDate}
          mockStats={{
            examsTaken: stats.examsTaken,
            averageScore: stats.averageScore
          }}
        />

        <StatsGrid stats={stats} />

        <div className="cards-grid">
          <div className="cards-main-content">
            <PersonalInfoCard 
              user={user} 
              mockRegisterDate={mockData.registerDate} 
            />
            <StudyPreferencesCard 
              mockCareer={mockData.career}
              mockUniversity={mockData.university}
            />
          </div>

          <div className="cards-sidebar">
            <QuickActionsCard 
              onEditProfile={actions.onEditProfile}
              onChangePassword={actions.onChangePassword}
              onSettings={actions.onSettings}
            />
            <ProgressOverviewCard 
              mockRank={mockData.rank}
              progressPercentage={78}
            />
          </div>
        </div>
      </div>
    </div>
  );
}