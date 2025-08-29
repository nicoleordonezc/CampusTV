import {body} from "express-validator";
import { ObjectId } from "mongodb";

export const reviewDTO = [
    body('userName').isString().notEmpty().withMessage("Nombre de usuario inválido"),
    body('contentName').isString().notEmpty().withMessage("Título de contenido inválido"),
    body('title').isString().isLength({max: 20}).notEmpty().withMessage("Nombre inválido"),
    body('review').isString().isLength({max: 200}).notEmpty().withMessage("Descripción inválida"),
    body('score').isInt({min:1}).isInt({max: 10}).notEmpty().withMessage("Calificación inválida").toInt(),
    body('date').isDate().notEmpty().withMessage("Fecha inválida").toDate()
]
