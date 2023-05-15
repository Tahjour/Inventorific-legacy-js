
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.mongodbUsername}:${process.env.mongodbPassword}@${process.env.mongodbCluster}.nrje3.mongodb.net/?retryWrites=true&w=majority`;

export async function connectToDatabase() {
    const mongoClient = new MongoClient(uri);
    try {
        await mongoClient.connect();
    } catch (error) {
        console.error("There was an error connecting to the database", error);
        return;
    }
    return mongoClient;
}