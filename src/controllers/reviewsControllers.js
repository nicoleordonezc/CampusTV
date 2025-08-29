import { getDB } from "../config/db.js";
import Reviews from "../models/reviews.js";
import _ from "lodash";

//Crear review

export default async function newReview({title, review, score, date}) {
    if (_.isEmpty(userName) || _.isEmpty(contentName) || _.isEmpty(review) || _.isEmpty(score))
        throw new Error(chalk.red("❌ Se deben llenar todos los datos."));
    try {
        const reseña = new Reviews(
            userName, 
            contentName, 
            title, 
            review, 
            score, 
            date = new Date(), 
            likes= [], 
            dislikes=[])

        await getDB().collection("reseñas").insertOne(reseña)
        return reseña;
    } catch (error) {
        console.log("Hubo un error al registrar la review"+ error);
    }
}