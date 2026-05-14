import type { Config } from '@tailwindcss/vite'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
}

export default config