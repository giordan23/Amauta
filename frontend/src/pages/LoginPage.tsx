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
      <div className="auth-layout-mobile hide-desktop">
        <div className="auth-header-mobile">
          <h1 className="text-3xl font-bold mb-2">Amauta</h1>
          <p className="text-lg opacity-90">Simulacro de Admisión Universitaria</p>
        </div>
        
        <div className="auth-form-mobile">
          <div className="form-container-mobile animate-slide-up">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Inicia Sesión
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Accede a tu cuenta para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input
                  {...register('email')}
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input
                  {...register('password')}
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Tu contraseña"
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary btn-full ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? '' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="text-center mt-6 pt-6 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-text-muted)]">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/auth/register" 
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="auth-layout-desktop hide-mobile">
        <div className="auth-hero-section">
          <div className="auth-hero-content">
            <h1 className="text-5xl font-bold mb-4 text-balance">
              Bienvenido a Amauta
            </h1>
            <p className="text-xl opacity-90 text-balance mb-8">
              La plataforma más completa para preparar tu examen de admisión universitaria
            </p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Simulacros de examen realistas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Análisis detallado de resultados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Seguimiento de progreso personalizado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="form-container-desktop animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Accede a tu cuenta para continuar con tu preparación
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input
                  {...register('email')}
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input
                  {...register('password')}
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Tu contraseña"
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-[var(--color-text-secondary)]">
                    Recordar sesión
                  </span>
                </label>
                <a href="#" className="text-[var(--color-primary)] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary btn-full btn-lg ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? '' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
              <p className="text-[var(--color-text-secondary)]">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/auth/register" 
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
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
