# Executor Output — T1: Design tokens y theme base

### src/theme/colors.ts
```typescript
export const colors = {
  // Primary - Azul educativo
  primary: '#1E88E5',
  primaryLight: '#6AB7FF',
  primaryDark: '#005CB2',

  // Secondary
  secondary: '#FFC107',

  // Backgrounds
  background: '#F5F5F5',
  surface: '#FFFFFF',

  // Feedback
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',

  // Text
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',

  // Borders
  border: '#E0E0E0',

  // Base
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;
```

### src/theme/typography.ts
```typescript
import { TextStyle } from 'react-native';

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  } as TextStyle,

  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  } as TextStyle,

  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  } as TextStyle,

  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,

  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,

  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,

  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,
} as const;

export type Typography = typeof typography;
```

### src/theme/spacing.ts
```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type Spacing = typeof spacing;
```

### src/theme/index.ts
```typescript
import { colors, type Colors } from './colors';
import { typography, type Typography } from './typography';
import { spacing, type Spacing } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
} as const;

export type Theme = {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
};

// Re-export individuales para conveniencia
export { colors, typography, spacing };
export type { Colors, Typography, Spacing };
```

---

## Resumen

```json
{
  "tarea_id": "T1",
  "archivos_creados": [
    "src/theme/colors.ts",
    "src/theme/typography.ts",
    "src/theme/spacing.ts",
    "src/theme/index.ts"
  ],
  "decisiones_tomadas": [
    "Color primary azul (#1E88E5) - apropiado para app educativa",
    "Agregados success y warning ademas de error para feedback completo",
    "fontWeight como string para compatibilidad con React Native",
    "Exportados tipos individuales para flexibilidad de uso"
  ],
  "pendiente_para_reviewer": [
    "Verificar que los colores cumplen contraste WCAG AA"
  ]
}
```
