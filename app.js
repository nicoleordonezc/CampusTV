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
import adminCategory from "./src/services/adminCategoryRouters.js";
import { ensureAdmin } from "./src/middlewares/adminValidator.js";
import versionRouter from "./src/utils/versionRouter.js";
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import {limiter, limiterLogin} from "./src/middlewares/limiter.js"

//configs
dotenv.config();
const port = process.env.PORT || 5500;
const app = express();
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));

app.use(passport.initialize());
configurePassport(passport);

app.use(express.json()); 
app.use(cors());
app.use("/version", versionRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Rutas
app.use("/auth", limiterLogin, authRoutes);
app.use("/user", userRoutes);
app.use("/admin", validateUser, ensureAdmin, adminContent, adminCategory, contentRouters, categoryRouter);
app.use(validateUser, ensureUser);
app.use("/campustv", limiter, contentRouters, reviewRouter, userRouter, categoryRouter);


connect().then(() => {
  app.listen(port, () => {
    console.log("http://localhost:" + port);
  });
});