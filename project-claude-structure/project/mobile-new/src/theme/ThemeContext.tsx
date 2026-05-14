import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, type Colors } from './colors';
import { spacing, type Spacing } from './spacing';

// Paper theme types - only imported on native to avoid web bundling issues
type PaperTheme = Record<string, unknown>;

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppTheme {
  mode: ThemeMode;
  colors: Colors;
  spacing: Spacing;
  isDark: boolean;
  paperTheme: PaperTheme;
}

const THEME_STORAGE_KEY = '@amauta_theme_mode';

// Light/Dark paper themes - loaded lazily on native only
function getNativePaperThemes() {
  if (Platform.OS === 'web') return { lightPaperTheme: {}, darkPaperTheme: {} };
  // Dynamic require to keep paper out of web bundle
  const { MD3DarkTheme, MD3LightTheme } = require('react-native-paper');
  const lightPaperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: lightColors.primary,
      primaryContainer: lightColors.primaryContainer,
      secondary: lightColors.secondary,
      background: lightColors.background,
      surface: lightColors.surface,
      surfaceVariant: lightColors.surfaceVariant,
      error: lightColors.error,
      onPrimary: lightColors.onPrimary,
      onSurface: lightColors.onSurface,
      onSurfaceVariant: lightColors.onSurfaceVariant,
      outline: lightColors.outline,
      inverseSurface: lightColors.inverseSurface,
      inverseOnSurface: lightColors.inverseOnSurface,
      inversePrimary: lightColors.inversePrimary,
      shadow: lightColors.shadow,
      scrim: lightColors.scrim,
      backdrop: lightColors.backdrop,
      elevation: lightColors.elevation,
    },
  };
  const darkPaperTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: darkColors.primary,
      primaryContainer: darkColors.primaryContainer,
      secondary: darkColors.secondary,
      background: darkColors.background,
      surface: darkColors.surface,
      surfaceVariant: darkColors.surfaceVariant,
      error: darkColors.error,
      onPrimary: darkColors.onPrimary,
      onSurface: darkColors.onSurface,
      onSurfaceVariant: darkColors.onSurfaceVariant,
      outline: darkColors.outline,
      inverseSurface: darkColors.inverseSurface,
      inverseOnSurface: darkColors.inverseOnSurface,
      inversePrimary: darkColors.inversePrimary,
      shadow: darkColors.shadow,
      scrim: darkColors.scrim,
      backdrop: darkColors.backdrop,
      elevation: darkColors.elevation,
    },
  };
  return { lightPaperTheme, darkPaperTheme };
}

interface ThemeContextType {
  theme: AppTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
          setThemeModeState(saved as ThemeMode);
        }
      } catch {
        // Use default
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Ignore save error
    }
  };

  const toggleTheme = () => {
    const nextMode: ThemeMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'system' : 'light';
    setThemeMode(nextMode);
  };

  // Determine if dark mode should be used
  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');

  const { lightPaperTheme, darkPaperTheme } = getNativePaperThemes();
  const colors = isDark ? darkColors : lightColors;
  const paperTheme = isDark ? darkPaperTheme : lightPaperTheme;

  const theme: AppTheme = {
    mode: themeMode,
    colors,
    spacing,
    isDark,
    paperTheme,
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}

// Convenience hook for just the theme
export function useTheme(): AppTheme {
  const { theme } = useContext(ThemeContext)!;
  return theme;
}
