# Especificación Técnica — Simulador de Exámenes de Admisión (MVP)

**Versión:** 1.0.0  
**Fecha:** Abril 2026  
**Estado:** MVP — En definición

\---

## 1\. Descripción General

Plataforma web/mobile para simular exámenes de admisión. Permite a los usuarios practicar con preguntas tipo examen, obtener retroalimentación inmediata y hacer seguimiento de su progreso. El MVP se centra en las funcionalidades core sin pagos ni agentes de IA.

\---

## 2\. Stack Tecnológico

### 2.1 Backend

|Tecnología|Versión recomendada|Uso|
|-|-|-|
|Node.js|20 LTS|Runtime principal (MVP)|
|Express.js|4.x|Framework HTTP / REST API|
|Supabase Auth|—|Autenticación (email/password + OAuth mock)|
|Prisma ORM|5.x|Acceso y modelado de base de datos|
|Zod|3.x|Validación de esquemas y DTOs|
|@supabase/supabase-js|2.x|Cliente Supabase para auth y DB|
|dotenv|16.x|Gestión de variables de entorno|
|Winston|3.x|Logging estructurado|
|Jest + Supertest|—|Testing unitario e integración|

> **Escalabilidad futura:** Cuando la aplicación requiera mayor rendimiento y concurrencia, se migrará el backend a **Golang** con Gin/Fiber + GORM, manteniendo la misma arquitectura por capas y compatibilidad con Supabase.

### 2.2 Frontend

|Tecnología|Versión recomendada|Uso|
|-|-|-|
|React Native|0.74+|Framework mobile (iOS + Android)|
|Expo|51+|Toolchain y builds simplificados|
|React Navigation|6.x|Navegación entre pantallas|
|Zustand|4.x|Manejo de estado global|
|React Query (TanStack)|5.x|Fetching, caché y sincronización de datos|
|@supabase/supabase-js|2.x|Cliente Supabase auth y API|
|React Native Paper|5.x|Componentes UI (Material Design)|
|Expo SecureStore|—|Persistencia segura (tokens)|

### 2.3 Base de Datos

|Tecnología|Uso|
|-|-|
|Supabase PostgreSQL|Base de datos managed (PostgreSQL 15+)|
|Prisma ORM|Migraciones y queries type-safe|
|Supabase Auth|Sistema de usuarios y autenticación|
|Supabase Storage|Almacenamiento de imágenes (futuro)|

\---

## 3\. Arquitectura

### 3.1 Patrón General

El proyecto sigue una arquitectura **REST API monolítica por capas** para el MVP, optimizada para velocidad de desarrollo y simplicidad operativa.

```
React Native (Expo) + Supabase Client
        │                    │
        ▼                    ▼
  REST API (Express)    Supabase Auth
        │                    │
   ┌────┴────┐               │
   │  Capas  │               │
   │ Routes  │  ← Enrutamiento HTTP
   │ Controllers │  ← Orquestación + Auth middleware
   │ Services │  ← Lógica de negocio
   │ Repositories │  ← Acceso a datos (Prisma)
   └────┬────┘
        │
   Supabase PostgreSQL
```



\---

## 4\. Patrones de Diseño

|Patrón|Dónde se aplica|
|-|-|
|Repository Pattern|Capa de acceso a datos (Prisma)|
|Service Layer|Lógica de negocio desacoplada de controladores|
|DTO (Data Transfer Objects)|Validación con Zod en entrada/salida|
|Middleware Chain|Auth (Supabase), validación, manejo de errores|
|Observer / Reactive|React Query para actualizaciones de estado remoto|
|Singleton|Cliente Supabase, instancia de logger|

\---

## 5\. Autenticación y Autorización

### 5.1 Flujo de Autenticación

El MVP utiliza **Supabase Auth** como proveedor principal con soporte para:

- **Email/Password**: Registro e inicio de sesión tradicional
- **OAuth Providers (Mock)**: Botones de Google y Facebook que redirigen a email/password por ahora
- **Gestión de sesiones**: Tokens JWT manejados automáticamente por Supabase

### 5.2 Implementación Frontend

```typescript
// Cliente Supabase configurado
const supabase = createClient(url, anonKey)

// Login con email/password
await supabase.auth.signInWithPassword({ email, password })

// Mock OAuth (redirige a formulario normal)
const handleGoogleLogin = () => {
  // Por ahora: mostrar modal de email/password
  // Futuro: supabase.auth.signInWithOAuth({ provider: 'google' })
}
```

### 5.3 Implementación Backend

```typescript
// Middleware de autenticación
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  const { data: user } = await supabase.auth.getUser(token)
  
  if (!user) return res.status(401).json({ error: 'Unauthorized' })
  req.user = user
  next()
}
```

\---

## 6\. Scope del MVP

### 6.1 Funcionalidades Incluidas

Basado en el roadmap del producto, el MVP incluye:

- ✅ **Registro e inicio de sesión** (email + contraseña)
- ✅ **Onboarding**: elegir país y universidad objetivo
- ✅ **Panel de administrador** para subir preguntas manualmente
- ✅ **Banco de preguntas** (universidad, periodo, área, carrera, dificultad)
- ✅ **Simulacro configurable**: elegir parámetros y responder preguntas
- ✅ **Pantalla de resultados**: puntaje, aciertos/errores con respuestas correctas

### 6.2 Universidades Iniciales

- **UNMSM** (Universidad Nacional Mayor de San Marcos)
- **UNSAAC** (Universidad Nacional de San Antonio Abad del Cusco)
- **UNI** (Universidad Nacional de Ingeniería)

### 6.3 Funcionalidades Excluidas (Fases Posteriores)

- ❌ OAuth real con Google/Facebook (solo mock UI)
- ❌ Historial detallado de simulacros
- ❌ Estadísticas avanzadas y progreso
- ❌ Subida de preguntas por estudiantes
- ❌ Carga masiva de preguntas (CSV/Excel)
- ❌ Inteligencia artificial y explicaciones automáticas
- ❌ Monetización y features premium

\---

