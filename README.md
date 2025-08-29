
## 📌 Endpoints

### 📝 Registro de Usuario

* **URL:** `/auth/register`
* **Método:** `POST`
* **Descripción:** Crea un nuevo usuario con los datos proporcionados, siempre que el correo no esté registrado previamente.
* **Middleware:**

  * `usersDTO`: Valida la estructura del body (name, email, password).
  * `validatorFieldsDTO`: Verifica los errores de validación.

#### ✅ Cuerpo de la Solicitud (JSON)

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "securePassword123"
}
```

### 🔐 Login de Usuario

* **URL:** `/auth/login`
* **Método:** `POST`
* **Descripción:** Verifica las credenciales del usuario y genera un token JWT si son correctas.

#### ✅ Cuerpo de la Solicitud (JSON)

```json
{
  "email": "juan@example.com",
  "password": "securePassword123"
}
```

## 📌 Endpoints por Categoría

Cada uno de los siguientes endpoints retorna todos los contenidos almacenados con la categoría indicada.

### 🚀 Ciencia Ficción
- **Ruta:** `/campustv/getcienciaficcion`

### 😂 Comedia
- **Ruta:** `/campustv/getcomedia`

### 🎭 Drama
- **Ruta:** `/campustv/getdrama`

### 💥 Acción
- **Ruta:** `/campustv/getaccion`

### 👻 Terror
- **Ruta:** `/campustv/getterror`

### 🎥 Documental
- **Ruta:** `/campustv/getdocumental`

### 💖 Romance
- **Ruta:** `/campustv/getromance`

### 🎨 Animación
- **Ruta:** `/campustv/getanimacion`

### 🧙 Fantasía
- **Ruta:** `/campustv/getfantasia`

### 🧭 Aventura
- **Ruta:** `/campustv/getaventura`

## Formato de respuesta

Todas las rutas responden con un array de objetos en formato JSON:

```json
[
  {
    "title": "Breaking Bad",
    "description": "Un profesor de química se convierte en fabricante de metanfetaminas.",
    "year": 2008,
    "type": "serie"
	}
]
````
---

## 📌 Endpoints disponibles de contenido

### 📚 Obtener **todo** el contenido

* **Ruta:** `/campustv/getall`
* **Método:** `GET`
* **Descripción:** Devuelve todos los contenidos almacenados en la base de datos, sin filtros.

### 🎬 Obtener **todas las películas**

* **Ruta:** `/campustv/getallmovies`
* **Método:** `GET`
* **Descripción:** Devuelve todos los contenidos cuyo tipo es `"pelicula"`.

### 📺 Obtener **todas las series**

* **Ruta:** `/campustv/getallseries`
* **Método:** `GET`
* **Descripción:** Devuelve todos los contenidos cuyo tipo es `"serie"`.

## 🧱 Estructura de un documento de contenido

Cada entrada en la colección `contenidos` debería seguir esta estructura básica:

```json
{
    "title": "Interstellar",
    "description": "Un grupo de astronautas viaja a través de un agujero de gusano para salvar a la humanidad.",
    "year": 2014,
    "category": "Ciencia Ficción",
    "type": "pelicula"
	}
```

## 📌 Endpoints disponibles de usuario

### 🔍 Obtener perfil de usuario

* **Ruta:** `/campustv/userprofile/:id`
* **Método:** `GET`
* **Descripción:** Devuelve el nombre y correo electrónico del usuario cuyo nombre coincide con el parámetro `:id`.

#### 🔧 Parámetros

* `:id` → Nombre del usuario (`name` en la base de datos)

### 🛠️ Actualizar perfil de usuario

* **Ruta:** `/campustv/putuser/:email`
* **Método:** `PUT`
* **Descripción:** Permite actualizar el nombre o contraseña de un usuario a partir de su email.

#### 🔧 Parámetros

* `:email` → Correo electrónico del usuario

#### ✅ Cuerpo de la solicitud (JSON)

```json
{
  "name": "Nuevo Nombre",
  "password": "nuevaContraseña123"
}
```
---

## 🧱 Estructura esperada de un documento `usuarios`

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "$2b$12$abcHasheado",
  "rol": "usuario"
}
```
## 📌 Endpoints de Reseñas
### 🔍 Obtener reseñas por contenido

* **Ruta:** `/campustv/getreviews/:id`
* **Método:** `GET`
* **Descripción:** Devuelve todas las reseñas asociadas a un contenido específico.

#### 🔧 Parámetros

* `:id` → Nombre del contenido (`contentName`)

### ✍️ Crear una reseña

* **Ruta:** `/campustv/postreview`
* **Método:** `POST`
* **Descripción:** Permite a un usuario autenticado crear una nueva reseña para un contenido específico.

#### 🛡️ Middlewares utilizados

* `userValidator`: Autentica al usuario (por ejemplo, mediante JWT).
* `reviewDTO`: Valida los campos del body.
* `validatorFieldsDTO`: Gestiona errores de validación.

#### ✅ Cuerpo de la solicitud (JSON)

```json
{
  "title": "Una obra maestra",
  "review": "Excelente guión, actuación y dirección",
  "score": 5,
  "contentName": "Interstellar"
}
```

> El nombre del usuario (`userName`) se obtiene automáticamente desde el token mediante `req.user`.

