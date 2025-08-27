import rateLimit from "express-rate-limit";

//Limitador
export const limiterLogin = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many requests!! ❌"
});

export const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100,
  message: "Too many requests!! ❌"
});