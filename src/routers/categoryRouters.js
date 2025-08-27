// imports
import { Router } from "express";
import { getDB } from "../config/db.js";

const router = Router();

//Obetener todo el contenido de peliculas
//http://localhost:5500/campustv/getcienciaficcion

router.get("/getcienciaficcion",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").find({category
: "Ciencia Ficción"}).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de series
//http://localhost:5500/campustv/getcomedia

router.get("/getcomedia",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").find({category
: "Comedia"}).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de series
//http://localhost:5500/campustv/getdrama

router.get("/getdrama",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").find({category
: "Drama"}).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
export default router;