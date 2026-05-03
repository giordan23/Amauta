# Amauta Backend API

Backend API para el simulador de exámenes de admisión universitaria MVP.

## 🚀 Stack Tecnológico

- **Node.js** 20 LTS + **TypeScript**
- **Express.js** - Framework HTTP
- **Supabase** - Auth y PostgreSQL managed
- **Prisma ORM** - Base de datos type-safe
- **Zod** - Validación de esquemas
- **Winston** - Logging estructurado

## 📁 Estructura del Proyecto

```
src/
├── controllers/     # Lógica de negocio y orquestación
├── routes/         # Definición de rutas HTTP
├── middleware/     # Auth, validación, error handling
├── services/       # Servicios externos (futuro)
├── repositories/   # Acceso a datos (futuro)
├── types/          # Tipos TypeScript y schemas Zod
├── utils/          # Utilidades (database, logger, supabase)
└── index.ts        # Punto de entrada del servidor

prisma/
├── schema.prisma   # Esquema de base de datos
└── seed.ts         # Datos iniciales
```

## 🛠️ Configuración de Desarrollo

### 1. Instalar dependencias

```bash
cd project-claude-structure/project/backend
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Supabase:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[password]@db.[project_ref].supabase.co:5432/postgres"

# Server Configuration
PORT=3000
NODE_ENV=development
API_VERSION=v1
CORS_ORIGIN=http://localhost:19006,exp://192.168.1.*:19000
```

### 3. Configurar base de datos

```bash
# Generar cliente Prisma
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# Sembrar datos iniciales
npm run db:seed
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 API Endpoints

### Health Check
- `GET /health` - Estado del servidor y base de datos

### API Base
- `GET /api/v1` - Información de la API y endpoints disponibles

### Autenticación
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/logout` - Cerrar sesión
- `POST /api/v1/auth/refresh` - Renovar token
- `POST /api/v1/auth/forgot-password` - Restablecer contraseña
- `GET /api/v1/auth/me` - Obtener perfil actual (protegido)

### Usuarios
- `PUT /api/v1/users/profile` - Actualizar perfil (protegido)
- `POST /api/v1/users/complete-onboarding` - Completar onboarding (protegido)
- `GET /api/v1/users/exam-history` - Historial de exámenes (protegido)
- `GET /api/v1/users/statistics` - Estadísticas del usuario (protegido)
- `DELETE /api/v1/users/account` - Eliminar cuenta (protegido)

### Universidades
- `GET /api/v1/universities` - Listar universidades
- `GET /api/v1/universities/:id` - Obtener universidad por ID
- `GET /api/v1/universities/:id/subjects` - Materias de una universidad
- `GET /api/v1/universities/:id/careers` - Carreras de una universidad
- `POST /api/v1/universities` - Crear universidad (admin)
- `PUT /api/v1/universities/:id` - Actualizar universidad (admin)
- `DELETE /api/v1/universities/:id` - Eliminar universidad (admin)

### Materias
- `GET /api/v1/subjects` - Listar materias
- `GET /api/v1/subjects/:id` - Obtener materia por ID
- `POST /api/v1/subjects` - Crear materia (admin)
- `PUT /api/v1/subjects/:id` - Actualizar materia (admin)
- `DELETE /api/v1/subjects/:id` - Eliminar materia (admin)

### Carreras
- `GET /api/v1/careers` - Listar carreras
- `GET /api/v1/careers/:id` - Obtener carrera por ID
- `POST /api/v1/careers` - Crear carrera (admin)
- `PUT /api/v1/careers/:id` - Actualizar carrera (admin)
- `DELETE /api/v1/careers/:id` - Eliminar carrera (admin)

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Verificar tipos TypeScript
npm run type-check

# Lint código
npm run lint
```

## 📊 Base de Datos

### Datos Semilla (MVP)

El archivo `prisma/seed.ts` incluye:

**Universidades:**
- UNMSM (Universidad Nacional Mayor de San Marcos)
- UNI (Universidad Nacional de Ingeniería)  
- UNSAAC (Universidad Nacional de San Antonio Abad del Cusco)

**Materias:**
- Matemática, Comunicación, Historia, Geografía, Economía
- Filosofía, Física, Química, Biología, Psicología

**Carreras:**
- Medicina, Ingenierías, Derecho, Administración
- Psicología, Educación, Arquitectura, etc.

**Preguntas de muestra:**
- 4 preguntas básicas para testing inicial

### Comandos útiles de Prisma

```bash
npm run db:studio    # Abrir Prisma Studio (GUI)
npm run db:generate  # Regenerar cliente Prisma
npm run db:migrate   # Aplicar migraciones
npm run db:deploy    # Deploy migraciones (producción)
npm run db:seed      # Ejecutar seed
```

## 🚢 Deployment

### Variables de entorno para producción

```env
NODE_ENV=production
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
DATABASE_URL=your_production_database_url
```

### Build y start

```bash
npm run build
npm start
```

## 📝 Notas del MVP

- **OAuth Social**: Configurado para futuro (actualmente solo email/password)
- **Admin Panel**: Rutas implementadas, falta middleware de roles
- **Rate Limiting**: No implementado (agregar en producción)
- **Tests**: Estructura básica (expandir cobertura)
- **Documentación API**: Considerar Swagger/OpenAPI

## 🔄 Escalabilidad Futura

Cuando se requiera mayor rendimiento:
- Migrar a **Golang** (Gin/Fiber + GORM)
- Mantener misma arquitectura por capas  
- Compatibilidad total con Supabase
- Migración gradual sin downtime