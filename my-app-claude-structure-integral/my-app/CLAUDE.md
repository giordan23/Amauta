# my-app

## Stack
- **Frontend:** Expo (managed) + React Native
- **Backend:** Node.js + Express
- **Auth:** Supabase Auth — gestionada desde Express (nunca directo desde el cliente)
- **Base de datos:** Supabase (PostgreSQL)

## Skills disponibles
Ubicados en `~/projects/skills/`:
- UI/UX mobile → `skills/mobile/react-native-ui.md`
- Testing RN → `skills/mobile/react-native-testing.md`
- Express API → `skills/backend/express-api.md`
- Express testing → `skills/backend/express-testing.md`

## Agentes disponibles
System prompts en `.claude/agents/`:
- `find-skills.md` → identifica qué skills y patrones aplicar
- `planner.md` → descompone el goal en tareas ordenadas
- `delegator.md` → asigna contexto y dependencias a cada tarea
- `executor.md` → implementa una tarea concreta
- `tester.md` → valida el output antes de avanzar

## Convenciones de código
- Componentes: PascalCase (`LoginScreen`, `PrimaryButton`)
- Hooks: prefijo `use` (`useAuth`, `useForm`)
- Servicios: sufijo `Service` (`authService`, `userService`)
- Endpoints RESTful bajo `/api/v1/`
- Response shape estándar:
  ```json
  { "data": {}, "error": null, "meta": {} }
  ```

## Estructura de carpetas
```
mobile/src/
  components/    ← componentes reutilizables
  screens/       ← pantallas (una por archivo)
  hooks/         ← hooks personalizados
  services/      ← llamadas HTTP (axios)
  store/         ← estado global (Zustand)
  theme/         ← design tokens

backend/src/
  routes/        ← definición de rutas Express
  controllers/   ← lógica de cada endpoint
  middleware/    ← auth, validación, errores
  services/      ← lógica de negocio (incluye Supabase)
  types/         ← tipos TypeScript compartidos
```

## Reglas importantes
- NUNCA llamar a Supabase directamente desde el cliente móvil
- SIEMPRE validar el JWT en cada endpoint protegido con middleware
- NUNCA hardcodear URLs, usar variables de entorno
- Los tokens se guardan en `expo-secure-store`, nunca en AsyncStorage
