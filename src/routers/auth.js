// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Registro
//http://localhost:5500/auth/register

router.post("/register", async (req, res) => {
  try {
    const db = getDB();
    const { name, email, password } = req.body;

    const existingUser = await db.collection("usuarios").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.collection("usuarios").insertOne({
      name,
      email,
      password: hashedPassword,
      rol: "usuario"
    });

    res.status(201).json({ message: "Usuario registrado", userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

// Login
//http://localhost:5500/auth/login

router.post("/login", async (req, res) => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    const user = await db.collection("usuarios").findOne({ email });
    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
});

export default router;
