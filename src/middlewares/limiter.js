import rateLimit from "express-rate-limit";

//Limitador
export const limiterLogin = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many requests!! ❌"
});

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: "Too many requests!! ❌"
});