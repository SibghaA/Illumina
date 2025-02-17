import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://sibghaahmad10:${process.env.MONGODB_PASSWORD}@cluster0.yvb1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_PASSWORD) {
      throw new Error('MONGODB_PASSWORD environment variable is not set');
    }
    await client.connect();
    db = client.db("Illumina");
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export { connectToDatabase, client }; 