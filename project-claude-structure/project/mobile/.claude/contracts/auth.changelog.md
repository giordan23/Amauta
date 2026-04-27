# Changelog — Auth Contract

## v1.1 — 2026-04-26

### Agregado
- `POST /api/v1/auth/register` — crear nueva cuenta
  - Request: email, password
  - Response 201: access_token, user
  - Error 409: EMAIL_ALREADY_EXISTS
  - Error 400: VALIDATION_ERROR

## v1.0 — 2026-04-25

### Inicial
- `POST /api/v1/auth/login` — autenticar usuario
  - Request: email, password
  - Response 200: access_token, user
  - Error 401: INVALID_CREDENTIALS
  - Error 400: VALIDATION_ERROR
