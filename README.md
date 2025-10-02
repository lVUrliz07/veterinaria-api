# API de Sistema de Veterinaria 🚀🐾

API RESTful completa para la gestión de una veterinaria, construida con NestJS, TypeScript, PostgreSQL y completamente dockerizada. Este proyecto incluye gestión de dueños (personas), mascotas, veterinarios, consultas y un sistema de autenticación seguro basado en JWT.

## ✨ Características Principales

*   **Arquitectura Modular:** Separación clara de responsabilidades (`Personas`, `Mascotas`, `Veterinarios`, `Consultas`, `Auth`).
*   **Relaciones de Datos Complejas:** Manejo de relaciones `One-to-Many` entre las entidades.
*   **Seguridad con JWT:** Sistema de registro y login que genera tokens de acceso para proteger los endpoints.
*   **Entorno 100% Dockerizado:** Configuración "lista para producción" con `Dockerfile` multi-etapa para una fácil puesta en marcha y eficiencia.
*   **Validación de Datos:** Uso de DTOs y `class-validator` para asegurar la integridad de los datos de entrada.
*   **Documentación de API Interactiva:** Generada automáticamente con Swagger.

---

## 🛠️ Requisitos Previos

Para levantar este proyecto, solo necesitas tener instalados:

*   [Docker](https://www.docker.com/products/docker-desktop/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Puesta en Marcha (Instrucciones de Lanzamiento)

Seguir estos pasos te permitirá tener el backend funcionando en menos de 5 minutos.

### 1. Clonar el Repositorio

Abre tu terminal y ejecuta (no olvides reemplazar la URL):
```bash
git clone https://github.com/TuUsuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Crear el Archivo de Variables de Entorno

Este proyecto utiliza un archivo `.env` para gestionar las credenciales.
Crea una copia del archivo de ejemplo:

```bash
# En Mac/Linux
cp .env.example .env

# En Windows (Command Prompt o PowerShell)
copy .env.example .env
```
¡No necesitas modificar el archivo `.env`! Los valores por defecto están configurados para funcionar con Docker.

### 3. Construir y Levantar los Contenedores

Este comando construirá la imagen de la API y levantará todos los servicios.
```bash
docker-compose up --build
```
**¡Espera a que la terminal muestre el mensaje `[NestApplication] Nest application successfully started`!** En el primer arranque, la base de datos puede tardar unos segundos en inicializarse. Es normal ver algunos reintentos de conexión.

---

## ✅ Verificación y Uso

Una vez que los contenedores estén corriendo, el sistema está listo.

*   **URL Base de la API:** `http://localhost:3000`
*   **Documentación Swagger:** `http://localhost:3000/api-docs`

---

## 🔐 Guía Esencial para el Desarrollador Frontend

**¡MUY IMPORTANTE!** Todos los endpoints de datos (excepto `register` y `login`) están protegidos y requieren autenticación.

### Flujo de Autenticación Obligatorio:

1.  **Registrar un Usuario (Dueño/Persona):**
    *   **Endpoint:** `POST /auth/register`
    *   **Body (Ejemplo):**
        ```json
        {
            "dni": "12345678A",
            "nombre": "Juan",
            "apellido": "Pérez",
            "password": "passwordSegura123"
        }
        ```

2.  **Iniciar Sesión para Obtener un Token:**
    *   **Endpoint:** `POST /auth/login`
    *   **Body (Ejemplo):**
        ```json
        {
            "dni": "12345678A",
            "pass": "passwordSegura123"
        }
        ```
    *   **Respuesta Exitosa:** Recibirás tu `accessToken`.
        ```json
        {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

3.  **Realizar Peticiones Protegidas:**
    *   Para llamar a cualquier otro endpoint (`/personas`, `/mascotas`, etc.), debes incluir el token en la cabecera de autorización.
    *   **Header:** `Authorization`
    *   **Valor:** `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (La palabra `Bearer`, un espacio, y luego el token).

### Endpoints Principales Disponibles

#### Autenticación (Públicos)
*   `POST /auth/register`
*   `POST /auth/login`

#### Personas (Protegidos)
*   `GET /personas`
*   `POST /personas`
*   ... (CRUD completo disponible)

#### Mascotas (Protegidos)
*   `GET /mascotas`
*   `POST /mascotas`
*   ... (CRUD completo disponible)

#### Veterinarios (Protegidos)
*   `GET /veterinarios`
*   `POST /veterinarios`
*   ... (CRUD completo disponible)

#### Consultas (Protegidos)
*   `GET /consultas`
*   `POST /consultas`

Para una referencia completa y probar los endpoints, usa la documentación de Swagger. **Recuerda hacer clic en el botón "Authorize" en la parte superior derecha de Swagger y pegar tu Bearer Token** para poder probar los endpoints protegidos.

---

## 🎨 ¡Misión para el Equipo Frontend!

¡Soldado del Frontend! El backend de operaciones está desplegado y fortificado. Tu misión, si decides aceptarla, es construir la **Interfaz de Mando Gráfica (UI)** para este sistema.

### Stack Tecnológico Recomendado

*   **Framework:** **React** o **Vue 3**.
*   **Herramienta de Construcción:** **Vite** (para una velocidad de desarrollo supersónica).
*   **Librería de Componentes:** **Material-UI (MUI)**, **Tailwind CSS** o **Bootstrap**.
*   **Cliente HTTP:** **Axios**.

### Guía de Inicio Rápido (Ejemplo con React + Vite)

1.  **Crea tu Proyecto Frontend (en una carpeta separada):**
    ```bash
    npm create vite@latest mi-veterinaria-frontend -- --template react
    cd mi-veterinaria-frontend
    ```

2.  **Instala tu Cliente HTTP:**
    ```bash
    npm install axios
    ```

3.  **Configura la Comunicación con la API:**
    Crea un archivo como `src/api/axios.js` para centralizar la configuración.

    **Ejemplo de configuración de Axios:**
    ```javascript
    import axios from 'axios';

    const apiClient = axios.create({
      baseURL: 'http://localhost:3000', // ¡La URL de nuestra API!
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // ¡IMPORTANTE! Interceptor para añadir el Token a cada petición
    apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken'); // O donde sea que guardes el token
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    export default apiClient;
    ```

4.  **Flujo de Trabajo Sugerido:**
    *   **Crea las Vistas de Autenticación:** Empieza por las pantallas de `Registro` y `Login`.
    *   **Gestiona el Token:** Al hacer login exitoso, guarda el `accessToken` en `localStorage` o en un gestor de estado.
    *   **Crea las Vistas CRUD:** Construye los componentes para `Listar Personas`, `Crear Mascota`, etc., usando tu `apiClient`.
    *   **Rutas Protegidas:** Implementa rutas privadas que solo sean accesibles si el usuario tiene un token válido.

### Recordatorio Clave

*   **CORS ya está habilitado** en el backend. No tendrás problemas de comunicación.
*   **Usa la documentación de Swagger (`http://localhost:3000/api-docs`)** como tu mejor amigo.

**¡El backend está listo y esperando tus órdenes! ¡Buena suerte, soldado!**