import {body} from "express-validator";

export const usersDTO = [
    body('name').isString().isLength({max: 20}).notEmpty().withMessage("Nombre inválido"),
    body('email').isEmail().notEmpty().withMessage("Email inválido"),
    body('password').exists().notEmpty().withMessage("Password requerida")
]
