import type { Config } from '@tailwindcss/vite'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-container': 'var(--color-primary-container)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        'on-primary': 'var(--color-on-primary)',
        'on-background': 'var(--color-on-background)',
        'on-surface': 'var(--color-on-surface)',
        outline: 'var(--color-outline)',
        success: 'var(--color-success)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      maxWidth: {
        xs: 'var(--container-xs)',
        sm: 'var(--container-sm)',
        md: 'var(--container-md)',
        lg: 'var(--container-lg)',
        xl: 'var(--container-xl)',
        '2xl': 'var(--container-2xl)',
        '3xl': 'var(--container-3xl)',
        '4xl': 'var(--container-4xl)',
        '5xl': 'var(--container-5xl)',
        '6xl': 'var(--container-6xl)',
        '7xl': 'var(--container-7xl)',
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
}

export default config