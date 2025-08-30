// imports
import dotenv from "dotenv";
import express from "express";
import connect from "./src/config/db.js";
import passport from "passport";
import cors from "cors";
import { configurePassport } from "./src/config/passport.js";
import categoryRouter from "./src/routers/categoryRouters.js";
import reviewRouter from "./src/routers/reviewRouters.js";
import userRouter from "./src/routers/userRouter.js";
import contentRouters from "./src/routers/contentRouters.js";
import authRoutes from "./src/routers/auth.js";
import userRoutes from "./src/routers/users.js";
import { validateUser, ensureUser } from "./src/middlewares/userValidator.js";
import adminContent from "./src/services/adminContentRouter.js";
import { ensureAdmin } from "./src/middlewares/adminValidator.js";

//configs
dotenv.config();
const port = process.env.PORT || 5500;
const app = express();

app.use(passport.initialize());
configurePassport(passport);

app.use(express.json()); //Middleware de interpretacion de JSON
app.use(cors());
//Rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", validateUser, ensureAdmin, adminContent);
app.use(validateUser, ensureUser);
app.use("/campustv", contentRouters, reviewRouter, userRouter, categoryRouter)

connect().then(() => {
  app.listen(port, () => {
    console.log("http://localhost:" + port);
  });
});