import ky from 'ky';
import { storage } from './storage';
import { API_URL } from '@/config';

const isDev = import.meta.env.DEV;

async function handleError(response: Response): Promise<never> {
  let message = 'Error de conexión';

  try {
    const body = await response.json();
    if (body?.error?.message) {
      message = body.error.message;
    } else if (body?.message) {
      message = body.message;
    } else if (body?.error?.code === 'VALIDATION_ERROR') {
      const issues = body?.error?.details?.[0];
      if (issues?.message) {
        message = issues.message;
      } else if (issues?.path?.length) {
        message = `Campo inválido: ${issues.path.join('.')}`;
      } else {
        message = 'Datos de formulario inválidos';
      }
    }
  } catch {
    // ignore parse errors
  }

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (!refreshed) {
      storage.clearTokens();
    }
  }

  if (response.status === 0) {
    message = 'La solicitud tardó demasiado';
  }

  if (isDev) {
    console.warn('[API Error]', { url: response.url, status: response.status });
  }

  const error = new Error(message) as Error & { status?: number };
  error.status = response.status;
  return Promise.reject(error);
}

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = storage.getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const body = await res.json();
    if (body?.data?.session?.access_token) {
      const { access_token, refresh_token } = body.data.session;
      storage.setAccessToken(access_token);
      if (refresh_token) storage.setRefreshToken(refresh_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export const api = ky.create({
  prefixUrl: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = storage.getAccessToken();
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          return handleError(response);
        }
        return response;
      }
    ]
  }
});
