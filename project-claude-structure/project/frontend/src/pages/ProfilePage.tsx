export function ProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-[var(--color-on-background)]">Mi Perfil</h1>
          <p className="text-lg text-[var(--color-outline)]">
            Gestiona tu información personal y preferencias de estudio
          </p>
        </header>
        
        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Personal Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
                Información Personal
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">Nombre</label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">Usuario Demo</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">Email</label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">usuario@amauta.com</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Study Preferences */}
            <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
                Preferencias de Estudio
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">Carrera Objetivo</label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">Medicina</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">Universidad Objetivo</label>
                  <div className="p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20">
                    <span className="text-[var(--color-on-background)]">Universidad Nacional Mayor de San Marcos</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* Stats Sidebar */}
          <div className="space-y-6">
            <section className="bg-[var(--color-primary-container)] rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-on-primary)]">
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-on-primary)]">15</div>
                  <div className="text-sm text-[var(--color-on-primary)]/80">Exámenes Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-on-primary)]">78%</div>
                  <div className="text-sm text-[var(--color-on-primary)]/80">Promedio General</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--color-on-primary)]">42</div>
                  <div className="text-sm text-[var(--color-on-primary)]/80">Horas de Estudio</div>
                </div>
              </div>
            </section>
            
            {/* Quick Actions */}
            <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">
                Acciones Rápidas
              </h3>
              <div className="space-y-2">
                <button className="w-full p-3 text-left rounded-lg hover:bg-[var(--color-background)] transition-colors">
                  <div className="text-sm font-medium text-[var(--color-on-surface)]">Editar Perfil</div>
                </button>
                <button className="w-full p-3 text-left rounded-lg hover:bg-[var(--color-background)] transition-colors">
                  <div className="text-sm font-medium text-[var(--color-on-surface)]">Cambiar Contraseña</div>
                </button>
                <button className="w-full p-3 text-left rounded-lg hover:bg-[var(--color-background)] transition-colors">
                  <div className="text-sm font-medium text-[var(--color-on-surface)]">Configuración</div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
