// imports
import { Router } from "express";
import {contentDTO} from "../dto/content.dto.js";
import { validatorFieldsDTO } from "../middlewares/validatorDTO.js";
import {newContent, editContent, deleteContent} from "../controllers/contentControllers.js"

const router = Router();

//Crear contenido
//http://localhost:5500/admin/postcontent

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


//Editar una contenido
//http://localhost:5500/admin/putcontent/

router.put('/putcontent/:title', async function(req, res) {
    try {

        const contentTitle = req.params.title;  
        const {title, description, year, category, approved, type} = req.body;

        const updateContent = await editContent(contentTitle, { title, description, year, category, approved, type });

        if (!updateContent) {
            return res.status(404).json({ error: "No se encontró el contenido" });
        }

        res.status(200).json({ message: "Contenido actualizado correctamente", content: updateContent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor"+ error });
    }
});

//Eliminar contenido
//http://localhost:5500/admin/deletecontent

router.delete('/deletecontent/:title', async function(req, res){
    try {
        const contentTitle= req.params.title;          
        await deleteContent(contentTitle);
        res.status(204).json({ message: "Reseña eliminada", deleted: true })
    } catch (error) {
        res.status(404).json({error: "Error interno del servidor"+ error})
    }
})
  
export default router;