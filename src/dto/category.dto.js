import {body} from "express-validator";

export const categoryDTO = [
    body('name').isString().isLength({max: 50}).notEmpty().withMessage("Nombre inválido"),
    body('description').isString().isLength({max: 200}).notEmpty().withMessage("Descripción inválida")
]
