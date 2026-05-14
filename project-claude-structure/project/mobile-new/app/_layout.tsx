// Import polyfills FIRST for browser compatibility
if (typeof window !== 'undefined') {
  require('../polyfills');
}

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform } from 'react-native';
// import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from '@/store/authStore';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';
import { authService } from '@/services/authService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 5 * 60 * 1000 },
  },
});

function RootLayoutContent() {
  const { setUser } = useAuthStore();
  const theme = useTheme();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const session = await authService.restoreSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch {
        // Storage no disponible en web, ignorar
      }
    };
    restoreSession();
  }, [setUser]);

  return (
    <>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
