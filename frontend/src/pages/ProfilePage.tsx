import { useAuthStore } from '@/store/authStore';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { FileText, Target, Clock, Edit, Lock, Settings } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuthStore();

  const handleEditProfile = () => console.log('Editar Perfil clicked');
  const handleChangePassword = () => console.log('Cambiar Contraseña clicked');
  const handleSettings = () => console.log('Configuración clicked');

  // Mock data for fields not in user
  const mockCareer = 'Medicina';
  const mockUniversity = 'Universidad Nacional Mayor de San Marcos';
  const mockStats = {
    examsTaken: 15,
    averageScore: 78,
    studyHours: 42,
  };
  // Mock registration date
  const mockRegisterDate = user?.email ? 'Enero 2024' : '-';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-[var(--color-on-background)]">Mi Perfil</h1>
          <p className="text-lg text-[var(--color-outline)]">
            Gestiona tu información personal y preferencias de estudio
          </p>
        </header>

        {/* Main Content Grid: 2 columns on desktop, 1 on mobile */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Personal Info + Study Preferences */}
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-on-surface)]">
                      Nombre
                    </label>
                    <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                      <span className="text-[var(--color-on-background)]">
                        {user?.firstName || 'Usuario'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-on-surface)]">
                      Apellido
                    </label>
                    <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                      <span className="text-[var(--color-on-background)]">
                        {user?.lastName || '-'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">
                    Email
                  </label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">
                      {user?.email || '-'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">
                    Fecha de Registro
                  </label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">{mockRegisterDate}</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Study Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Estudio</CardTitle>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">
                    Carrera Objetivo
                  </label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">{mockCareer}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">
                    Universidad Objetivo
                  </label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">{mockUniversity}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column: Stats + Actions */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <StatCard
                title="Exámenes"
                value={mockStats.examsTaken}
                icon={FileText}
                subtitle="realizados"
              />
              <StatCard
                title="Promedio"
                value={`${mockStats.averageScore}%`}
                icon={Target}
                subtitle="general"
                trend="up"
              />
              <StatCard
                title="Horas"
                value={mockStats.studyHours}
                icon={Clock}
                subtitle="de estudio"
              />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardBody className="space-y-2">
                <button
                  onClick={handleEditProfile}
                  className="w-full p-3 text-left rounded-lg hover:bg-[var(--color-background)] transition-colors flex items-center gap-3"
                >
                  <Edit size={18} className="text-[var(--color-primary)]" />
                  <span className="text-sm font-medium text-[var(--color-on-surface)]">
                    Editar Perfil
                  </span>
                </button>
                <button
                  onClick={handleChangePassword}
                  className="w-full p-3 text-left rounded-lg hover:bg-[var(--color-background)] transition-colors flex items-center gap-3"
                >
                  <Lock size={18} className="text-[var(--color-primary)]" />
                  <span className="text-sm font-medium text-[var(--color-on-surface)]">
                    Cambiar Contraseña
                  </span>
                </button>
                <button
                  onClick={handleSettings}
                  className="w-full p-3 text-left rounded-lg hover:bg-[var(--color-background)] transition-colors flex items-center gap-3"
                >
                  <Settings size={18} className="text-[var(--color-primary)]" />
                  <span className="text-sm font-medium text-[var(--color-on-surface)]">
                    Configuración
                  </span>
                </button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}