import {connect, getDB} from "./db.js"

async function seed() {
    let users = [
        {
          name: "Carlos Perez",
          email: "carlos.perez@example.com",
          password: "$2b$10$7Qq1jRjFsl/NbFdlZ7QyKu.kZqvUgV8E8J1uwMfGmXw4tT6kzV7bC", // bcrypt hash
          rol: "usuario"
        },
        {
          name: "Ana Lopez",
          email: "ana.lopez@example.com",
          password: "$2b$10$hOYZQXhA9U8WcERf0cy9QO9iTtZC/TG53KZvGJ8F3Tx.gp3o9T2ZK",
          rol: "usuario"
        },
        {
          name: "Miguel Ruiz",
          email: "miguel.ruiz@example.com",
          password: "$2b$10$F3cWp0Spgci4A4X0/yJkBebn9yYq0vX9c2tR9iZXfZLrUQnUhE4.2",
          rol: "usuario"
        },
        
      ];
    let category = [
      {
        name: "Ciencia Ficción",
        description: "Películas y series de ciencia ficción con tecnología y viajes espaciales."
      },
      {
        name: "Comedia",
        description: "Contenido diseñado para hacer reír y entretener al público."
      },
      {
        name: "Drama",
        description: "Historias con alta carga emocional y desarrollo de personajes."
      },
      {
        name: "Acción",
        description: "Películas llenas de escenas intensas, persecuciones y combates."
      },
      {
        name: "Terror",
        description: "Contenido diseñado para provocar miedo, tensión o suspenso."
      },
      {
        name: "Documental",
        description: "Producciones basadas en hechos reales, informativas y educativas."
      },
      {
        name: "Romance",
        description: "Historias centradas en relaciones amorosas y sentimientos."
      },
      {
        name: "Animación",
        description: "Películas y series animadas, aptas para todas las edades."
      },
      {
        name: "Fantasía",
        description: "Contenido con mundos mágicos, criaturas míticas y poderes sobrenaturales."
      },
      {
        name: "Aventura",
        description: "Historias que implican viajes, descubrimientos y desafíos."
      }
    ];
    
    let content = [
        {
          title: "Interstellar",
          description: "Un grupo de astronautas viaja a través de un agujero de gusano para salvar a la humanidad.",
          year: 2014,
          category: "Ciencia Ficción",
          approved: true,
          type: "pelicula"
        },
        {
          title: "Friends",
          description: "Seis amigos viven divertidas situaciones en Nueva York.",
          year: 1994,
          category: "Comedia",
          approved: true,
          type: "serie"
        },
        {
          title: "Breaking Bad",
          description: "Un profesor de química se convierte en fabricante de metanfetaminas.",
          year: 2008,
          category: "Drama",
          approved: false,
          type: "serie"
        }
      ];
    let reviews = [
        {
          userName: "Carlos Perez",
          contentName: "Interstellar",
          title: "Increíble",
          review: "La mejor película de ciencia ficción que he visto.",
          score: 10,
          likes: [],
          dislikes: [],
          date: new Date("2025-08-20T10:00:00Z")
        },
        {
          userName: "Ana Lopez",
          contentName: "Friends",
          title: "Muy divertida",
          review: "Ideal para pasar el rato y reír con amigos.",
          score: 9,
          likes: [],
          dislikes: [],
          date: new Date("2025-08-21T14:30:00Z")
        },
        {
          userName: "Miguel Ruiz",
          contentName: "Breaking Bad",
          title: "Obra maestra",
          review: "El desarrollo de personajes es insuperable.",
          score: 10,
          likes: [],
          dislikes: [],
          date: new Date("2025-08-22T18:45:00Z")
        }
      ]

    await connect()
    await getDB().collection("usuarios").deleteMany();
    await getDB().collection("usuarios").insertMany(users);

    await getDB().collection("categorias").deleteMany();
    await getDB().collection("categorias").insertMany(category);

    await getDB().collection("contenidos").deleteMany();
    await getDB().collection("contenidos").insertMany(content);

    await getDB().collection("reseñas").deleteMany();
    await getDB().collection("reseñas").insertMany(reviews);

    console.log("Dataset creado");
    process.exit()
}

seed()