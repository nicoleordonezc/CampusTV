import { getDB } from "../config/db.js";
import Reviews from "../models/reviews.js";
import _ from "lodash";

//Crear review

export default async function newReview({userName,contentName,title, review, score}) {
    console.log(userName, contentName, title, review, score );
    
    if (_.isEmpty(userName) || _.isEmpty(contentName) || _.isEmpty(review) || (score === undefined || score === null))
    throw new Error(("❌ Se deben llenar todos los datos."));
    const data = await getDB().collection("reseñas").findOne({ userName: userName, contentName: contentName });
    if (data) {
    throw new Error("Ya existe una reseña tuya para este contenido");
    }

    try {
        const reseña = new Reviews(
            userName, 
            contentName, 
            title, 
            review, 
            parseInt(score), 
            [], 
            [],
            new Date()) 
        await getDB().collection("reseñas").insertOne(reseña)
        return reseña
    } catch (error) {
        console.log("Hubo un error al registrar la review"+ error);
    }
};

//Ediar review

