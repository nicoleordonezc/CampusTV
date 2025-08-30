// imports
import { Router } from "express";
import { getDB } from "../config/db.js";
import {newReview, editReview} from "../controllers/reviewsControllers.js";
import { reviewDTO } from "../dto/review.dto.js";
import {validatorFieldsDTO} from "../middlewares/validatorDTO.js";


const router = Router();

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

//Crear reseñas
//http://localhost:5500/campustv/postreview

router.post("/postreview", reviewDTO, validatorFieldsDTO, async function (req, res) {
  try {
    const { title, review, score, contentName } = req.body;
    
    const userName = req.user.email;
    
    const nuevaReseña = await newReview({
      userName,
      contentName,
      title,
      review,
      score,
    });
    res.status(201).json({ message: "Reseña creada con éxito", reseña: nuevaReseña});
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });

  }
});

//Editar una review
router.put('/putreview/:id', async function(req, res) {
    try {

        const idReview = req.params.id;  
        const userName = req.user.email; 
        const { title, review, score } = req.body;

        const updatedReview = await editReview(idReview, userName, { title, review, score });

        if (!updatedReview) {
            return res.status(404).json({ error: "No se encontró la reseña o no tienes permiso para editarla" });
        }

        res.status(200).json({ message: "Reseña actualizada correctamente", review: updatedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor"+ error });
    }
});


export default router;