import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://sibghaahmad10:Alayna01082023@cluster0.yvb1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('Mentors');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

function getCollection(collectionName) {
    return db.collection(collectionName);
}

export {
    connectToDatabase,
    getCollection,
}; 