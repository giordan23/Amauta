import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { theme } from '@/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 5 * 60 * 1000 },
  },
});

export default function RootLayout() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const isAuth = await authService.isAuthenticated();
        if (isAuth) {
          setUser({ id: '1', email: 'demo@example.com' });
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [setUser, setLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={{ colors: theme.colors }}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}