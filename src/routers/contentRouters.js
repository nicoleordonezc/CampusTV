// imports
import { Router } from "express";
import { getDB } from "../config/db.js";

const router = Router();

//Obetener todo el contenido
//http://localhost:5500/campustv/getall

router.get("/getall",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").find().toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
//Obetener todo el contenido de peliculas
//http://localhost:5500/campustv/getallmovies

router.get("/getallmovies",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").find({type: "pelicula"}).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de series
//http://localhost:5500/campustv/getallseries

router.get("/getallseries",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").find({type: "serie"}).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
export default router;