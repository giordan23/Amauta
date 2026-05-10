import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/theme/ThemeContext';
import { authService } from '@/services/authService';

export default function IndexScreen() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();
  const theme = useTheme();

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

        const session = await authService.restoreSession();
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text variant="bodyMedium" style={[styles.text, { color: theme.colors.textSecondary }]}>
        Cargando...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {},
});
