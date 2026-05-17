import { useCallback, useState } from 'react';
import { useProfileData } from '@/hooks/useProfileData';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsGrid } from '@/components/profile/StatsGrid';
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { StudyPreferencesCard } from '@/components/profile/StudyPreferencesCard';
import { QuickActionsCard } from '@/components/profile/QuickActionsCard';
import { ProgressOverviewCard } from '@/components/profile/ProgressOverviewCard';
import type { ProfileActions } from '@/types/profile';

export function ProfilePage() {
  const { user, profile, mockData, stats, loading, error, updateProfile } = useProfileData();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const handleEditProfile = useCallback(async () => {
    if (!editValue.trim()) return;
    
    try {
      setSaving(true);
      await updateProfile({ firstName: editValue.trim() });
      setEditingField(null);
      setEditValue('');
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  }, [editValue, updateProfile]);

  const startEditing = useCallback((field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingField(null);
    setEditValue('');
  }, []);

  const actions: ProfileActions = {
    onEditProfile: useCallback(() => {
      const currentName = profile?.firstName || user?.firstName || '';
      startEditing('firstName', currentName);
    }, [profile, user, startEditing]),
    onChangePassword: useCallback(() => {
      console.log('Cambiar Contraseña clicked');
      // TODO: Implement change password modal
    }, []),
    onSettings: useCallback(() => {
      console.log('Configuración clicked');
      // TODO: Implement settings page
    }, [])
  };

  if (loading && !profile) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="flex-center" style={{ minHeight: '200px' }}>
            <div className="skeleton" style={{ width: '100px', height: '20px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        {error && (
          <div className="ui-card" style={{ marginBottom: 'var(--space-4)', borderColor: 'var(--color-error)' }}>
            <div className="ui-card-content">
              <p style={{ color: 'var(--color-error)', margin: 0 }}>{error}</p>
            </div>
          </div>
        )}

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
              editingField={editingField}
              editValue={editValue}
              onStartEdit={startEditing}
              onCancelEdit={cancelEditing}
              onSave={handleEditProfile}
              saving={saving}
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