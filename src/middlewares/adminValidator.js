import passport from "passport";

export const ensureAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado: usuario no válido" });
  };

  if (req.user.rol !== "administrador") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol de administrador" });
  }
  next();
};

