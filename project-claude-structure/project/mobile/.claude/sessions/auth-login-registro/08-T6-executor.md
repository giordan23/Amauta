# Executor Output — T6: Pantalla Login

### src/app/(auth)/login.tsx
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
import { loginSchema, LoginFormData } from '@/types/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const [apiError, setApiError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      router.replace('/onboarding');
    },
    onError: (error: Error) => {
      setApiError(error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setApiError(null);
    loginMutation.mutate(data);
  };

  const isLoading = loginMutation.isPending;

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
            Iniciar Sesión
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
                    autoComplete="password"
                    testID="password-input"
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password?.message}
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
              Ingresar
            </Button>

            <View style={styles.linkContainer}>
              <Text variant="bodyMedium">¿No tienes cuenta? </Text>
              <Link href="/register" asChild>
                <Text style={styles.link}>Crear cuenta</Text>
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

### src/app/(auth)/__tests__/login.test.tsx
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from '../login';
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

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false });
  });

  it('renderiza los campos de email, password y boton', () => {
    render(<LoginScreen />, { wrapper: createWrapper() });

    expect(screen.getByTestId('email-input')).toBeTruthy();
    expect(screen.getByTestId('password-input')).toBeTruthy();
    expect(screen.getByTestId('submit-button')).toBeTruthy();
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
  });

  it('muestra errores de validacion cuando los campos estan vacios', async () => {
    render(<LoginScreen />, { wrapper: createWrapper() });

    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('El email es requerido')).toBeTruthy();
      expect(screen.getByText('La contraseña es requerida')).toBeTruthy();
    });
  });

  it('muestra error de validacion para email invalido', async () => {
    render(<LoginScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByTestId('email-input'), 'invalid-email');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeTruthy();
    });
  });

  it('muestra error de API cuando las credenciales son invalidas', async () => {
    mockAuthService.login.mockRejectedValue(
      new Error('Email o contraseña incorrectos')
    );

    render(<LoginScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@test.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
    fireEvent.press(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText('Email o contraseña incorrectos')).toBeTruthy();
    });
  });

  it('actualiza el store y navega despues de login exitoso', async () => {
    const mockUser = { id: '1', email: 'test@test.com' };
    mockAuthService.login.mockResolvedValue({
      access_token: 'token',
      user: mockUser,
    });

    const { router } = require('expo-router');

    render(<LoginScreen />, { wrapper: createWrapper() });

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@test.com');
    fireEvent.changeText(screen.getByTestId('password-input'), '12345678');
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
  "tarea_id": "T6",
  "archivos_creados": [
    "src/app/(auth)/login.tsx",
    "src/app/(auth)/__tests__/login.test.tsx"
  ],
  "decisiones_tomadas": [
    "Usar HelperText de Paper para errores (consistente con Material Design)",
    "KeyboardAvoidingView + ScrollView para manejo de teclado",
    "apiError como estado local separado de errores de validacion",
    "testID en elementos clave para facilitar testing",
    "Link con asChild para styling consistente"
  ],
  "pendiente_para_reviewer": [
    "Verificar que theme tokens se importan correctamente",
    "Confirmar que expo-router mock funciona en CI"
  ]
}
```
