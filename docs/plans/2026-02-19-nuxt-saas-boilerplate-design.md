# Design Document : Nuxt SaaS Boilerplate (Modular Monolith)

**Date :** 2026-02-19
**Statut :** Validé
**Expert Reference :** agent.md (Nuxt/Vue Senior Architect)

## 1. Vision & Objectifs
Créer un boilerplate SaaS robuste, scalable et moderne utilisant l'écosystème Nuxt 3. L'accent est mis sur la séparation des préoccupations via les layers et une gestion de données type-safe via le Repository Pattern.

## 2. Architecture Technique
Le projet adopte une structure de "Monolithe Modulaire" basée sur les **Nuxt Layers**.

### 2.1 Structure des Layers
- **`layers/base`** : Configuration globale, thémage Nuxt UI, Tailwind, et Google Fonts.
- **`layers/auth`** : Logique d'authentification OAuth (GitHub/Google) via `nuxt-auth-utils`. Middlewares de protection des routes.
- **`layers/admin`** : Layout de dashboard, Sidebar, barre de navigation, et Command Palette (recherche fuzzy).
- **`layers/billing`** : Intégration Stripe (Webhooks, portail client) dans un module isolé.

### 2.2 Gestion des Données (Repository Pattern)
Pour garantir un code DRY et SSR-friendly :
- **useHttp** : Composable de base encapsulant `$fetch`.
- **Repositories** : Modules par domaine (ex: `useAuthRepository.ts`) centralisant les appels API.
- **Validation** : Utilisation de **Zod** pour valider les entrées côté client et serveur.

## 3. Sécurité & Authentification
- **Authentification :** 100% OAuth (GitHub, Google) pour simplifier la gestion des identités.
- **Session :** Cookies scellés et chiffrés via `nuxt-auth-utils`. Pas de base de données de session requise.
- **Protection :**
    - Middlewares Vue pour le client.
    - Utilitaire `requireUserSession` de Nitro pour les routes API.

## 4. Stack de Référence
- **Framework :** Nuxt 3 (Nitro)
- **UI :** Nuxt UI v3
- **State :** Pinia + `useState`
- **Validation :** Zod
- **Auth :** Nuxt Auth Utils

## 5. Prochaines Étapes
1. Initialisation du projet Nuxt.
2. Mise en place de la structure de répertoires pour les layers.
3. Configuration de `nuxt-auth-utils` et de la couche UI de base.
