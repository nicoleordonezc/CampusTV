import { getDB } from "../config/db.js";
import _ from "lodash";
import Content from "../models/content.js"


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
}