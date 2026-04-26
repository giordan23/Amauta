# Especificación Técnica — Simulador de Exámenes de Admisión (MVP)

**Versión:** 1.0.0  
**Fecha:** Abril 2026  
**Estado:** MVP — En definición  

---

## 1. Descripción General

Plataforma web/mobile para simular exámenes de admisión. Permite a los usuarios practicar con preguntas tipo examen, obtener retroalimentación inmediata y hacer seguimiento de su progreso. El MVP se centra en las funcionalidades core sin pagos ni agentes de IA.

---

## 2. Stack Tecnológico

### 2.1 Backend

| Tecnología | Versión recomendada | Uso |
|---|---|---|
| Node.js | 20 LTS | Runtime principal |
| Express.js | 4.x | Framework HTTP / REST API |
| Passport.js | 0.7.x | Autenticación OAuth |
| Prisma ORM | 5.x | Acceso y modelado de base de datos |
| Zod | 3.x | Validación de esquemas y DTOs |
| JWT (jsonwebtoken) | 9.x | Tokens de sesión tras OAuth |
| dotenv | 16.x | Gestión de variables de entorno |
| Winston | 3.x | Logging estructurado |
| Jest + Supertest | — | Testing unitario e integración |

### 2.2 Frontend

| Tecnología | Versión recomendada | Uso |
|---|---|---|
| React Native | 0.74+ | Framework mobile (iOS + Android) |
| Expo | 51+ | Toolchain y builds simplificados |
| React Navigation | 6.x | Navegación entre pantallas |
| Zustand | 4.x | Manejo de estado global |
| React Query (TanStack) | 5.x | Fetching, caché y sincronización de datos |
| Axios | 1.x | Cliente HTTP |
| React Native Paper | 5.x | Componentes UI (Material Design) |
| AsyncStorage | — | Persistencia local (token, preferencias) |

### 2.3 Base de Datos

| Tecnología | Uso |
|---|---|
| PostgreSQL 16 | Base de datos relacional principal |
| Prisma ORM | Migraciones y queries type-safe |

---

## 3. Arquitectura

### 3.1 Patrón General

El proyecto sigue una arquitectura **REST API monolítica por capas** para el MVP, optimizada para velocidad de desarrollo y simplicidad operativa.

```
React Native (Expo)
        │
        ▼
  REST API (Express)
        │
   ┌────┴────┐
   │  Capas  │
   │ Routes  │  ← Enrutamiento HTTP
   │ Controllers │  ← Orquestación
   │ Services │  ← Lógica de negocio
   │ Repositories │  ← Acceso a datos (Prisma)
   └────┬────┘
        │
   PostgreSQL
```


---

## 4. Patrones de Diseño

| Patrón | Dónde se aplica |
|---|---|
| Repository Pattern | Capa de acceso a datos (Prisma) |
| Service Layer | Lógica de negocio desacoplada de controladores |
| DTO (Data Transfer Objects) | Validación con Zod en entrada/salida |
| Middleware Chain | Auth, validación, manejo de errores en Express |
| Observer / Reactive | React Query para actualizaciones de estado remoto |
| Singleton | Conexión a BD, instancia de logger |

---

