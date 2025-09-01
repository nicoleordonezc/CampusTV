// imports
import { Router } from "express";
import { getDB } from "../config/db.js";

const router = Router();

//Obetener todo el contenido
//http://localhost:5500/campustv/getall

router.get("/getall",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").aggregate([{$project:{_id:0, approved:0}}]).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
//Obetener todo el contenido de peliculas
//http://localhost:5500/campustv/getallmovies

router.get("/getallmovies",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").aggregate([{$match: {type: "pelicula"}}, {$project:{_id:0, approved:0}}]).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de series
//http://localhost:5500/campustv/getallseries

router.get("/getallseries",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").aggregate([{$match: {type: "serie"}}, {$project:{_id:0, approved:0}}]).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener contenido por titulo
//http://localhost:5500/campustv/contentby

router.get("/contentby/:title",  async function (req, res) {
    try {
      const contenido = req.params.title;
      const result = await getDB().collection("contenidos").aggregate([{$match:{title: contenido}}, {$project:{_id:0, approved:0}}]).toArray();
      if (!result) return res.status(204).json({ message: 'No se encontró el contenido' });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener reseñas de un contenido especifico
//http://localhost:5500/campustv/getreviews/

router.get("/getreviews/:id", async function (req, res) {
    try {
      const contenido = req.params.id;
      const review = await getDB().collection("reseñas").find({contentName: contenido}).toArray();
      if (!review) return res.status(204).json({ message: 'No se encontraron reseñas' });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obtener contenido por ranking
//http://localhost:5500/campustv/ranking

router.get("/ranking", async function (req, res) {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "reseñas",
          localField: "title",   // campo en "contenidos"
          foreignField: "contentName", // campo en "reseñas"
          as: "reviews"
        }
      },
      {
        $addFields: {
          avgScore: { $avg: "$reviews.score" },
          likesCount: { $sum: { $map: { input: "$reviews", as: "r", in: { $size: "$$r.likes" } } } },
          dislikesCount: { $sum: { $map: { input: "$reviews", as: "r", in: { $size: "$$r.dislikes" } } } },
          lastReviewDate: { $max: "$reviews.date" }
        }
      },
      {
        $addFields: {
          popularity: {
            $add: [
              { $multiply: ["$avgScore", 2] }, // ponderamos score
              "$likesCount",
              { $multiply: ["$dislikesCount", -0.5] }, // penalizamos dislikes
              {
                $cond: [
                  { $gte: ["$lastReviewDate", new Date(Date.now() - 1000*60*60*24*30)] }, // último mes
                  5,
                  0
                ]
              }
            ]
          }
        }
      },
      {
        $sort: { popularity: -1, avgScore: -1, lastReviewDate: -1 }
      },
      {
        $project: {
          _id: 0,
          approved: 0,
          reviews: 0,
          avgScore: 0, 
          lastReviewDate: 0,
          likesCount:0,
          dislikesCount:0
        }
      }
    ];

    const result = await getDB().collection("contenidos").aggregate(pipeline).toArray();
    res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;