// imports
import { Router } from "express";
import {contentDTO} from "../dto/content.dto.js";
import { validatorFieldsDTO } from "../middlewares/validatorDTO.js";
import {newContent} from "../controllers/contentControllers.js"

const router = Router();

//Crear contenido
//http://localhost:5500/campustv/postcontent

router.post("/postcontent", contentDTO, validatorFieldsDTO, async function (req, res) {
  try {
    const {title, description, year, category, approved, type} = req.body;
    
    const nuevoContenido = await newContent({
     title, 
     description, 
     year, 
     category, 
     approved, 
     type
    });
    res.status(201).json({ message: "Reseña creada con éxito", nuevoContenido});
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });

  }
});


export default router;