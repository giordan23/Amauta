import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from '@/store/authStore';
import { theme } from '@/theme';
import { authService } from '@/services/authService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 5 * 60 * 1000 },
  },
});

export default function RootLayout() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Restore session on app start
    const restoreSession = async () => {
      const session = await authService.restoreSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    restoreSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={{ colors: theme.colors }}>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}