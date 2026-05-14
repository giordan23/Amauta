export function ExamConfigPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-[var(--color-on-background)]">
            Configurar Simulacro
          </h1>
          <p className="text-lg text-[var(--color-outline)] max-w-2xl mx-auto">
            Personaliza tu examen de simulacro eligiendo la cantidad de preguntas, tiempo y materias que deseas practicar
          </p>
        </header>

        {/* Configuration Form */}
        <div className="space-y-6">
          {/* Exam Type Selection */}
          <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
              Tipo de Simulacro
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center p-4 bg-[var(--color-background)] rounded-lg border-2 border-[var(--color-primary)] cursor-pointer">
                <input type="radio" name="examType" value="complete" className="sr-only" defaultChecked />
                <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-primary)] mr-3"></div>
                <div>
                  <div className="font-medium text-[var(--color-on-background)]">Simulacro Completo</div>
                  <div className="text-sm text-[var(--color-outline)]">100 preguntas - 3 horas</div>
                </div>
              </label>
              <label className="flex items-center p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20 cursor-pointer">
                <input type="radio" name="examType" value="custom" className="sr-only" />
                <div className="w-4 h-4 rounded-full border-2 border-[var(--color-outline)] mr-3"></div>
                <div>
                  <div className="font-medium text-[var(--color-on-background)]">Simulacro Personalizado</div>
                  <div className="text-sm text-[var(--color-outline)]">Configura tu simulacro</div>
                </div>
              </label>
            </div>
          </section>

          {/* Subject Selection */}
          <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
              Materias a Incluir
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: 'Matemática', questions: 25 },
                { name: 'Razonamiento Verbal', questions: 25 },
                { name: 'Razonamiento Matemático', questions: 20 },
                { name: 'Ciencias Naturales', questions: 15 },
                { name: 'Historia del Perú', questions: 10 },
                { name: 'Geografía', questions: 5 }
              ].map((subject) => (
                <label key={subject.name} className="flex items-center p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20 cursor-pointer hover:border-[var(--color-primary)]/50">
                  <input type="checkbox" className="w-4 h-4 text-[var(--color-primary)] mr-3" defaultChecked />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--color-on-background)]">{subject.name}</div>
                    <div className="text-xs text-[var(--color-outline)]">{subject.questions} preguntas</div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Time Configuration */}
          <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
              Configuración de Tiempo
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-on-surface)]">Duración del Examen</label>
                <select className="w-full p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20 text-[var(--color-on-background)]">
                  <option>3 horas (180 minutos)</option>
                  <option>2 horas (120 minutos)</option>
                  <option>1 hora (60 minutos)</option>
                  <option>30 minutos</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-on-surface)]">Mostrar Cronómetro</label>
                <select className="w-full p-3 bg-[var(--color-background)] rounded-lg border border-[var(--color-outline)]/20 text-[var(--color-on-background)]">
                  <option>Sí, mostrar tiempo</option>
                  <option>No mostrar tiempo</option>
                  <option>Solo últimos 30 minutos</option>
                </select>
              </div>
            </div>
          </section>

          {/* Additional Options */}
          <section className="bg-[var(--color-surface)] rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-[var(--color-on-surface)]">
              Opciones Adicionales
            </h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-[var(--color-primary)]" defaultChecked />
                <span className="text-[var(--color-on-surface)]">Mostrar resultados al finalizar</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-[var(--color-on-surface)]">Permitir revisión de respuestas</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-[var(--color-primary)]" defaultChecked />
                <span className="text-[var(--color-on-surface)]">Guardar progreso automáticamente</span>
              </label>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 bg-[var(--color-outline)]/10 text-[var(--color-on-background)] py-3 px-6 rounded-xl font-medium hover:bg-[var(--color-outline)]/20 transition-colors">
              Guardar Configuración
            </button>
            <button className="flex-1 bg-[var(--color-primary)] text-[var(--color-on-primary)] py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Iniciar Simulacro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
