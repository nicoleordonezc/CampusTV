//USUARIOS

db.createCollection("usuarios", {
    validator: {
        $jsonSchema:{
            bsonType:"object",
            required:[
                "_id",
                "name",
                "email",
                "password"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador único"
                },
                name: {
                    bsonType: "string",
                    maxLength: 20,
                    description: "Nombre del usuario"
                },
                email: {
                    bsonType: "string",
                    pattern: "\\w+@\\w+\\.\\w+$",
                    description: "El correo debe tener @ y finalizar en .co, .com .es etc"
                },
                password:{
                    bsonType: "string",
                    description: "La contraseña esta encriptada con bcrypt"
                },
                rol:{
                    bsonType: "string",
                    enum: ["usuario", "administrador"],
                    description: "Define el rol del "
                }
            }
        }
    }}
);

//CATEGORÍAS

db.createCollection("categorias", {
    validator: {
        $jsonSchema:{
            bsonType:"object",
            required:[
                "_id",
                "name",
                "description"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador único"
                },
                name: {
                    bsonType: "string",
                    maxLength: 50,
                    description: "Nombre de la categoría"
                },
                description: {
                    bsonType: "string",
                    maxLength: 200,
                    description: "El correo debe tener @ y finalizar en .co, .com .es etc"
                }
            }
        }
    }}
);

//CONTENIDOS


db.createCollection("contenidos", {
    validator: {
        $jsonSchema:{
            bsonType:"object",
            required:[
                "_id",
                "title",
                "description",
                "year",
                "category",
                "approved",
                "type"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador único"
                },
                title: {
                    bsonType: "string",
                    maxLength: 20,
                    description: "Nombre de la categoría"
                },
                description: {
                    bsonType: "string",
                    maxLength: 500,
                    description: "El correo debe tener @ y finalizar en .co, .com .es etc"
                },
                year: {
                    bsonType: "int",
                    description: "Año de lanzamiento"
                },
                category: {
                    bsonType: "string",
                    maxLength: 50,
                    description: "Nombre de la categoría"
                },
                approved: {
                    bsonType: "bool",
                    description: "Indica si esta aprobado o no"
                },
                type:{
                    bsonType: "string",
                    enum: ["pelicula", "serie"],
                    description: "Define si es película o serie"
                }
            }
        }
    }}
);

//RESEÑAS


db.createCollection("reseñas", {
    validator: {
        $jsonSchema:{
            bsonType:"object",
            required:[
                "_id",
                "userName",
                "contentName",
                "title",
                "review",
                "score",
                "date"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador único"
                },
                title: {
                    bsonType: "string",
                    maxLength: 20,
                    description: "Nombre de la categoría"
                },
                review: {
                    bsonType: "string",
                    maxLength: 200,
                    description: "El correo debe tener @ y finalizar en .co, .com .es etc"
                },
                score:{
                    bsonType: "int",
                    minimum: 1,
                    maximum: 10,
                    description: "Año de lanzamiento"
                },
                likes:{
                    bsonType:"array",
                    items: {
                        bsonType: "objectId",
                        description: "Lista de usuarios que dieron like"}
                },
                dislikes:{
                    bsonType: "array",
                    items: {
                        bsonType: "objectId",
                        description: "Lista de usuarios que dieron dislike"}
                },
                date: {
                    bsonType: "date",
                    description: "Fecha de publicación"
                }
            }
        }
    }}
);
