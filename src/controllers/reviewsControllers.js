import { getDB } from "../config/db.js";
import Reviews from "../models/reviews.js";
import _ from "lodash";
import { ObjectId } from "mongodb";

//Crear review

export async function newReview({userName,contentName,title, review, score}) {
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

export async function editReview(reviewId, userName,{ title, review, score }) {
    if (_.isEmpty(userName) || _.isEmpty(reviewId)) {
    throw new Error("Se requieren todos los datos.");
  }

  // Validar que al menos uno de los campos venga para actualizar
  if (_.isEmpty(title) && _.isEmpty(review) && (score === undefined || score === null)) {
    throw new Error("⚠️ Debes enviar al menos un campo para actualizar.");
  }
  try {
    const existingReview = await getDB().collection("reseñas").findOne({ _id: new ObjectId(reviewId), userName});
    if (!existingReview) {
      throw new Error("No existe una reseña con ese ID.")};
    
    const updateFields = {};
    if (!_.isEmpty(title)) updateFields.title = title;
    if (!_.isEmpty(review)) updateFields.review = review;
    if (score !== undefined && score !== null) updateFields.score = parseInt(score);

    await getDB().collection("reseñas").updateOne({ _id: new ObjectId(reviewId) }, { $set: updateFields });  
    return updateFields
  } catch (error) {
    console.error("Error al editar la reseña:", error.message);
    throw error;
  }
};

//Eliminar review

export async function deleteReview(reviewId, userName) {
    if (_.isEmpty(userName) || _.isEmpty(reviewId)) {
    throw new Error("Se requieren todos los datos.");
    };
    try {
        const existingReview = await getDB().collection("reseñas").findOne({ _id: new ObjectId(reviewId), userName});
    if (!existingReview) {
      throw new Error("No existe una reseña con ese ID.")};
    await getDB().collection("reseñas").deleteOne({ _id: new ObjectId(reviewId)})
    } catch (error) {
        console.error("Error al editar la reseña:", error.message);
        throw error;
    }
}
