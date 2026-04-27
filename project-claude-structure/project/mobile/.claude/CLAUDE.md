# Sistema de Agentes — Mobile

## Flujo de trabajo

```
skill-finder → planner → delegator → executor → reviewer
     ↓            ↓          ↓           ↓          ↓
  01-*.json    02-*.json   03-T*-*.json  *.md    03-T*-*.json
```

Cada agente lee el output del anterior y genera el suyo en `sessions/<feature>/`.

## Agentes

| Agente | Rol | Input | Output |
|--------|-----|-------|--------|
| skill-finder | Identifica skills, librerías, patrones, riesgos | Goal del usuario | `01-skill-finder.json` |
| planner | Descompone en tareas ordenadas | Output skill-finder | `02-planner.json` |
| delegator | Genera brief detallado para una tarea | Plan + tarea ID | `03-TX-delegator.json` |
| executor | Implementa código | Brief del delegator | `03-TX-executor.md` |
| reviewer | Valida código vs convenciones | Brief + código | `03-TX-reviewer.json` |

## Estructura de carpetas

```
.claude/
  CLAUDE.md              ← este archivo
  context.md             ← stack técnico y convenciones
  dominio.md             ← entidades, flujos, reglas de negocio

  agents/                ← definición de cada agente
    skill-finder.md
    planner.md
    delegator.md
    executor.md
    reviewer.md

  contracts/             ← contratos de API (mobile ↔ backend)
    auth.md
    auth.changelog.md

  skills/                ← referencias a documentación por área
    react-native-ui.md
    react-native-forms.md
    react-native-data.md
    react-native-auth.md
    react-native-testing.md

  templates/             ← estructura de output por agente
    skill-finder.json
    planner.json
    delegator.json
    reviewer.json

  sessions/              ← pipelines de implementación
    _index.md            ← lista de sesiones activas
    <feature>/
      _status.json       ← estado actual del pipeline
      _decisions.md      ← decisiones tomadas
      _blockers.md       ← problemas y bloqueos
      01-skill-finder.json
      02-planner.json
      03-T1-delegator.json
      03-T1-executor.md
      03-T1-reviewer.json
      ...
```

## Cómo iniciar una sesión

1. Crear carpeta en `sessions/<nombre-feature>/`
2. Ejecutar skill-finder con el goal
3. Guardar output en `01-skill-finder.json`
4. Crear `_status.json` con estado inicial
5. Continuar con planner, delegator, etc.

## Cómo continuar una sesión

1. Leer `_status.json` para saber el paso actual
2. Leer el último output generado
3. Ejecutar el siguiente agente
4. Guardar output y actualizar `_status.json`

## Convenciones

- Outputs JSON deben ser válidos y parseables
- Código del executor va en archivos `.md` con bloques de código
- Nombres de archivo: `##-agente.json` o `##-TX-agente.json`
- TX = número de tarea (T1, T2, T3...)

## Referencias

- Stack y convenciones: `context.md`
- Dominio y negocio: `dominio.md`
- Contratos de API: `contracts/*.md`
