import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js"; 

export const userValidator = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No se proporcionó token" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    // ✅ Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Confirmar que el usuario existe en la BD
    const db = getDB();
    const user = await db.collection("usuarios").findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return res.status(401).json({ message: "Usuario no válido o ya no existe" });
    }

    // ✅ Guardamos info del usuario en el request
    req.user = user;
    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
