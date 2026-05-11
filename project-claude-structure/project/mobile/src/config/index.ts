// API URL configurable via .env.local
// Pour desarrollo: cambia el valor en mobile/.env.local
// La variable EXPO_PUBLIC_API_URL tiene prioridad si está definida
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export const API_URL = apiUrl || 'http://localhost:3000/api/v1';