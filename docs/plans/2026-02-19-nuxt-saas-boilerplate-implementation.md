# Nuxt SaaS Boilerplate (Modular Monolith) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Créer un boilerplate SaaS robuste et modulaire en Nuxt 3 utilisant les Layers et le Repository Pattern.

**Architecture:** Architecture en "Monolithe Modulaire" via Nuxt Layers (`base`, `auth`, `admin`, `billing`). Chaque couche est isolée et contient sa propre logique (UI, Auth, Business).

**Tech Stack:** Nuxt 3, Nuxt UI v3, Nuxt Auth Utils, Tailwind CSS, TypeScript, Zod, Pinia.

---

### Task 1: Initialisation du projet Nuxt 3 et Structure Layers
**Files:**
- Create: `package.json`
- Create: `nuxt.config.ts`
- Create: `app.config.ts`
- Create: `.env.example`
- Create: `layers/base/nuxt.config.ts`
- Create: `layers/auth/nuxt.config.ts`
- Create: `layers/admin/nuxt.config.ts`
- Create: `layers/billing/nuxt.config.ts`

**Step 1: Créer le fichier package.json de base**
```json
{
  "name": "nuxy",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "nuxt": "^3.15.0",
    "vue": "latest",
    "vue-router": "latest",
    "@nuxt/ui": "^2.19.0",
    "nuxt-auth-utils": "^0.5.14"
  }
}
```

**Step 2: Créer les configs vides pour chaque layer**
```typescript
// layers/base/nuxt.config.ts (et pour auth, admin, billing similaire)
export default defineNuxtConfig({
  // Base configuration specific to this layer
})
```

**Step 3: Configurer nuxt.config.ts racine pour étendre les layers**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/base',
    './layers/auth',
    './layers/admin',
    './layers/billing'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
```

**Step 4: Commit**
```bash
git add .
git commit -m "chore: init modular nuxt project structure"
```

---

### Task 2: Layer [Base] - UI configuration
**Files:**
- Modify: `layers/base/nuxt.config.ts`
- Create: `layers/base/app.config.ts`

**Step 1: Ajouter Nuxt UI au layer base**
```typescript
// layers/base/nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```

**Step 2: Configurer le thémage dans app.config.ts**
```typescript
// layers/base/app.config.ts
export default defineAppConfig({
  ui: {
    primary: 'indigo',
    gray: 'slate'
  }
})
```

**Step 3: Commit**
```bash
git add layers/base/
git commit -m "feat(base): configure nuxt ui and theme"
```

---

### Task 3: Layer [Auth] - Authentification OAuth
**Files:**
- Modify: `layers/auth/nuxt.config.ts`
- Create: `layers/auth/server/api/auth/github.get.ts`
- Create: `.env`

**Step 1: Installer nuxt-auth-utils dans le layer auth**
```typescript
// layers/auth/nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-auth-utils']
})
```

**Step 2: Créer le handler server pour GitHub OAuth**
```typescript
// layers/auth/server/api/auth/github.get.ts
export default oauthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, '/dashboard')
  }
})
```

**Step 3: Ajouter les variables d'environnement (GitHub)**
Dans `.env` (et `.env.example`), ajouter `NUXT_OAUTH_GITHUB_CLIENT_ID`, `NUXT_OAUTH_GITHUB_CLIENT_SECRET`, `NUXT_SESSION_PASSWORD`.

**Step 4: Commit**
```bash
git add layers/auth/ .env.example
git commit -m "feat(auth): github oauth setup"
```

---

### Task 4: Repository Pattern Implementation
**Files:**
- Create: `layers/base/composables/useHttp.ts`
- Create: `layers/auth/composables/useAuthRepository.ts`

**Step 1: Implémenter useHttp wrapper**
```typescript
// layers/base/composables/useHttp.ts
import type { UseFetchOptions } from 'nuxt/app'

export const useHttp = <T>(url: string, options: UseFetchOptions<T> = {}) => {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$fetch
  })
}
```

**Step 2: Implémenter Auth Repository**
```typescript
// layers/auth/composables/useAuthRepository.ts
export const useAuthRepository = () => {
    const { loggedIn, user, session, clear } = useUserSession()
    
    return {
        loggedIn,
        user,
        session,
        logout: clear,
        fetchSession: useRequestFetch() // Example usage
    }
}
```


**Step 3: Commit**
```bash
git add layers/base/composables/ layers/auth/composables/
git commit -m "feat: implement repository pattern base"
```
