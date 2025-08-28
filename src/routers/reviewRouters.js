// imports
import { Router } from "express";
import { getDB } from "../config/db.js";
import newReview from "../controllers/reviewsControllers.js"

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
//

router.post("/postreview", async function (req, res) {
  try {
    const usuario = req.params.email;
    const user = await getDB().collection("usuarios").find({email: usuario}).toArray();
    if (!user) return res.status(204).json({ message: 'No se encontró el usuario' });


    newReview
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
})
export default router;