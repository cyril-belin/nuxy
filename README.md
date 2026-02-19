<div align="center">
  <img src="public/img/dashboard.png" alt="Nuxy Dashboard" width="600" style="border-radius: 10px; margin-bottom: 20px;" />
  
  <br />
  
  # 🚀 Nuxy
  
  **A Modern, Modular SaaS Boilerplate built with Nuxt 3**
  
  [![Nuxt](https://img.shields.io/badge/Nuxt-3.15-00C58E?logo=nuxt.js&logoColor=white)](#)
  [![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](#)
</div>

---

Nuxy is a highly opinionated, cleanly structured SaaS boilerplate designed to get your next project off the ground in minutes. It leverages **Nuxt 3 Layers** to decouple core responsibilities like Authentication, Billing, Dashboard, and Administration.

## ✨ Features

- **🧩 Modular Architecture**: Uses Nuxt Layers (`layers/base`, `layers/auth`, `layers/dashboard`...) for ultimate scalability.
- **🎨 Beautiful UI**: Powered by [Nuxt UI](https://ui.nuxt.com/) and Tailwind CSS.
- **🔐 Secure Authentication**: Integrated out-of-the-box with `nuxt-auth-utils` and GitHub OAuth.
- **🛡 Type-Safe Data**: Robust payload validation utilizing **Zod**.
- **📁 Repository Pattern**: Clean data abstraction layers via composables (`useApi()`).

---

## 🛠 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue.js)
- **Styling**: [Nuxt UI](https://ui.nuxt.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

You will need **Node.js** (v18+) and your preferred package manager (npm, pnpm, yarn, bun). 

### 1. Clone the repository

```bash
git clone https://github.com/cyril-belin/nuxy.git
cd nuxy
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Variables

Create a `.env` file at the root of the project. You will need a secret key for session management and GitHub credentials for OAuth.

```env
# Session Secret
NUXT_SESSION_PASSWORD=replace-this-with-a-32-character-random-string

# GitHub OAuth App Credentials
NUXT_OAUTH_GITHUB_CLIENT_ID=your_github_client_id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🏗 Architecture (Nuxt Layers)

Nuxy keeps things clean by separating domains using [Nuxt Extends (Layers)](https://nuxt.com/docs/guide/going-further/layers).

```tree
nuxy/
├── layers/
│   ├── admin/       # Admin & super-user panel
│   ├── auth/        # Login, Signup, OAuth & session handling
│   ├── base/        # Core setup, shared UI components, layouts
│   ├── billing/     # Stripe integrations & subscription plans
│   └── dashboard/   # The main User SaaS application
├── app.vue          # Entry point
└── nuxt.config.ts   # Main Nuxt config orchestrating layers
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<br />
<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/cyril-belin">Cyril Belin</a></sub>
</div>
