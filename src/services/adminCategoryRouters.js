// imports
import { Router } from "express";
import {categoryDTO} from "../dto/category.dto.js";
import { validatorFieldsDTO } from "../middlewares/validatorDTO.js";
import {newCategory, editCategory, deleteCategory} from "../controllers/categoryControllers.js"

const router = Router();

//Crear categoria
//http://localhost:5500/admin/postcategory

router.post("/postcategory", categoryDTO, validatorFieldsDTO, async function (req, res) {
  try {
    const {name, description} = req.body;
    
    const nuevaCategoria = await newCategory({
     name, 
     description
    });
    res.status(201).json({ message: "Categoria creada con éxito", nuevaCategoria});
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });

  }
});


//Editar una categoria
//http://localhost:5500/admin/putcategory/

router.put('/putcategory/:name', async function(req, res) {
    try {

        const categoryName = req.params.name;  
        const {name, description} = req.body;

        const updateCategory = await editCategory(categoryName, { name, description});

        if (!updateCategory) {
            return res.status(404).json({ error: "No se encontró la categoria" });
        }

        res.status(200).json({ message: "Categoria actualizada correctamente", category: updateCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor"+ error });
    }
});

//Eliminar categoria
//http://localhost:5500/admin/deletecategory

router.delete('/deletecategory/:name', async function(req, res){
    try {
        const categoryName = req.params.name;          
        await deleteCategory(categoryName );
        res.status(204).json({ message: "Categoria eliminada", deleted: true })
    } catch (error) {
        res.status(404).json({error: "Error interno del servidor"+ error})
    }
})
  
export default router;