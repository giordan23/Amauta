import { Calendar, Activity } from 'lucide-react';
import type { User } from '@/types/auth';

interface ProfileHeaderProps {
  user: User | null;
  mockCareer: string;
  mockUniversity: string;
  mockRegisterDate: string;
  mockStats: {
    examsTaken: number;
    averageScore: number;
  };
}

export function ProfileHeader({ 
  user, 
  mockCareer, 
  mockUniversity, 
  mockRegisterDate, 
  mockStats 
}: ProfileHeaderProps) {
  return (
    <div className="mb-8">
      <div className="profile-header">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="profile-avatar flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--color-success)] rounded-full border-3 border-[var(--color-background)] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-on-background)] mb-2">
              {user?.firstName || 'Usuario'} {user?.lastName || ''}
            </h1>
            <p className="text-[var(--color-outline)] mb-4">
              Estudiante de {mockCareer} • {mockUniversity}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Calendar size={16} />
                <span>Miembro desde {mockRegisterDate}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-success)]">
                <Activity size={16} />
                <span>En línea</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Badge */}
          <div className="hidden lg:flex items-center gap-6 bg-[var(--color-surface)]/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-[var(--color-border)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">{mockStats.examsTaken}</div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">Exámenes</div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)] opacity-60"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-success)]">{mockStats.averageScore}%</div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}