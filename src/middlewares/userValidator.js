import passport from "passport";

// Middleware para validar si el usuario está autenticado
export const validateUser = passport.authenticate("jwt", { session: false });

// Middleware extra para validar si existe el usuario en req.user
export const ensureUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autorizado: usuario no válido" });
  }
  next();
};

