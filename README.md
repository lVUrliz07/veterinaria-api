# Task Manager API 🚀

API RESTful para la gestión de tareas, construida con NestJS, TypeScript, PostgreSQL y completamente dockerizada.

## Características

*   **CRUD completo** para tareas (Crear, Leer, Actualizar, Eliminar).
*   **Entorno 100% Dockerizado** para una fácil puesta en marcha.
*   **Documentación de API** interactiva con Swagger.
*   **Configuración optimizada** para producción.

---

## Requisitos Previos

*   [Docker](https://www.docker.com/products/docker-desktop/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

---

## Puesta en Marcha (Instrucciones de Lanzamiento)

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/TuUsuario/task-manager-api.git
    cd task-manager-api
    ```

2.  **Crear el archivo de variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto y copia el contenido de `.env.example` (si lo tuvieras) o añade las siguientes variables:
    ```env
    DB_HOST=db
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=mysecretpassword
    DB_DATABASE=postgres
    ```

3.  **Construir y levantar los contenedores:**
    Este comando construirá la imagen de la API y levantará tanto la API como la base de datos.
    ```bash
    docker-compose up --build
    ```

---

## Verificación

Una vez que los contenedores estén corriendo, puedes verificar que todo funciona:

*   **API:** La API estará disponible en `http://localhost:3000`.
*   **Documentación Swagger:** La documentación interactiva estará en `http://localhost:3000/api-docs`.

Puedes usar la colección de Postman (si la exportas) o Swagger para probar los endpoints.

---

## Endpoints Principales

*   `POST /tasks`: Crear una nueva tarea.
*   `GET /tasks`: Obtener todas las tareas.
*   `GET /tasks/:id`: Obtener una tarea por su ID.
*   `PATCH /tasks/:id`: Actualizar una tarea.
*   `DELETE /tasks/:id`: Eliminar una tarea.