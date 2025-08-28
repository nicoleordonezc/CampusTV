import {body} from "express-validator";

export const contentDTO = [
    body('title').isString().isLength({max: 20}).notEmpty().withMessage("Título inválido"),
    body('description').isString().isLength({max: 500}).notEmpty().withMessage("Descripción inválida"),
    body('year').isInt().notEmpty().withMessage("Año inválido").toInt(),
    body('category').isString().isLength({max: 50}).notEmpty().withMessage("Descripción inválida"),
    body('approved').isBoolean().notEmpty().withMessage("Aprobación inválido").toBoolean(),
    body('type').isIn(["usuario", "administrador"]).notEmpty().withMessage("Tipo inválido")
]
