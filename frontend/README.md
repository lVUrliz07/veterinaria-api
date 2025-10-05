# 🐾 Sistema Veterinario Web

Aplicación web desarrollada con React + Vite + Material UI, que permite la gestión integral de personas, mascotas, veterinarios y consultas.
Incluye autenticación con rutas protegidas, integración de API REST, y una interfaz moderna con tema verde-turquesa.

## 🚀 Tecnologías principales

| Tecnología | Descripción |
|------------|-------------|
| ⚛️ React 18 | Librería principal para la interfaz. |
| ⚡ Vite | Entorno de desarrollo rápido con HMR. |
| 🎨 Material UI (MUI) | Componentes modernos y responsivos. |
| 🔐 JWT + Context API | Autenticación y manejo de sesión. |
| 🌈 Axios | Cliente HTTP para conexión con el backend. |
| 🧩 React Router v6 | Navegación entre vistas y rutas protegidas. |
| 🪄 ESLint + Prettier | Estilo de código limpio y consistente. |

## 🧰 Estructura del proyecto

```
veterinaria-frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   ├── personas/
│   │   │   └── Personas.jsx
│   │   ├── mascotas/
│   │   │   └── Mascotas.jsx
│   │   ├── veterinarios/
│   │   │   └── Veterinarios.jsx
│   │   ├── consultas/
│   │   │   └── Consultas.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Dashboard.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── apiClient.js
│   ├── App.jsx
│   ├── index.jsx
│   └── App.css
├── .gitignore
├── eslint.config.js
├── package.json
└── vite.config.js
```

## ⚙️ Instalación y ejecución

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/tuusuario/veterinaria-frontend.git
cd veterinaria-frontend
```

### 2️⃣ Instala dependencias
```bash
npm install
```

### 3️⃣ Ejecuta en modo desarrollo
```bash
npm run dev
```

### 4️⃣ Compila para producción
```bash
npm run build
```

## 🔑 Variables de entorno (si aplican)

Crea un archivo `.env` en la raíz con las siguientes variables:

```
VITE_API_URL=http://localhost:3000
