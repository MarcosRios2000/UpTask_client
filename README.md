# UpTask Client

**UpTask** is a web platform designed for managing projects and tasks collaboratively.  
This is the **Frontend Application**, built with **React + TypeScript**, connected to a **REST API backend** to handle users, projects, and tasks dynamically.

---

## 🚀 Technologies Used

- **React 18** (powered by Vite)
- **TypeScript**
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Zod** for data validation
- **React Router v6** for routing
- **TanStack React Query** for server state management
- **React Toastify** for notifications
- **DnD Kit** for drag-and-drop functionality
- **Chakra UI Pin Input** for code inputs
- **Headless UI** and **HeroIcons** for accessible components

---

## 📦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/MarcosRios2000/UpTask_client.git
```

2. Navigate into the project folder:

```bash
cd UpTask_client
```

3. Install all dependencies:

```bash
npm install
```

4. Create a `.env` file at the root and add the following:

```bash
VITE_API_URL=https://your-backend-api.com/api
```

(Replace `https://your-backend-api.com/api` with your deployed backend API URL.)

---

## 🛠 Available Scripts

| Script             | Description                                       |
|--------------------|---------------------------------------------------|
| `npm run dev`       | Starts the development server at `localhost:5173` |
| `npm run build`     | Builds the project for production                 |
| `npm run preview`   | Serves the production build locally               |
| `npm run lint`      | Lints the project with ESLint                     |

---

## 🌍 Deployment

This project is optimized for deployment on **Vercel** or any platform that supports Vite/React apps.

General steps:

1. Push your code to a repository (e.g., GitHub).
2. Create a new project on Vercel and link your repository.
3. Add the environment variable `VITE_API_URL`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy 🚀

---

## 🔐 Important Notes

- This frontend depends on a live **backend API** being deployed and accessible.
- Backend must expose endpoints like:
  - `/api/auth/*`
  - `/api/projects/*`
  - `/api/tasks/*`
- Ensure CORS policies and URLs are correctly set on both frontend and backend.

---

## 📂 Project Structure Overview

```bash
src/
├── api/              # API service functions (Axios)
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── locales/          # Translation files
├── pages/            # Route pages
├── types/            # Zod schemas and TypeScript types
├── utils/            # Utility/helper functions
├── App.tsx           # App entry point for routes
└── main.tsx          # Application bootstrap
```

---

## ✨ Main Features

- User registration and authentication.
- Account confirmation via email code.
- Password recovery via token.
- Project dashboard with role-based permissions.
- Kanban board to manage task statuses.
- Task notes and collaboration.
- Fully responsive UI (mobile & desktop).
- Professional loading and error states.

---

# 👨‍💻 About the Author

Created with 💜 by **Marcos Rios**.  
Portfolio: [https://marcosrios.xyz](https://marcosrios.xyz)
