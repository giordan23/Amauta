# Contexto: Mobile (Expo)

## Stack
- Framework: Expo (managed workflow)
- Lenguaje: TypeScript strict
- Navegación: Expo Router (file-based)
- Forms: react-hook-form + zod
- HTTP: axios con interceptores de auth
- Estado global: Zustand
- Auth storage: expo-secure-store (NUNCA AsyncStorage para tokens)
- Testing: Jest + @testing-library/react-native

## Estructura de carpetas
```
src/
  components/    ← componentes reutilizables (PascalCase)
  screens/       ← una pantalla por archivo
  hooks/         ← prefijo use (useAuth, useForm)
  services/      ← llamadas HTTP (authService, userService)
  store/         ← estado global Zustand
  theme/         ← design tokens (colors, typography, spacing)
```

## Convenciones
- Componentes: PascalCase
- Hooks: prefijo `use`
- Archivos de componentes: `.tsx`
- Archivos de hooks/services: `.ts`
- Estilos: `StyleSheet.create()` siempre, nunca inline salvo valores dinámicos
- Tokens: `theme.colors.primary`, `theme.spacing.md`, `theme.typography.body`

## Reglas críticas
- NUNCA llamar a Supabase directamente desde el cliente
- NUNCA guardar tokens en AsyncStorage
- SIEMPRE manejar estados: loading, error, success
- HTTP solo desde `src/services/`, nunca en componentes ni screens

## Contratos de integración
Ver `.claude/contracts/` para los contratos con el backend

## Comandos
```bash
npx expo start
npx expo start --ios
npx expo start --android
npx jest --watchAll
```
