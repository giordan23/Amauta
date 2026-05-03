import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setUser(data.user);
      // After registration, always go to onboarding
      router.replace('/onboarding');
    },
    onError: (error: Error) => setApiError(error.message),
  });

  const onSubmit = (data: RegisterFormData) => {
    setApiError(null);
    registerMutation.mutate(data);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>Crear Cuenta</Text>
          
          <View style={styles.form}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Nombres (opcional)"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={registerMutation.isPending}
                    autoCapitalize="words"
                    testID="firstName-input"
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Apellidos (opcional)"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={registerMutation.isPending}
                    autoCapitalize="words"
                    testID="lastName-input"
                  />
                </View>
              )}
            />

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
                    disabled={registerMutation.isPending}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    disabled={registerMutation.isPending}
                    secureTextEntry
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
                    disabled={registerMutation.isPending}
                    secureTextEntry
                    testID="confirmPassword-input"
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
              loading={registerMutation.isPending}
              disabled={registerMutation.isPending}
              style={styles.button}
              testID="submit-button"
            >
              Crear Cuenta
            </Button>

            <View style={styles.linkContainer}>
              <Text variant="bodyMedium">¿Ya tienes cuenta? </Text>
              <Link href="/auth/login" asChild>
                <Text style={styles.link}>Iniciar Sesión</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1, padding: theme.spacing.lg, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: theme.spacing.xl, color: theme.colors.text },
  form: { gap: theme.spacing.sm },
  inputContainer: { marginBottom: theme.spacing.xs },
  apiError: { textAlign: 'center' },
  button: { marginTop: theme.spacing.md },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.lg },
  link: { color: theme.colors.primary, fontWeight: '600' },
});
