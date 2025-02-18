import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const uri = dotenv.config().parsed.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_PASSWORD) {
      throw new Error("MONGODB_PASSWORD environment variable is not set");
    }
    await client.connect();
    db = client.db(process.env.MONGODB_DATABASE || "Illumina");
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

function getCollection(collectionName) {
  return db.collection(collectionName);
}

export { connectToDatabase, getCollection, client };
