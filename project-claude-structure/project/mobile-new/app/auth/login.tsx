import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, HelperText } from '@/components/PaperCompat';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from '@/theme/ThemeContext';
import { loginSchema, LoginFormData } from '@/types/auth';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export const LoginScreenOptions = {
  title: 'Iniciar Sesión',
} as const;

export default function LoginScreen() {
  const [apiError, setApiError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const theme = useTheme();

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      if (data.user.hasCompletedOnboarding) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    },
    onError: (error: Error) => setApiError(error.message),
  });

  const onSubmit = (data: LoginFormData) => {
    setApiError(null);
    loginMutation.mutate(data);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.text }]}>Iniciar Sesión</Text>
          
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email (usa demo@example.com)"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.email}
                    disabled={loginMutation.isPending}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    testID="email-input"
                    mode="outlined"
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
                    label="Contraseña (usa 12345678)"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.password}
                    disabled={loginMutation.isPending}
                    secureTextEntry
                    testID="password-input"
                    mode="outlined"
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
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
              style={styles.button}
              testID="submit-button"
            >
              Ingresar
            </Button>

            <View style={styles.linkContainer}>
              <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>¿No tienes cuenta? </Text>
              <Link href="/auth/register" asChild>
                <Text style={[styles.link, { color: theme.colors.primary }]}>Crear cuenta</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 24 },
  form: { marginBottom: 4 },
  inputContainer: { marginBottom: 4 },
  apiError: { textAlign: 'center' },
  button: { marginTop: 16 },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  link: { fontWeight: '600' },
});
