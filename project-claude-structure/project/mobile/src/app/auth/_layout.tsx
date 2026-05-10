import { Stack } from 'expo-router';
import { useTheme } from '@/theme/ThemeContext';

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: { color: theme.colors.text, fontWeight: '600' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    />
  );
}
