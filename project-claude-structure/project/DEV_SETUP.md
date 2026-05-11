# AMAUTA - Configuración de Desarrollo

> **Nota:** Este archivo es de referencia/docs. El archivo `.env.local` es tu configuración personal y **NO se sube** al repo.

---

## Archivos de configuración por ambiente

```
project/
├── backend/
│   ├── .env                    ← ❌ TU config real (no commit)
│   ├── .env.example            ← ✅ plantilla para tu compañero
│   └── .env.development.local  ← ❌ (opcional, alternativo)
└── mobile/
    ├── .env.local              ← ❌ TU config real (no commit)
    └── .env.example            ← ✅ plantilla para tu compañero
```

---

## Para agregar nueva configuración

### 1. Backend: crear variable de entorno

**Paso A:** Agrega la variable a `.env.example` (sí se sube):
```
SOME_NEW_VAR=descripcion_del_valor
```

**Paso B:** Agrega la variable a TU `.env` (no se sube):
```
SOME_NEW_VAR=tu_valor_real
```

**Paso C:** En el código, usa `process.env.SOME_NEW_VAR` (ya funciona con `dotenv.config()` en `src/index.ts`).

### 2. Mobile: crear variable de entorno

**Paso A:** Agrega a `.env.example`:
```
API_URL=http://TU_IP:3000/api/v1
```

**Paso B:** Agrega a TU `.env.local`:
```
API_URL=http://192.168.100.126:3000/api/v1
```

**Paso C:** En el código, lee de `@/config`:
```ts
import { API_URL } from '@/config';
```

---

## IPs comunes en la red local

| Dispositivo          | IP              |
|---------------------|-----------------|
| Tu PC (backend)      | 192.168.100.126 |
| Celular (Expo Go)    | 192.168.100.153 |

Si cambias de red o IP, actualiza:
- Backend CORS en `src/index.ts` → lista `CORS_ORIGINS`
- Mobile API_URL en `.env.local`

---

## Workflow de inicio en una nueva máquina

```bash
# 1. Clonar repo
git clone https://github.com/giordan23/Amauta.git
cd Amauta/project

# 2. Backend
cd backend
cp .env.example .env
# → Editar .env con tus credenciales de Supabase
npm install
npx prisma generate
npm run dev

# 3. Mobile
cd ../mobile
cp .env.example .env.local
# → Editar .env.local con tu IP de backend
npm install
npx expo start
```

---

## Comandos útiles de debugging

```bash
# Verificar que el backend responde
curl http://localhost:3000/health

# Ver logs del backend (si corres con npm run dev)
# Los logs aparecen en la terminal donde corres el backend

# Ver tu IP local
# Linux:   ip addr show | grep inet
# Windows: ipconfig | findstr /i "ipv4"
```

---

## Notas para el equipo

- Cadadeveloper tiene su propio `.env.local` y `.env` — **nunca se suben**
- Si agregas una variable de entorno, agrégala **AMBAS** en `.env.example` (plantilla) y en `.env` de tu máquina
- El backend necesita reiniciarse (`npm run dev`) después de cambiar `.env`
- Mobile necesita hacer **Refresh** (o cerrar/reabrir Expo Go) después de cambiar `.env.local`