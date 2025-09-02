import { getDB } from "../config/db.js";
import _ from "lodash";
import Category from "../models/category.js"

// Crear categoria

export async function newCategory({name, description}) {
     if (_.isEmpty(name) || _.isEmpty(description))
        throw new Error(("Se deben llenar todos los datos."));
        const data = await getDB().collection("contenidos").findOne({ name: name});
    if (data) {
      throw new Error("Ya existe esta categoria");
    };
    try {
        const categoria = new Category(
                    name, 
                    description) 
        const doublename = await getDB().collection("categorias").findOne({ name:name} );
        if (doublename){
          throw new Error("La categoria ya exite");
        }
        await getDB().collection("categorias").insertOne(categoria)
        return categoria
    } catch (error) {
        console.log("Hubo un error al registrar el categoria"+ error);
    }
};

//Ediar categoria

export async function editCategory(categoryName, {name, description}) {
    if (_.isEmpty(categoryName)) {
    throw new Error("Se requieren todos los datos.");
  }

  // Validar que al menos uno de los campos venga para actualizar
  if (_.isEmpty(name) && _.isEmpty(description)) {
    throw new Error("Debes enviar al menos un campo para actualizar.");
  }
  try {
    const existingContent = await getDB().collection("categorias").findOne({ name:categoryName} );
    if (!existingContent) {
      throw new Error("No existe este contenido.")};
      
      const updateFields = {};
      if (!_.isEmpty(name)) updateFields.name = name;
      const doublename = await getDB().collection("categorias").findOne({ name:name} );
      if (doublename){
          throw new Error("La categoria ya exite");
      }
    if (!_.isEmpty(description)) updateFields.description = description;

    await getDB().collection("categorias").updateOne({ name:categoryName}, { $set: updateFields });  
    return updateFields
  } catch (error) {
    console.error("Error al editar el contenido:", error.message);
    throw error;
  }
};

//Eliminar categoria

export async function deleteCategory(categoryName) {
    if ( _.isEmpty(categoryName)) {
    throw new Error("Se requieren los datos.");
    };
    try {
        const existingCategory = await getDB().collection("categorias").findOne({ name:categoryName});
    if (!existingCategory) {
      throw new Error("No existe esta categoria.")};
    await getDB().collection("categorias").deleteOne({name: categoryName})
    } catch (error) {
        console.error("Error al eliminar la categoria:", error.message);
        throw error;
    }
}
