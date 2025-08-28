import { getDB } from "../config/db.js";
import Reviews from "../models/reviews.js"

//Crear review

export async function newReview({title, review, score, date}) {
    if (_.isEmpty(review) || _.isEmpty(score))
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
    } catch (error) {
        console.log("Hubo un error al registrar la review"+ error);
    }
}