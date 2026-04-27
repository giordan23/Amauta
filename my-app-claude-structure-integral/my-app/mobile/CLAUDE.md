# Frontend — Expo (managed)

## Librerías principales
- **Navegación:** Expo Router (file-based)
- **Forms:** react-hook-form + zod
- **HTTP:** axios con interceptores de auth
- **Estado global:** Zustand
- **Auth storage:** expo-secure-store
- **UI base:** componentes propios (sin UI library externa)

## Design tokens
Todos los valores visuales viven en `src/theme/`:
- `colors.ts` → paleta completa + semántica (primary, error, surface...)
- `typography.ts` → familias, tamaños, pesos
- `spacing.ts` → escala de espaciado (4, 8, 12, 16, 24, 32...)
- `index.ts` → exporta todo junto como `theme`

## Patrones de componentes
- Props tipados siempre con TypeScript interface
- Estilos con `StyleSheet.create()`, nunca inline salvo valores dinámicos
- Variantes via prop: `<Button variant="primary" | "ghost" />`
- Loading y error states en todos los componentes que hacen fetch

## Patrones de pantallas
- Cada screen maneja su propio loading/error local
- Navegación solo mediante Expo Router (`router.push`, `router.replace`)
- Nunca lógica de negocio en el componente — delegar a hooks o services

## Comandos útiles
```bash
npx expo start          # desarrollo
npx expo start --ios    # simulador iOS
npx expo start --android
npx jest --watchAll     # tests en watch mode
```
