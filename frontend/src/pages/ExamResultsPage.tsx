import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { ExamCompleteResponse } from '@/services/examService';

export function ExamResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<ExamCompleteResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('examResult');
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        navigate('/app/exam/config');
      }
    } else {
      navigate('/app/exam/config');
    }
    setLoading(false);
  }, []);

  const handleBackToHome = () => {
    sessionStorage.removeItem('currentExamId');
    sessionStorage.removeItem('examConfig');
    sessionStorage.removeItem('examResult');
    navigate('/app/home');
  };

  const handleReviewAnswers = () => {
    navigate('/app/exam/history');
  };

  if (loading || !result) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="flex-center" style={{ minHeight: '300px' }}>
            <div className="skeleton" style={{ width: '200px', height: '24px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const { examAttempt } = result;
  const score = examAttempt.score || 0;
  const correct = examAttempt.correctAnswers || 0;
  const total = examAttempt.totalQuestions || 0;

  // Determine grade
  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'Excelente', color: 'var(--color-success)', emoji: '🏆' };
    if (score >= 75) return { label: 'Muy Bien', color: 'var(--color-primary)', emoji: '🌟' };
    if (score >= 60) return { label: 'Bien', color: 'var(--color-secondary)', emoji: '👍' };
    if (score >= 50) return { label: 'Regular', color: 'var(--color-warning)', emoji: '📚' };
    return { label: 'Necesita Mejorar', color: 'var(--color-error)', emoji: '💪' };
  };

  const grade = getGrade(score);

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Results Header */}
        <div className="ui-card" style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>{grade.emoji}</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: 'var(--space-2)' }}>
            ¡Simulacro Completado!
          </h2>
          <p style={{ color: 'var(--color-outline)', marginBottom: 'var(--space-6)' }}>
            Universidad: {examAttempt.university?.name || 'N/A'}
          </p>

          {/* Score Circle */}
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            border: '8px solid var(--color-surface)', 
            boxShadow: 'var(--shadow-md)',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto var(--space-6)',
            borderColor: grade.color,
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: grade.color }}>
              {Math.round(score)}%
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-outline)' }}>
              {correct}/{total} correctas
            </span>
          </div>

          <div style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: grade.color,
            marginBottom: 'var(--space-4)',
          }}>
            {grade.label}
          </div>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Tiempo promedio: 2h 45min
          </p>
        </div>

        {/* Stats Grid */}
        <div className="cards-grid" style={{ marginTop: 'var(--space-6)' }}>
          <div className="ui-card">
            <div className="ui-card-header">
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <h3 className="ui-card-title">Correctas</h3>
            </div>
            <div className="ui-card-content" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)' }}>
                {correct}
              </div>
              <p style={{ color: 'var(--color-outline)', marginTop: 'var(--space-2)' }}>
                {((correct / total) * 100).toFixed(1)}% del total
              </p>
            </div>
          </div>

          <div className="ui-card">
            <div className="ui-card-header">
              <span style={{ fontSize: '1.5rem' }}>❌</span>
              <h3 className="ui-card-title">Incorrectas</h3>
            </div>
            <div className="ui-card-content" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-error)' }}>
                {total - correct}
              </div>
              <p style={{ color: 'var(--color-outline)', marginTop: 'var(--space-2)' }}>
                {((total - correct) / total * 100).toFixed(1)}% del total
              </p>
            </div>
          </div>

          <div className="ui-card">
            <div className="ui-card-header">
              <span style={{ fontSize: '1.5rem' }}>📝</span>
              <h3 className="ui-card-title">Total</h3>
            </div>
            <div className="ui-card-content" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                {total}
              </div>
              <p style={{ color: 'var(--color-outline)', marginTop: 'var(--space-2)' }}>
                preguntas resueltas
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', justifyContent: 'center' }}>
          <button 
            className="ui-action-button"
            onClick={handleReviewAnswers}
            style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)' }}
          >
            📊 Ver Historial
          </button>
          <button 
            className="ui-action-button"
            onClick={handleBackToHome}
          >
            🏠 Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}