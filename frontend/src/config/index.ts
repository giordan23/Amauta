export const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000/api/v1' 
  : import.meta.env.VITE_API_URL || 'https://backapi.simulacroadmision.com/api/v1';