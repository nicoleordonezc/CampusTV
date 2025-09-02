// imports
import { Router } from "express";
import { getDB } from "../config/db.js";

const router = Router();

//Obetener todo el contenido de ciencia ficcion
//http://localhost:5500/campustv/category/getcienciaficcion

router.get("/getcienciaficcion",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Ciencia Ficción"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de comedia
//http://localhost:5500/campustv/getcomedia

router.get("/getcomedia",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Comedia"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de drama
//http://localhost:5500/campustv/getdrama

router.get("/getdrama",  async function (req, res) {
    try {
      const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Drama"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
      res.status(200).json(contenido);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

//Obetener todo el contenido de accion
//http://localhost:5500/campustv/getaccion

router.get("/getaccion",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Acción"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Obetener todo el contenido de terror
//http://localhost:5500/campustv/getterror

router.get("/getterror",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Terror"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Obetener todo el contenido de documental
//http://localhost:5500/campustv/getdocumental

router.get("/getdocumental",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Documental"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Obetener todo el contenido de romance
//http://localhost:5500/campustv/getromance

router.get("/getromance",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Romance"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Obetener todo el contenido de animacion
//http://localhost:5500/campustv/getanimacion

router.get("/getanimacion",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Animación"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Obetener todo el contenido de fantasia
//http://localhost:5500/campustv/getfantasia

router.get("/getfantasia",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Fantasía"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Obetener todo el contenido de aventura
//http://localhost:5500/campustv/getaventura

router.get("/getaventura",  async function (req, res) {
  try {
    const contenido = await getDB().collection("contenidos").aggregate([{$match: {category: "Aventura"}}, {$project:{_id:0, approved:0, category:0}}]).toArray();
    res.status(200).json(contenido);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;