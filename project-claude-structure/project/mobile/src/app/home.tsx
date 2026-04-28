import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { theme } from '@/theme';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await authService.logout();
    logout();
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        ¡Bienvenido!
      </Text>
      
      <Text variant="bodyLarge" style={styles.subtitle}>
        {user?.email}
      </Text>

      <Text variant="bodyMedium" style={styles.demoText}>
        🎉 ¡Auth funcionando correctamente!
      </Text>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Cerrar Sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  demoText: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: theme.spacing.lg,
  },
});