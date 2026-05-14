# Migration PRD: Expo React Native → Vite 8 + React 19 + Tailwind CSS 4 + PWA

## 🎯 Project Overview

Transform existing Expo React Native application into a modern web application using Vite 8, React 19, Tailwind CSS 4, and PWA capabilities while preserving 100% of current functionality and user experience.

## 📊 Current System Analysis

### Technology Stack
- **Framework**: Expo 52.0.0 + React Native 0.76.4
- **React**: 18.2.0 + react-dom 18.2.0  
- **UI Library**: react-native-paper 5.15.1 + Custom components (PaperCompat.tsx)
- **Routing**: expo-router 4.0.0
- **State Management**: Zustand 5.0.12 + @tanstack/react-query 5.100.5
- **Forms**: react-hook-form 7.74.0 + @hookform/resolvers 5.2.2
- **Validation**: zod 4.3.6
- **Storage**: @react-native-async-storage/async-storage + expo-secure-store
- **HTTP Client**: axios 1.15.2
- **Theming**: Custom ThemeContext with light/dark/system support

### Current Features & Architecture
- **Authentication System**: Complete login/register flow with JWT + refresh tokens
- **Theme System**: Persistent light/dark/system mode with AsyncStorage
- **Exam Platform**: Configuration, taking, results, history management
- **User Management**: Profile, onboarding flows
- **Backend Integration**: Production API at `https://backapi.simulacroadmision.com/api/v1`
- **Component System**: Custom UI components in `PaperCompat.tsx` for web compatibility
- **State Architecture**: Reactive state with Zustand stores
- **Form Validation**: Comprehensive validation with react-hook-form + zod schemas

### File Structure Analysis
```
src/
├── app/                    # Expo Router pages
│   ├── (authenticated)/    # Protected routes
│   ├── auth/              # Authentication pages  
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── services/             # API services and utilities
├── store/               # Zustand state stores
├── theme/               # Theme system and styling
├── types/               # TypeScript definitions
└── config/              # App configuration
```

### Critical Business Logic to Preserve
1. **Authentication Flow**: JWT handling, token refresh, session management logic
2. **Theme System**: Multi-mode theming (light/dark/system) with persistence logic
3. **Exam Engine**: Complete exam lifecycle management and business rules
4. **API Integration**: Backend integration patterns and error handling logic
5. **Form Validation**: Validation schemas and form state management patterns
6. **User State**: Authentication state and user data management patterns

### Dependencies to Modernize (Not Preserve)
#### Current → Recommended Replacement
- **zod 4.3.6** → **zod ^3.23.8** (v4 is pre-release, v3 is stable)
- **axios 1.15.2** → **fetch API + ky ^1.7.2** (modern, lightweight HTTP client)
- **@tanstack/react-query 5.100.5** → **@tanstack/react-query ^5.56.2** (latest stable)
- **react-hook-form 7.74.0** → Keep (already modern, but update to latest)
- **zustand 5.0.12** → Keep (already excellent and modern)

#### New Modern Alternatives to Consider
- **Form Handling**: **react-hook-form + zod** → **react-hook-form + valibot** (faster, smaller)
- **HTTP Client**: **axios** → **ky** (modern fetch wrapper, better TypeScript, smaller bundle)
- **State Management**: Keep **Zustand** (perfect choice, modern and lightweight)
- **Styling**: **StyleSheet** → **Tailwind CSS 4 + CVA** (class-variance-authority for component variants)
- **Icons**: Add **lucide-react** (modern, tree-shakable icon library)

### Recommended Modern Stack Updates
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.0.0",
    "zustand": "^5.0.12",
    "@tanstack/react-query": "^5.56.2", 
    "ky": "^1.7.2",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "valibot": "^0.42.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.445.0"
  }
}
```

## 🎯 Target Architecture

### New Technology Stack
- **Build Tool**: Vite 8 (latest stable)
- **Framework**: React 19 (latest stable or RC)
- **Styling**: Tailwind CSS 4 (latest alpha/beta)
- **PWA**: vite-plugin-pwa with Workbox
- **Routing**: React Router v7
- **UI Components**: Custom components + optional Headless UI
- **State Management**: Preserve Zustand + TanStack Query
- **Forms**: Preserve react-hook-form + @hookform/resolvers
- **HTTP**: Preserve axios setup
- **Storage**: Migrate to localStorage + Web Storage APIs

### Architecture Goals
- Maintain identical user experience and functionality
- Achieve superior web performance
- Enable PWA capabilities (offline, installable)
- Implement responsive design for all screen sizes
- Preserve all existing business logic
- Ensure seamless backend integration

## 📋 Migration Implementation Guide

### Phase 1: Project Foundation

**Objective**: Create new Vite project with all required dependencies

**Dependencies Setup (Modernized)**:
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0", 
    "react-router": "^7.0.0",
    "zustand": "^5.0.12",
    "@tanstack/react-query": "^5.56.2",
    "ky": "^1.7.2",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8",
    "valibot": "^0.42.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.445.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "tailwindcss": "^4.0.0-alpha",
    "@tailwindcss/vite": "^4.0.0-alpha",
    "vite-plugin-pwa": "^0.21.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

**Vite Configuration Requirements**:
```typescript
// vite.config.ts template
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // PWA configuration
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Amauta - Simulacro de Admisión',
        short_name: 'Amauta',
        description: 'Plataforma de simulacros de examen de admisión',
        theme_color: '#6200EE',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait'
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  define: {
    '__DEV__': JSON.stringify(process.env.NODE_ENV === 'development')
  }
})
```

**Project Structure**:
```
src/
├── components/        # Migrated UI components
├── pages/            # Route components (migrated from app/)
├── hooks/            # Custom React hooks
├── store/            # Zustand stores (direct copy)
├── services/         # API services (adapted for web)
├── types/            # TypeScript definitions (direct copy)
├── styles/           # Tailwind CSS and globals
├── utils/            # Utility functions
└── App.tsx           # Root component
```

### Phase 2: Core Services Migration

**API Service Modernization**:
- **Replace axios with ky**: Better TypeScript support, smaller bundle, modern fetch-based
- Replace `expo-secure-store` with `localStorage` for tokens
- Preserve all interceptor logic and error handling patterns
- Maintain exact same API interface but with modern implementation

**Example Migration (axios → ky)**:
```typescript
// OLD: axios implementation
import axios from 'axios';
const api = axios.create({ baseURL: API_URL });

// NEW: ky implementation  
import ky from 'ky';
const api = ky.create({ 
  prefixUrl: API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    beforeError: [
      async (error) => {
        // Handle 401, refresh tokens, etc. (preserve existing logic)
        return error;
      }
    ]
  }
});
```

**Storage Service Migration**:
```typescript
// New storage.ts for web
export const storage = {
  async getItemAsync(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  },
  async setItemAsync(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  },
  async deleteItemAsync(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
};
```

**State Management**:
- Copy all Zustand stores without modification
- Adapt persistence to use localStorage
- Preserve all store APIs and business logic
- Copy all TypeScript types and interfaces

### Phase 3: Theme System Migration

**Tailwind Configuration**:
```javascript
// tailwind.config.js template
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          container: 'var(--color-primary-container)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        // Map all existing theme colors to CSS variables
      },
      spacing: {
        // Preserve existing spacing system
      }
    }
  }
}
```

**Theme Context Migration**:
- Adapt ThemeContext from React Native to web
- Replace `useColorScheme` with `window.matchMedia('(prefers-color-scheme: dark)')`
- Replace `AsyncStorage` with `localStorage`
- Maintain exact same theme API and behavior
- Use CSS custom properties for dynamic theming

### Phase 4: Component System Migration

**UI Components Strategy**:
- Migrate each component from `PaperCompat.tsx`
- Convert StyleSheet styles to Tailwind CSS classes
- Maintain identical APIs and props
- Ensure responsive design for all components

**Component Migration Examples**:
```typescript
// Button component migration
export function Button({ 
  mode = 'contained', 
  onPress: onClick,
  loading,
  disabled,
  children,
  className,
  ...props 
}) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50";
  
  const variants = {
    contained: "bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300",
    outlined: "border border-primary text-primary bg-transparent hover:bg-primary/5",
    text: "text-primary bg-transparent hover:bg-primary/5"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[mode]} ${className}`}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
```

**Responsive Design Requirements**:
- Mobile-first approach with Tailwind breakpoints
- Maintain mobile UX on small screens
- Enhance for tablet and desktop experiences
- Preserve all touch interactions and accessibility

### Phase 5: Routing Migration

**React Router Setup**:
```typescript
// router.tsx structure
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="/auth/login" />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="app" element={<ProtectedLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="exam">
          <Route path="config" element={<ExamConfigPage />} />
          <Route path="take" element={<ExamTakePage />} />
          <Route path="results" element={<ExamResultsPage />} />
          <Route path="history" element={<ExamHistoryPage />} />
        </Route>
      </Route>
    </Route>
  )
);
```

**Page Migration**:
- Convert each file from `src/app/` directory structure
- Preserve all component logic and state management
- Adapt navigation from `expo-router` to `react-router-dom`
- Implement route protection and authentication guards

### Phase 6: PWA Implementation

**Service Worker Configuration**:
```typescript
// PWA manifest and service worker setup
const pwaConfig = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Amauta - Simulacro de Admisión',
    short_name: 'Amauta',
    description: 'Plataforma de simulacros de examen de admisión universitaria',
    theme_color: '#6200EE',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait-primary',
    start_url: '/',
    scope: '/',
    icons: [
      // Icon definitions for all sizes
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/backapi\.simulacroadmision\.com\/api\/v1\//,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10
        }
      }
    ]
  }
};
```

**Offline Strategy**:
- Cache critical API responses
- Implement offline indicators
- Handle network status changes
- Provide offline fallback pages

### Phase 7: Performance Optimization

**Code Splitting**:
- Implement route-based code splitting with React.lazy
- Optimize bundle size with tree shaking
- Lazy load heavy components and features

**Asset Optimization**:
- Optimize images and icons for web
- Implement proper caching strategies
- Minimize bundle sizes
- Configure compression and minification

## ✅ Quality Assurance Requirements

### Functional Testing Checklist
- [ ] Authentication flow (login, register, token refresh)
- [ ] Theme switching (light/dark/system) with persistence
- [ ] All exam features (config, take, results, history)
- [ ] Profile management and onboarding
- [ ] Form validation and error handling
- [ ] API integration and error responses
- [ ] Responsive design on all screen sizes
- [ ] PWA installation and offline functionality

### Performance Targets
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size optimization
- [ ] Lighthouse PWA score > 90
- [ ] Accessibility score > 95

### Browser Compatibility
- [ ] Chrome/Chromium-based browsers
- [ ] Firefox
- [ ] Safari (iOS and macOS)
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Environment Configuration

### Environment Variables
```env
VITE_API_URL=https://backapi.simulacroadmision.com/api/v1
VITE_APP_NAME=Amauta
VITE_APP_VERSION=2.0.0
```

### Build Configuration
- Production build optimizations
- Source map configuration
- Asset optimization
- PWA asset generation

## 📈 Success Metrics

### Technical Success Criteria
1. **Feature Parity**: 100% of current functionality preserved
2. **Performance**: Improved loading times and responsiveness
3. **PWA Score**: Lighthouse PWA audit score > 90
4. **Bundle Size**: Optimized bundle smaller than current web build
5. **Accessibility**: WCAG 2.1 AA compliance

### User Experience Criteria
1. **Seamless Migration**: Users experience no functional differences
2. **Enhanced UX**: Improved performance and responsiveness
3. **PWA Benefits**: Installable app with offline capabilities
4. **Cross-Platform**: Consistent experience across devices

## 🎯 Deliverables

### Code Deliverables
1. Complete migrated codebase in new tech stack
2. All tests passing and functionality verified
3. PWA fully configured and working
4. Production-ready build configuration
5. Documentation for deployment and maintenance

### Documentation
1. Migration completion report
2. New architecture documentation
3. Deployment guide
4. Performance optimization guide
5. Maintenance and update procedures

---

**Note**: This PRD serves as a comprehensive guide for migrating the existing Expo React Native application to a modern web stack while preserving all functionality and enhancing performance and capabilities.
