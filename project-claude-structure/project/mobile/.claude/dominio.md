# Dominio — Simulador de Examenes de Admision Peru

## producto

App para que estudiantes peruanos practiquen examenes de admision universitaria.
Universidades iniciales: UNMSM, UNSAAC, UNI.

## audiencia

Estudiantes que quieren prepararse de forma autodidacta para ingresar a la universidad de su localidad.

## flujo core

```
Login → Seleccionar universidad → Configurar simulacro → Responder preguntas → Ver resultados
```

---

## dominios

### auth
- **Pantallas**: Login, Registro
- **Funcionalidades**: email + password, validacion de campos, manejo de errores
- **Entidad**: `User { id, email, role, createdAt }`

### onboarding
- **Pantallas**: SeleccionPais, SeleccionUniversidad
- **Funcionalidades**: captura de pais, seleccion de universidad objetivo
- **Entidades**: `Country { id, name }`, `University { id, name, shortName, countryId }`

### simulacro
- **Pantallas**: ConfigurarSimulacro, HacerSimulacro
- **Funcionalidades**:
  - Configurar parametros (universidad, periodo, area, carrera, dificultad)
  - Responder preguntas una a una
  - Navegar entre preguntas
  - Enviar respuestas
- **Entidades**:
  - `Question { id, content, options[], correctAnswer, universityId, period, area, career?, difficulty }`
  - `SimulacroConfig { universityId, period, area, career, difficulty, questionCount }`
  - `SimulacroAttempt { id, userId, questions[], answers[], startedAt, submittedAt? }`

### resultados
- **Pantallas**: ResultadosSimulacro
- **Funcionalidades**:
  - Mostrar puntaje total
  - Lista de aciertos y errores
  - Para cada error: mostrar respuesta correcta
- **Entidad**: `SimulacroResult { attemptId, score, correctCount, incorrectCount, details[] }`

### admin
- **Pantallas**: PanelAdmin, SubirPregunta
- **Funcionalidades**:
  - Subir preguntas manualmente
  - Indicar universidad, periodo, area, carrera, dificultad
  - CRUD de preguntas
- **Restriccion**: Solo usuarios con `role = admin`

---

## entidades principales

```typescript
interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
  universityId?: string;
  createdAt: Date;
}

interface University {
  id: string;
  name: string;        // "Universidad Nacional Mayor de San Marcos"
  shortName: string;   // "UNMSM"
  countryId: string;
}

interface Question {
  id: string;
  content: string;
  options: string[];           // A, B, C, D, E
  correctAnswer: number;       // indice de respuesta correcta
  universityId: string;
  period: string;              // "2026-I", "2025-II"
  area: string;                // Matematicas, Lenguaje, etc.
  career?: string;
  difficulty: 'facil' | 'medio' | 'dificil';
}

interface SimulacroAttempt {
  id: string;
  userId: string;
  questions: Question[];
  answers: number[];           // indice seleccionado por usuario
  startedAt: Date;
  submittedAt?: Date;
}
```

---

## flujos de usuario

### 1. Registro y Login
```
Cliente → Login → Captura Pais → Home
```

### 2. Hacer Simulacro
```
Cliente → Hacer simulacro → Seleccionar parametros → Leer preguntas → Responder → Enviar
```

### 3. Ver Resultados
```
Cliente → Mostrar resultados → Procesar evaluacion → Ver puntaje y errores
```

### 4. Admin - Subir Pregunta
```
Admin → Subir pregunta → Indicar universidad y periodo → Almacenar en banco
```

---

## scope MVP

### incluido
- Registro e inicio de sesion (email + password)
- Onboarding: seleccion de pais y universidad
- Panel de admin para subir preguntas manualmente
- Banco de preguntas (universidad, periodo, area, carrera, dificultad)
- Simulacro completo: configurar, responder, enviar
- Pantalla de resultados: puntaje, aciertos, errores con respuesta correcta

### excluido (fases futuras)
- IA, resolucion automatica, OCR
- Subida de preguntas por estudiantes
- Carga masiva por archivo (CSV/Excel)
- Historial y estadisticas de progreso
- Monetizacion / pagos
- Gamificacion (rachas, insignias, rankings)

---

## universidades MVP

| Universidad | Codigo |
|-------------|--------|
| Universidad Nacional Mayor de San Marcos | UNMSM |
| Universidad Nacional de San Antonio Abad del Cusco | UNSAAC |
| Universidad Nacional de Ingenieria | UNI |

---

## reglas de negocio

1. Un estudiante solo puede tener una universidad objetivo activa
2. Las preguntas se filtran por universidad, periodo, area, carrera, dificultad
3. El simulacro se evalua al momento del envio
4. Solo admins pueden subir/editar/eliminar preguntas
5. Un simulacro en progreso puede abandonarse (no se guarda)
