import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;
const dataBase = process.env.DB_NAME;

const client = new MongoClient(uri);
let db

export default async function connect() {
    try {
        await client.connect();
        console.log("MongoDB está conectado ");
        db= client.db(dataBase)
        
    } catch (error) {
        console.log('Error al conectar'+error);
    }
};

export function getDB() {
    if (!db) {
        throw new Error("La base de datos no existe");
    }
    return db
}