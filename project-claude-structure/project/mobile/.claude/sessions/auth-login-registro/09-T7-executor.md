# Executor Output — T7: Pantalla Registro

### src/app/(auth)/register.tsx
```typescript
import { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { theme } from '@/theme';
import { registerSchema, RegisterFormData } from '@/types/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function RegisterScreen() {
  const [apiError, setApiError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      router.replace('/onboarding');
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setApiError(null);
    registerMutation.mutate(data);
  };

  const isLoading = registerMutation.isPending;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>
            Crear Cuenta
          </Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.email}
                    disabled={isLoading}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    testID="email-input"
                  />
                  <HelperText type="error" visible={!!errors.email}>
                    {errors.email?.message}
                  </HelperText>
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Contraseña"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.password}
                    disabled={isLoading}
                    secureTextEntry
                    autoComplete="new-password"
                    testID="password-input"
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password?.message}
                  </HelperText>
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Confirmar Contraseña"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.confirmPassword}
                    disabled={isLoading}
                    secureTextEntry
                    autoComplete="new-password"
                    testID="confirm-password-input"
                  />
                  <HelperText type="error" visible={!!errors.confirmPassword}>
                    {errors.confirmPassword?.message}
                  </HelperText>
                </View>
              )}
            />

            {apiError && (
              <HelperText type="error" visible style={styles.apiError}>
                {apiError}
              </HelperText>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
              testID="submit-button"
            >
              Registrarse
            </Button>

            <View style={styles.linkContainer}>
              <Text variant="bodyMedium">¿Ya tienes cuenta? </Text>
              <Link href="/login" asChild>
                <Text style={styles.link}>Iniciar sesión</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.text,
  },
  form: {
    gap: theme.spacing.sm,
  },
  inputContainer: {
    marginBottom: theme.spacing.xs,
  },
  apiError: {
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.md,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
```

### src/app/(auth)/__tests__/register.test.tsx
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegisterScreen from '../register';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

jest.mock('@/services/authService');
jest.mock('expo-router', () => ({
  router: { replace: jest.fn() },
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false });
  });

  it('renderiza los campos de email, password, confirmPassword y boton', () => {
    render(<RegisterScreen />, { wrapper: createWrapper() });

    expect(screen.getByTestId('email-input')).toBeTruthy();
    expect(screen.getByTestId('password-input')).toBeTruthy();
    expect(screen.getByTestId('confirm-password-input')).toBeTruthy();
    expect(screen.getByTestId('submit-button')).toBeTruthy();
    expect(screen.getByText('Crear Cuenta')).toBeTruthy();
  });

  it('muestra errores de validacion cuando los campos estan vacios', async () => {
    render(<RegisterScreen />, { wrapper: createWrapper() });

    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('El email es requerido')).toBeTruthy();
      expect(screen.getByText('La contraseña es requerida')).toBeTruthy();
      expect(screen.getByText('Confirma tu contraseña')).toBeTruthy();
    });
  });

  it('muestra error cuando las contraseñas no coinciden', async () => {
    render(<RegisterScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@test.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.changeText(screen.getByTestId('confirm-password-input'), 'different');
    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeTruthy();
    });
  });

  it('muestra error de API cuando el email ya existe', async () => {
    mockAuthService.register.mockRejectedValue(
      new Error('El email ya está registrado')
    );

    render(<RegisterScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByTestId('email-input'), 'existing@test.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.changeText(screen.getByTestId('confirm-password-input'), '12345678');
    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('El email ya está registrado')).toBeTruthy();
    });
  });

  it('actualiza el store y navega despues de registro exitoso', async () => {
    const mockUser = { id: '1', email: 'new@test.com' };
    mockAuthService.register.mockResolvedValue({
      access_token: 'token',
      user: mockUser,
    });

    const { router } = require('expo-router');

    render(<RegisterScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByTestId('email-input'), 'new@test.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.changeText(screen.getByTestId('confirm-password-input'), '12345678');
    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(router.replace).toHaveBeenCalledWith('/onboarding');
    });
  });
});
```

---

## Resumen

```json
{
  "tarea_id": "T7",
  "archivos_creados": [
    "src/app/(auth)/register.tsx",
    "src/app/(auth)/__tests__/register.test.tsx"
  ],
  "decisiones_tomadas": [
    "Mismo patron de estilos que Login para consistencia",
    "autoComplete='new-password' para password y confirmPassword",
    "Test especifico para 'passwords no coinciden'"
  ],
  "pendiente_para_reviewer": []
}
```
