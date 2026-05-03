import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { theme } from '@/theme';

export default function IndexScreen() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = await authService.getToken();
        
        if (!token) {
          setUser(null);
          router.replace('/auth/login');
          return;
        }

        // Token exists, check if it's valid by trying to get user data
        // For now, we'll assume the token is valid if it exists
        // TODO: Call /users/me endpoint to validate token
        setUser({ id: '1', email: 'demo@example.com', hasCompletedOnboarding: false });
        
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [setUser, setLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      } else if (user?.hasCompletedOnboarding) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [isAuthenticated, isLoading, user?.hasCompletedOnboarding]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text variant="bodyMedium" style={styles.text}>
        Cargando...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  text: { color: theme.colors.textSecondary },
});