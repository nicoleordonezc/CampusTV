// imports
import { Router } from "express";
import { getDB } from "../config/db.js";
import newReview from "../controllers/reviewsControllers.js";
import { reviewDTO } from "../dto/review.dto.js";
import {validatorFieldsDTO} from "../middlewares/validatorDTO.js";
import {userValidator} from "../middlewares/userValidator.js"


const router = Router();

//Obetener reseñas de un contenido especifico
//http://localhost:5500/campustv/getreviews/

router.get("/getreviews/:id",  async function (req, res) {
    try {
      const contenido = req.params.id;
      const review = await getDB().collection("reseñas").find({contentName: contenido}).toArray();
      if (!review) return res.status(204).json({ message: 'No se encontraron reseñas' });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Crear reseñas
//http://localhost:5500/campustv/postreview

router.post("/postreview", userValidator, reviewDTO, validatorFieldsDTO, async function (req, res) {
  try {
    const { title, review, score, contentName } = req.body;

     // El nombre del usuario lo saco de req.user
    const userName = req.user.name;
    const nuevaReseña = await newReview({
      userName,
      contentName,
      title,
      review,
      score,
    });
    res.status(201).json({ message: "Reseña creada con éxito", reseña: nuevaReseña });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
})
export default router;