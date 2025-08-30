import passport from "passport";

// Middleware para validar si el usuario está autenticado
export const validateUser = passport.authenticate("jwt", { session: false });

export const ensureAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado: usuario no válido" });
  };

  if (req.user.role !== "administrador") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: se requiere rol de administrador" });
  }
  next();
};

