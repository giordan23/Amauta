import { useAuthStore } from '@/store/authStore';
import { LogOut, GraduationCap, Clock, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function HomePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-primary)] text-[var(--color-on-primary)] p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Amauta</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm">{user?.email}</span>
            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full" title="Cerrar sesión">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-on-background)] mb-1">
            ¡Hola, {user?.firstName || user?.email}!
          </h2>
          <p className="text-[var(--color-outline)]">¿Qué quieres hacer hoy?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/app/exam/config"
            className="bg-[var(--color-surface)] rounded-2xl p-6 hover:shadow-lg transition-shadow border border-[var(--color-outline)]/20"
          >
            <GraduationCap className="w-10 h-10 text-[var(--color-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Nuevo Simulacro</h3>
            <p className="text-sm text-[var(--color-outline)] mt-1">Inicia un nuevo examen de simulación</p>
          </Link>

          <Link
            to="/app/exam/history"
            className="bg-[var(--color-surface)] rounded-2xl p-6 hover:shadow-lg transition-shadow border border-[var(--color-outline)]/20"
          >
            <Clock className="w-10 h-10 text-[var(--color-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Historial</h3>
            <p className="text-sm text-[var(--color-outline)] mt-1">Revisa tus examenes anteriores</p>
          </Link>

          <Link
            to="/app/profile"
            className="bg-[var(--color-surface)] rounded-2xl p-6 hover:shadow-lg transition-shadow border border-[var(--color-outline)]/20"
          >
            <BarChart3 className="w-10 h-10 text-[var(--color-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Mi Perfil</h3>
            <p className="text-sm text-[var(--color-outline)] mt-1">Actualiza tus datos y preferencias</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
