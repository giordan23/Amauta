import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { theme } from '@/theme';

export default function IndexScreen() {
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/home');
      } else {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, isLoading]);

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