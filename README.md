# 🎬 CampusTV

## 📌 Descripción del proyecto

CampusTV es una aplicación **full-stack** que permite a los usuarios registrar, calificar y rankear películas y series, también permite gestionar usuarios, reseñas, categorías y rankings, diferenciando permisos de usuario y administrador.
El sistema está dividido en un **backend con Node.js + Express** y un **frontend**.

Incluye autenticación segura, validaciones robustas, manejo de roles (usuario y administrador) y un ranking ponderado de contenido en función de reseñas, calificaciones y popularidad.

---

## 👨‍💻 Créditos

Proyecto desarrollado por:

* **Nicole Ordoñez**
* **Daniel Cubides**

---

## 🔗 Repositorio del frontend

👉 [CampusTV Frontend](https://github.com/DanielFelipeFlorezCubides/campustv-frontend.git)

---

## 📄 Video y PDF 

Video de exposición y PDF de documentación:  
[📥 Ver](https://drive.google.com/drive/folders/1Pj0Pc3qK8IUr17zyrON7-2kXeXKknLQe?usp=sharing)

---
## 🛠️ Tecnologías usadas

* **Backend**: Node.js, Express
* **Base de datos**: MongoDB (driver oficial)
* **Autenticación**: JWT con passport-jwt, jsonwebtoken y bcrypt
* **Validaciones**: express-validator
* **Seguridad**: dotenv, express-rate-limit
* **Documentación**: swagger-ui-express
* **Frontend**: HTML + CSS + JS + NEXT + REACT + TypeScript (repositorio independiente)

---

## ⚙️ Pasos para instalar y ejecutar

### 1. Clonar el repositorio

```bash
git clone https://github.com/nicoleordonezc/CampusTV.git
cd campustv-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
PORT=5500
MONGO_URI=mongodb://localhost:27017/
DB_NAME=campustv
JWT_SECRET= 3Xjn92L!pQ@w8^kVzRt$6Df&Gh*ZyTqf8D7!vR4$kP2nB%yQw9Z*Jx6C+eTg5sAQx!72DfG%8@w^KjrT6ZpLm$9Vv&yBnE
JWT_EXPIRES_IN= "24h"
API_VERSION=1.0.0
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

El servidor se levantará en:
👉 `http://localhost:5500/api`

---

## 📡 Ejemplos de endpoints y cómo consumirlos

### 📝 Registro de Usuario

* **URL:** `/auth/register`
* **Método:** `POST`
* **Descripción:** Crea un nuevo usuario con los datos proporcionados, siempre que el correo no esté registrado previamente.
* **Middleware:**

  * `usersDTO`: Valida la estructura del body (name, email, password).
  * `validatorFieldsDTO`: Verifica los errores de validación.

```json
{
  "name": "Ana",
  "email": "ana@example.com",
  "password": "123456"
}
```

### Inicio de sesión

* **URL:** `/auth/login`
* **Método:** `POST`
* **Descripción:** Verifica las credenciales del usuario y genera un token JWT si son correctas.

```json
{
  "email": "ana@example.com",
  "password": "123456"
}
```

Respuesta exitosa:

```json
{
  "token": "JWT_TOKEN_GENERADO"
}
```

### Crear película (solo admin)

* **Ruta:** `/admin/postcontent`
* **Método:** `POST`
* **Descripción:** Permite a un admin autenticado crear una nuevo contenido.

#### 🛡️ Middlewares utilizados

* `adminValidator`: Autentica al admin (por ejemplo, mediante JWT).
* `contentDTO`: Valida los campos del body.
* `validatorFieldsDTO`: Gestiona errores de validación.

```json
{
  "title": "Friends",
  "description": "Seis amigos viven divertidas situaciones en Nueva York.",
  "year": 1994,
  "category": "Comedia",
  "approved": true,
  "type": "serie"
}
```

### Crear reseña

* **Ruta:** `/campustv/postreview`
* **Método:** `POST`
* **Descripción:** Permite a un usuario autenticado crear una nueva reseña para un contenido específico.

#### 🛡️ Middlewares utilizados

* `userValidator`: Autentica al usuario (por ejemplo, mediante JWT).
* `reviewDTO`: Valida los campos del body.
* `validatorFieldsDTO`: Gestiona errores de validación.

```json
{
  "contentName": "Breaking Bad",
  "title": "Obra maestra",
  "review": "El desarrollo de personajes es insuperable.",
  "score": 10
}
```

---

## 📂 Estructura del proyecto

```
campustv-backend/
│── /config        # Configuración de variables y conexión DB
│── /controllers   # Controladores de la lógica de negocio
│── /middlewares   # Middlewares (auth, validaciones, rate-limit)
│── /dto           # Patrón de diseño para los datos
│── /models        # Modelos de datos (clases y esquemas)
│── /routes        # Rutas del API
│── /services      # Servicios auxiliares 
│── /utils         # Utilidades y helpers
│── app.js         # Configuración principal de Express
```

---

## 📏 Principios aplicados

* **Arquitectura modular y escalable** (separación clara en capas).
* **Validaciones robustas** con `express-validator`.
* **Seguridad**: JWT, bcrypt, rate-limit y variables de entorno.
* **Principio KISS y DRY** para mantener el código claro y reutilizable.
* **Versionamiento semántico (semver)** en la API.
* **Documentación integrada** con Swagger.
* **Transacciones en MongoDB** para operaciones críticas.

---

## ⚡ Consideraciones técnicas

* El sistema diferencia permisos entre **usuario y administrador**.
* Los administradores pueden **gestionar categorías y aprobar películas**.
* El ranking ponderado considera **calificaciones, likes/dislikes y fecha de reseña**.
* El frontend y backend están en **repositorios separados** para mayor independencia.
