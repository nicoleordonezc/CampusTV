import { getDB } from "../config/db.js";
import _ from "lodash";
import Content from "../models/content.js"

// Crear contenido

export async function newContent({title, description, year, category, approved, type}) {
     if (_.isEmpty(title) || _.isEmpty(description) || _.isEmpty(year) || _.isEmpty(category), _.isEmpty(approved), _.isEmpty(type))
        throw new Error(("Se deben llenar todos los datos."));
        const data = await getDB().collection("contenidos").findOne({ title: title});
    if (data) {
      throw new Error("Ya existe este contenido");
    };
    try {
        const contenido = new Content(
                    title, 
                    description, 
                    parseInt(year), 
                    category, 
                    approved, 
                    type) 
                await getDB().collection("contenidos").insertOne(contenido)
                return contenido
    } catch (error) {
        console.log("Hubo un error al registrar el contenido"+ error);
    }
};

//Ediar contenido

export async function editContent(contentTitle, {title, description, year, category, approved, type }) {
    if (_.isEmpty(contentTitle)) {
    throw new Error("Se requieren todos los datos.");
  }

  // Validar que al menos uno de los campos venga para actualizar
  if (_.isEmpty(title) && _.isEmpty(description) && (year !== undefined && year !== null) && _.isEmpty(category) && _.isEmpty(approved) && _.isEmpty(type)) {
    throw new Error("Debes enviar al menos un campo para actualizar.");
  }
  try {
    const existingContent = await getDB().collection("contenidos").findOne({ title:contentTitle} );
    if (!existingContent) {
      throw new Error("No existe este contenido.")};
      
      const updateFields = {};
      if (!_.isEmpty(title)) updateFields.title = title;
      const doubleTitle = await getDB().collection("contenidos").findOne({ title:title} );
      if (doubleTitle){
          throw new Error("El titlo ya exite");
      }
    if (!_.isEmpty(description)) updateFields.description = description;
    if (year !== undefined && year !== null) updateFields.year = parseInt(year);
    if (!_.isEmpty(category)) updateFields.category = category;
    if (!_.isEmpty(approved)) updateFields.approved = approved;
    if (!_.isEmpty(type)) updateFields.type = type;

    await getDB().collection("contenidos").updateOne({ title:contentTitle}, { $set: updateFields });  
    return updateFields
  } catch (error) {
    console.error("Error al editar el contenido:", error.message);
    throw error;
  }
};

//Eliminar contenido

export async function deleteContent(contentTitle) {
    if ( _.isEmpty(contentTitle)) {
    throw new Error("Se requieren los datos.");
    };
    try {
        const existingReview = await getDB().collection("contenidos").findOne({ title:contentTitle});
    if (!existingReview) {
      throw new Error("No existe este contenido.")};
    await getDB().collection("contenidos").deleteOne({title: contentTitle})
    } catch (error) {
        console.error("Error al eliminar el contenido:", error.message);
        throw error;
    }
}
