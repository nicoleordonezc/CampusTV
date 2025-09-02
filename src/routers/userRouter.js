// imports
import { Router } from "express";
import { getDB } from "../config/db.js";
import bcrypt from "bcrypt";


const router = Router();

//Obetener reseñas de un contenido especifico
//http://localhost:5500/campustv/userprofile

router.get("/userprofile/:email",  async function (req, res) {
    try {
      const usuario = req.params.email;
      const user = await getDB().collection("usuarios").aggregate([{$match:{email: usuario}}, {$project:{_id:0, name:1, email:1}}]).toArray();
      if (!user) return res.status(204).json({ message: 'No se encontró el usuario' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obtener reseñas por usuario
//http://localhost:5500/campustv/userreviews

router.get("/userreviews/:email",  async function (req, res) {
  try {
    const usuario = req.params.email;
    const review = await getDB().collection("reseñas").find({userName: usuario}).toArray();
    if (!review) return res.status(204).json({ message: 'No se encontraron reseñas' });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Actualizar perfil
//http://localhost:5500/campustv/putuser

router.put('/putuser/:email', async function(req, res){
    try {
        const usuario = req.params.email;
        const user = await getDB().collection("usuarios").find({email: usuario}).toArray();
        if (!user) return res.status(204).json({ message: 'No se encontró el usuario' });
        
        const updateFields = {};
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            updateFields.password = hashedPassword;
          };
        
        if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No se enviaron campos para actualizar' });
        };

        await getDB().collection("usuarios").updateOne({ email: usuario },{ $set: updateFields });
        res.status(200).json({message: "Se actualizó correctamente"}) 
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})
  


export default router;