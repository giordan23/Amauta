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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[var(--color-on-surface)] mb-2">Crear Cuenta</h1>
        <p className="text-sm text-[var(--color-outline)] mb-6">Amauta - Simulacro de Admisión</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Nombre</label>
              <input
                {...register('firstName')}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-[var(--color-outline)] bg-[var(--color-background)] text-[var(--color-on-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Juan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Apellido</label>
              <input
                {...register('lastName')}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-[var(--color-outline)] bg-[var(--color-background)] text-[var(--color-on-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Pérez"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-outline)] bg-[var(--color-background)] text-[var(--color-on-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-sm text-[var(--color-error)] mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Contraseña</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-outline)] bg-[var(--color-background)] text-[var(--color-on-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Mínimo 8 caracteres"
            />
            {errors.password && <p className="text-sm text-[var(--color-error)] mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Confirmar Contraseña</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-outline)] bg-[var(--color-background)] text-[var(--color-on-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-sm text-[var(--color-error)] mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full">
            Crear Cuenta
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-[var(--color-outline)]">
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth/login" className="text-[var(--color-primary)] hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
