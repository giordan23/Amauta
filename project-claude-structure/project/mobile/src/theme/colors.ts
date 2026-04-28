export const colors = {
  primary: '#1E88E5',
  primaryLight: '#6AB7FF',
  primaryDark: '#005CB2',
  secondary: '#FFC107',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  border: '#E0E0E0',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;