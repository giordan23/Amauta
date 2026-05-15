import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/types/auth';
import type { LoginFormData } from '@/types/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { Link, useNavigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await authService.login(data);
      setUser(result.user);
      navigate('/app/home');
    } catch (err) {
      setError('email', { message: (err as Error).message });
    }
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="auth-layout-mobile auth-hide-desktop">
        <div className="auth-header-mobile">
          <h1 className="auth-hero-title">Amauta</h1>
          <p className="auth-hero-description">Simulacro de Admisión Universitaria</p>
        </div>
        
        <div className="auth-form-mobile">
          <div className="form-container-mobile animate-slide-up">
            <div>
              <h2 className="auth-page-title">Inicia Sesión</h2>
              <p className="auth-page-subtitle">Accede a tu cuenta para continuar</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="auth-form-group">
                <label className="auth-form-label">Correo Electrónico</label>
                <input
                  {...register('email')}
                  type="email"
                  className={`auth-form-input ${errors.email ? 'auth-form-input--error' : ''}`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <span className="auth-form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Contraseña</label>
                <input
                  {...register('password')}
                  type="password"
                  className={`auth-form-input ${errors.password ? 'auth-form-input--error' : ''}`}
                  placeholder="Tu contraseña"
                />
                {errors.password && (
                  <span className="auth-form-error">{errors.password.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`auth-button auth-button--primary ${isSubmitting ? 'auth-button--loading' : ''}`}
              >
                {!isSubmitting && 'Iniciar Sesión'}
              </button>
            </form>

            <div className="auth-divider">
              <p className="text-sm text-[var(--color-text-muted)]">
                ¿No tienes cuenta?{' '}
                <Link to="/auth/register" className="auth-link">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="auth-layout-desktop auth-hide-mobile">
        <div className="auth-hero-section">
          <div className="auth-hero-content">
            <h1 className="auth-hero-title">Bienvenido a Amauta</h1>
            <p className="auth-hero-description">
              La plataforma más completa para preparar tu examen de admisión universitaria
            </p>
            
            <ul className="auth-features-list">
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Simulacros de examen realistas</span>
              </li>
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Análisis detallado de resultados</span>
              </li>
              <li className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Seguimiento de progreso personalizado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="form-container-desktop animate-scale-in">
            <div>
              <h2 className="auth-page-title">Iniciar Sesión</h2>
              <p className="auth-page-subtitle">
                Accede a tu cuenta para continuar con tu preparación
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="auth-form-group">
                <label className="auth-form-label">Correo Electrónico</label>
                <input
                  {...register('email')}
                  type="email"
                  className={`auth-form-input ${errors.email ? 'auth-form-input--error' : ''}`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <span className="auth-form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Contraseña</label>
                <input
                  {...register('password')}
                  type="password"
                  className={`auth-form-input ${errors.password ? 'auth-form-input--error' : ''}`}
                  placeholder="Tu contraseña"
                />
                {errors.password && (
                  <span className="auth-form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="auth-options">
                <label className="auth-remember-option">
                  <input type="checkbox" className="auth-checkbox" />
                  <span className="text-[var(--color-text-secondary)]">Recordar sesión</span>
                </label>
                <a href="#" className="auth-forgot-link">¿Olvidaste tu contraseña?</a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`auth-button auth-button--primary ${isSubmitting ? 'auth-button--loading' : ''}`}
              >
                {!isSubmitting && 'Iniciar Sesión'}
              </button>
            </form>

            <div className="auth-divider">
              <p className="text-[var(--color-text-secondary)]">
                ¿No tienes cuenta?{' '}
                <Link to="/auth/register" className="auth-link">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
