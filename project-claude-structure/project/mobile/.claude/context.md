# Context — Mobile (Expo/React Native)

## stack

| Categoria | Tecnologia | Version |
|-----------|------------|---------|
| Runtime | Expo (managed) | 51+ |
| Framework | React Native | 0.74+ |
| Lenguaje | TypeScript | strict |
| Navegacion | Expo Router | 3.x |
| UI | React Native Paper | 5.x |
| Estado global | Zustand | 4.x |
| Fetching | TanStack Query | 5.x |
| HTTP | Axios | 1.x |
| Forms | react-hook-form + zod | - |
| Auth | Supabase Auth | - |
| Storage seguro | expo-secure-store | - |
| Testing | Jest + @testing-library/react-native | - |

## estructura

```
src/
  app/(auth)/       ← login, registro, onboarding
  app/(app)/        ← home, simulacro, resultados, perfil
  app/(admin)/      ← panel admin (protegido por rol)
  components/       ← reutilizables, PascalCase
  hooks/            ← prefijo use
  services/         ← unico punto de acceso a HTTP
  store/            ← slices Zustand por dominio
  theme/            ← colors, typography, spacing
  utils/            ← helpers puros
  types/            ← interfaces globales
```

## convenciones

### nombres
- Componentes: `PascalCase.tsx`
- Hooks/services/utils: `camelCase.ts`
- Tests: `__tests__/NombreComponente.test.tsx`

### estilos
- Siempre `StyleSheet.create()`
- Nunca inline (excepto valores dinamicos)
- Tokens: `theme.colors.x`, `theme.spacing.x`, `theme.typography.x`

### datos
- HTTP solo desde `src/services/`
- React Query para todo fetching
- Nunca `useEffect` + `fetch` directo

### auth
- Tokens en `expo-secure-store` (nunca AsyncStorage)
- Nunca llamar Supabase directo desde componentes

### estados
- Siempre manejar: `loading`, `error`, `success`
- Zustand para estado global
- React Query para estado del servidor

### testing
- `describe('Componente')` > `it('hace X cuando Y')`
- `jest.mock()` para services
- Nunca llamadas reales en tests

## reglas criticas

1. **HTTP**: Solo desde `src/services/`
2. **Tokens**: Solo `expo-secure-store`
3. **Env vars**: Nunca hardcodear URLs ni claves
4. **Validacion**: Siempre zod en formularios
5. **Tipos**: Sin `any`, TypeScript strict

## referencias

- Dominio y reglas de negocio: `@dominio.md`
- Contratos de API: `contracts/*.md`
- Skills disponibles: `skills/*.md`
