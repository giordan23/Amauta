export const lightColors = {
  primary: '#1E88E5',
  primaryLight: '#6AB7FF',
  primaryDark: '#005CB2',
  secondary: '#FFC107',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#E3F2FD',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBBDB',
  border: '#E0E0E0',
  white: '#FFFFFF',
  black: '#000000',
  // Material You extended
  primaryContainer: '#BBDEFB',
  onPrimary: '#FFFFFF',
  onSurface: '#212121',
  onSurfaceVariant: '#757575',
  successContainer: '#C8E6C9',
  outline: '#E0E0E0',
  // Dark text on light
  inverseSurface: '#313033',
  inverseOnSurface: '#F4EFF4',
  inversePrimary: '#90CAF9',
  shadow: '#000000',
  scrim: '#000000',
  backdrop: 'rgba(0, 0, 0, 0.4)',
  elevation: {
    level0: 'transparent',
    level1: '#F5F5F5',
    level2: '#EEEEEE',
    level3: '#E0E0E0',
    level4: '#D6D6D6',
    level5: '#CCCCCC',
  },
} as const;

export const darkColors = {
  primary: '#90CAF9',
  primaryLight: '#6AB7FF',
  primaryDark: '#1565C0',
  secondary: '#FFD54F',
  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2C2C2C',
  error: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
  text: '#E0E0E0',
  textSecondary: '#9E9E9E',
  textDisabled: '#6D6D6D',
  border: '#424242',
  white: '#FFFFFF',
  black: '#000000',
  // Material You extended
  primaryContainer: '#1565C0',
  onPrimary: '#003258',
  onSurface: '#E0E0E0',
  onSurfaceVariant: '#9E9E9E',
  successContainer: '#1B5E20',
  outline: '#424242',
  // Dark specific
  inverseSurface: '#E0E0E0',
  inverseOnSurface: '#313033',
  inversePrimary: '#1E88E5',
  shadow: '#000000',
  scrim: '#000000',
  backdrop: 'rgba(0, 0, 0, 0.6)',
  elevation: {
    level0: 'transparent',
    level1: '#1E1E1E',
    level2: '#232323',
    level3: '#282828',
    level4: '#2C2C2C',
    level5: '#323232',
  },
} as const;

// Use string instead of literal types so both light and dark satisfy this type
export type Colors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  error: string;
  success: string;
  warning: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  white: string;
  black: string;
  primaryContainer: string;
  onPrimary: string;
  onSurface: string;
  onSurfaceVariant: string;
  successContainer: string;
  outline: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
  };
};
