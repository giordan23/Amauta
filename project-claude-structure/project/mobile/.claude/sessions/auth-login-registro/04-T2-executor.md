# Executor Output — T2: Tipos y schemas de auth

### src/types/auth.ts
```typescript
import { z } from 'zod';

// ============================================
// Interfaces base
// ============================================

export interface User {
  id: string;
  email: string;
  role?: 'student' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

// ============================================
// Zod Schemas
// ============================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('Email inválido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

// ============================================
// Tipos inferidos de los schemas
// ============================================

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// ============================================
// Tipos de respuesta de API
// ============================================

export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;
```

---

## Resumen

```json
{
  "tarea_id": "T2",
  "archivos_creados": [
    "src/types/auth.ts"
  ],
  "decisiones_tomadas": [
    "Mensajes de error en español para UX consistente",
    "Validacion min(1) antes de otras validaciones para mensaje 'requerido' primero",
    "LoginResponse y RegisterResponse como alias para claridad",
    "role opcional en User porque no siempre viene del backend"
  ],
  "pendiente_para_reviewer": [
    "Verificar que ApiResponse coincide con formato real del backend"
  ]
}
```
