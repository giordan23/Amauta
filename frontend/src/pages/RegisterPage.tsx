import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/types/auth';
import type { RegisterFormData } from '@/types/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import { Link, useNavigate } from 'react-router';

export function RegisterPage() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await authService.register(data);
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
          <p className="text-lg opacity-90">Únete a nuestra comunidad</p>
        </div>
        
        <div className="auth-form-mobile">
          <div className="form-container-mobile animate-slide-up">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Crear Cuenta
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Comienza tu preparación para el examen de admisión
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && (
                    <span className="form-error">{errors.firstName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Apellido</label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Tu apellido"
                  />
                  {errors.lastName && (
                    <span className="form-error">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

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
                  placeholder="Mínimo 8 caracteres"
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repite tu contraseña"
                />
                {errors.confirmPassword && (
                  <span className="form-error">{errors.confirmPassword.message}</span>
                )}
              </div>

              <Button 
                type="submit" 
                loading={isSubmitting}
                fullWidth={true}
                className="mt-6"
              >
                Crear Cuenta
              </Button>
            </form>

            <div className="text-center mt-6 pt-6 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-text-muted)]">
                ¿Ya tienes cuenta?{' '}
                <Link 
                  to="/auth/login" 
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  Inicia Sesión
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
              Únete a Amauta
            </h1>
            <p className="text-xl opacity-90 text-balance mb-8">
              Miles de estudiantes ya confían en nosotros para su preparación universitaria
            </p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Acceso gratis para siempre</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Simulacros ilimitados</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Progreso detallado por materias</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="form-container-desktop animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                Crear Cuenta
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Comienza tu preparación para el examen de admisión
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && (
                    <span className="form-error">{errors.firstName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Apellido</label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    placeholder="Tu apellido"
                  />
                  {errors.lastName && (
                    <span className="form-error">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

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
                  placeholder="Mínimo 8 caracteres"
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Contraseña</label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repite tu contraseña"
                />
                {errors.confirmPassword && (
                  <span className="form-error">{errors.confirmPassword.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-checkbox">
                  <input type="checkbox" required />
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Acepto los{' '}
                    <a href="#" className="text-[var(--color-primary)] hover:underline">
                      Términos de Servicio
                    </a>
                    {' '}y{' '}
                    <a href="#" className="text-[var(--color-primary)] hover:underline">
                      Política de Privacidad
                    </a>
                  </span>
                </label>
              </div>

              <Button 
                type="submit" 
                loading={isSubmitting}
                fullWidth={true}
                size="lg"
                className="mt-6"
              >
                Crear Cuenta
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
              <p className="text-[var(--color-text-secondary)]">
                ¿Ya tienes cuenta?{' '}
                <Link 
                  to="/auth/login" 
                  className="text-[var(--color-primary)] font-medium hover:underline"
                >
                  Inicia Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
