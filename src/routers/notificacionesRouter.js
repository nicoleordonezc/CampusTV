// imports
import { Router } from "express";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";



const router = Router();

//http://localhost:5500/campustv/getnotifications

router.get("/getnotifications",  async function (req, res) {
    try {
      const notificaciones = await getDB().collection("notificaciones").aggregate([{$project:{_id:0}}, {$sort:{date:-1}}]).toArray();
      res.status(200).json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

// //Editar una noti

router.put('/putnotificacion/:id', async function(req, res) {
    try {

        const idnotificacion = req.params.id;  
        const {estado} = req.body;

        const busqueda = await getDB().collection("notificaciones").findOne({_id:new ObjectId(idnotificacion)});
      
        if (!busqueda) {
            return res.status(404).json({ error: "No se encontró la notificacion"});
        }
        const edicion = await getDB().collection("notificaciones").updateOne({ _id: new ObjectId(idnotificacion) }, {$set:{estado:estado}})
        console.log(edicion);
        
        res.status(200).json({ message: "Notificacion actualizada correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor"+ error });
    }
});


router.post("/postnotificaciones/:id", async function (req, res) {
  try {
    const idReseña = req.params.id
    const { mensaje, fecha, estado} = req.body;
    const idUsuario = req.user._id;
    
    const nuevanotificacion = {
      idUsuario,
      idReseña,
      mensaje,
      fecha,
      estado,
    };
    await getDB().collection("notificaciones").insertOne(nuevanotificacion)

    res.status(201).json({ message: "notificacion creada con éxito"});
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });

  }
});



export default router;