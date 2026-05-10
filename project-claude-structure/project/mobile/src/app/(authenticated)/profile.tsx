import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, Avatar, HelperText, Switch, List } from 'react-native-paper';
import { router } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTheme, useAppTheme, type ThemeMode } from '@/theme/ThemeContext';
import { userService } from '@/services/userService';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'system', label: 'Sistema', icon: '✨' },
  { value: 'light', label: 'Claro', icon: '☀️' },
  { value: 'dark', label: 'Oscuro', icon: '🌙' },
];

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const { themeMode, setThemeMode } = useAppTheme();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error('Error updating profile:', error);
    },
  });

  const { control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
    },
  });

  const handleLogout = async () => {
    await authService.logout();
    logout();
    router.replace('/auth/login');
  };

  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate(data);
  };

  const initials = [
    profile?.firstName?.[0] || user?.firstName?.[0] || '',
    profile?.lastName?.[0] || user?.lastName?.[0] || '',
  ].join('').toUpperCase() || user?.email?.[0]?.toUpperCase() || '?';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <Card style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text size={80} label={initials} style={[styles.avatar, { backgroundColor: theme.colors.primary }]} />
          <Text variant="headlineSmall" style={[styles.email, { color: theme.colors.text }]}>
            {profile?.email || user?.email}
          </Text>
          {profile?.targetUniversity && (
            <Text variant="bodyMedium" style={[styles.university, { color: theme.colors.textSecondary }]}>
              🎓 {profile.targetUniversity.shortName}
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Theme Settings */}
      <Card style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Apariencia
          </Text>
          <View style={styles.themeContainer}>
            {THEME_OPTIONS.map((option) => (
              <Button
                key={option.value}
                mode={themeMode === option.value ? 'contained' : 'outlined'}
                onPress={() => setThemeMode(option.value)}
                style={[styles.themeButton, themeMode === option.value && { backgroundColor: theme.colors.primaryContainer }]}
                labelStyle={[
                  styles.themeLabel,
                  { color: themeMode === option.value ? theme.colors.primary : theme.colors.text },
                ]}
                contentStyle={styles.themeContent}
              >
                <Text style={styles.themeIcon}>{option.icon}</Text>
                {option.label}
              </Button>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Profile Form */}
      <Card style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Información personal
          </Text>
          <View style={styles.form}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Nombres"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={updateMutation.isPending}
                    mode="outlined"
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
                    label="Apellidos"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    disabled={updateMutation.isPending}
                    mode="outlined"
                  />
                </View>
              )}
            />
          </View>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={updateMutation.isPending}
            disabled={updateMutation.isPending}
            style={styles.saveButton}
          >
            Guardar Cambios
          </Button>
          {updateMutation.isSuccess && (
            <HelperText type="info" visible>
              Perfil actualizado correctamente
            </HelperText>
          )}
        </Card.Content>
      </Card>

      {/* Logout */}
      <Card style={[styles.logoutCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Button
            mode="outlined"
            onPress={handleLogout}
            textColor={theme.colors.error}
            style={styles.logoutButton}
          >
            Cerrar Sesión
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  profileCard: { marginBottom: 16 },
  profileContent: { alignItems: 'center', paddingVertical: 24 },
  avatar: { marginBottom: 12 },
  email: { marginBottom: 4 },
  university: {},
  formCard: { marginBottom: 16 },
  sectionTitle: { marginBottom: 12 },
  themeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    borderRadius: 8,
  },
  themeContent: {
    flexDirection: 'row-reverse',
    paddingVertical: 8,
  },
  themeIcon: { fontSize: 16, marginRight: 4 },
  themeLabel: { fontSize: 13 },
  form: { gap: 4 },
  inputContainer: { marginBottom: 4 },
  saveButton: { marginTop: 12, borderRadius: 8 },
  logoutCard: {},
  logoutButton: { borderColor: '#D32F2F' },
});
