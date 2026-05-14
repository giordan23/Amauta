export function ExamHistoryPage() {
  const exams = [
    { id: 1, date: '2026-05-12', type: 'Simulacro Completo', score: 85, duration: '2h 45m', subjects: 6 },
    { id: 2, date: '2026-05-10', type: 'Matemática', score: 92, duration: '45m', subjects: 1 },
    { id: 3, date: '2026-05-08', type: 'Simulacro Completo', score: 78, duration: '3h 0m', subjects: 6 },
    { id: 4, date: '2026-05-05', type: 'Razonamiento Verbal', score: 88, duration: '1h 15m', subjects: 1 },
    { id: 5, date: '2026-05-03', type: 'Simulacro Completo', score: 73, duration: '2h 55m', subjects: 6 },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-[var(--color-on-background)]">
            Historial de Simulacros
          </h1>
          <p className="text-lg text-[var(--color-outline)]">
            Revisa tu progreso y rendimiento en los simulacros anteriores
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 text-center space-y-2">
            <div className="text-2xl font-bold text-[var(--color-on-surface)]">15</div>
            <div className="text-sm text-[var(--color-outline)]">Exámenes Totales</div>
          </div>
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 text-center space-y-2">
            <div className="text-2xl font-bold text-[var(--color-success)]">81%</div>
            <div className="text-sm text-[var(--color-outline)]">Promedio General</div>
          </div>
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 text-center space-y-2">
            <div className="text-2xl font-bold text-[var(--color-on-surface)]">42h</div>
            <div className="text-sm text-[var(--color-outline)]">Tiempo Total</div>
          </div>
          <div className="bg-[var(--color-surface)] rounded-2xl p-6 text-center space-y-2">
            <div className="text-2xl font-bold text-[var(--color-primary)]">92%</div>
            <div className="text-sm text-[var(--color-outline)]">Mejor Puntaje</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-[var(--color-surface)] rounded-2xl p-6">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-[var(--color-on-surface)]">Filtrar por Tipo</label>
            <select className="w-full p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20 text-[var(--color-on-background)]">
              <option>Todos los tipos</option>
              <option>Simulacro Completo</option>
              <option>Matemática</option>
              <option>Razonamiento Verbal</option>
              <option>Ciencias</option>
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-[var(--color-on-surface)]">Período</label>
            <select className="w-full p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20 text-[var(--color-on-background)]">
              <option>Últimos 30 días</option>
              <option>Últimos 3 meses</option>
              <option>Últimos 6 meses</option>
              <option>Todo el tiempo</option>
            </select>
          </div>
        </div>

        {/* Exam History List */}
        <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[var(--color-outline)]/20">
            <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">Exámenes Recientes</h2>
          </div>
          
          <div className="divide-y divide-[var(--color-outline)]/20">
            {exams.map((exam) => (
              <div key={exam.id} className="p-6 hover:bg-[var(--color-background)]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[var(--color-on-surface)]">{exam.type}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        exam.score >= 90 
                          ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                          : exam.score >= 80 
                            ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]'
                            : 'bg-[var(--color-outline)]/20 text-[var(--color-outline)]'
                      }`}>
                        {exam.score}%
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-outline)]">
                      <span>📅 {new Date(exam.date).toLocaleDateString('es-ES')}</span>
                      <span>⏱️ {exam.duration}</span>
                      <span>📚 {exam.subjects} materia{exam.subjects > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors">
                      Ver Detalles
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-[var(--color-on-background)] bg-[var(--color-outline)]/10 rounded-lg hover:bg-[var(--color-outline)]/20 transition-colors">
                      Repetir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="p-6 text-center border-t border-[var(--color-outline)]/20">
            <button className="px-6 py-3 text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors">
              Cargar Más Exámenes
            </button>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">Progreso en el Tiempo</h2>
          <div className="h-64 bg-[var(--color-background)] rounded-lg flex items-center justify-center border border-[var(--color-outline)]/20">
            <div className="text-center space-y-2">
              <div className="text-4xl">📊</div>
              <div className="text-[var(--color-outline)]">Gráfico de progreso próximamente</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
