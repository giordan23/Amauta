# Contrato de Integración: Auth

> Fuente de verdad para mobile y backend.
> Cualquier cambio aquí debe coordinarse entre ambas sesiones.

## Endpoints

### POST /api/v1/auth/register
**Propósito:** Crear nueva cuenta de usuario

**Request:**
```json
{
  "email": "string (email válido)",
  "password": "string (mínimo 8 caracteres)"
}
```

**Response exitoso (201):**
```json
{
  "data": {
    "access_token": "string (JWT de Supabase)",
    "user": {
      "id": "string (UUID)",
      "email": "string"
    }
  },
  "error": null
}
```

**Response error email duplicado (409):**
```json
{
  "data": null,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "El email ya está registrado"
  }
}
```

**Response error validación (400):**
```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "string descriptivo"
  }
}
```

---

### POST /api/v1/auth/login
**Propósito:** Autenticar usuario con email y password

**Request:**
```json
{
  "email": "string (email válido)",
  "password": "string (mínimo 8 caracteres)"
}
```

**Response exitoso (200):**
```json
{
  "data": {
    "access_token": "string (JWT de Supabase)",
    "user": {
      "id": "string (UUID)",
      "email": "string"
    }
  },
  "error": null
}
```

**Response error credenciales (401):**
```json
{
  "data": null,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email o contraseña incorrectos"
  }
}
```

**Response error validación (400):**
```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "string descriptivo"
  }
}
```

---

## Uso del token en el cliente (mobile)

- El `access_token` se guarda en `expo-secure-store`
- Cada request autenticado incluye el header:
  ```
  Authorization: Bearer <access_token>
  ```

## Validación del token en el servidor (backend)

```typescript
const { data: { user }, error } = await supabase.auth.getUser(token)
if (error || !user) throw new AppError('UNAUTHORIZED', 401)
```

---

## Notas
- El cliente NUNCA llama a Supabase directamente
- El backend NUNCA devuelve el refresh_token al cliente (lo gestiona Supabase internamente)
- En caso de token expirado, el cliente recibe 401 y debe redirigir al login
